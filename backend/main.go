package main

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/generative-ai-go/genai"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
)

type ScanRequest struct {
	Image    string `json:"image"`
	Location string `json:"location"`
}

type ChatRequest struct {
	Message  string `json:"message"`
	Location string `json:"location"`
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, relying on environment variables")
	}

	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		log.Fatal("GEMINI_API_KEY environment variable is missing")
	}

	r := gin.Default()

	// CORS configuration
	allowedOrigins := os.Getenv("ALLOWED_ORIGINS")
	config := cors.DefaultConfig()
	if allowedOrigins != "" {
		config.AllowOrigins = strings.Split(allowedOrigins, ",")
	} else {
		config.AllowOrigins = []string{"http://localhost:5173", "http://localhost:3000"}
	}
	config.AllowMethods = []string{"GET", "POST", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept"}
	r.Use(cors.New(config))

	r.POST("/api/scan", func(c *gin.Context) {
		var req ScanRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
			return
		}

		ctx := context.Background()
		client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to initialize GenAI client"})
			return
		}
		defer client.Close()

		model := client.GenerativeModel("gemini-flash-latest")

		// Extract base64 and mime type
		b64data := req.Image
		mimeType := "image/jpeg"
		if idx := strings.Index(b64data, ";base64,"); idx != -1 {
			prefix := b64data[:idx]
			mimeParts := strings.Split(prefix, ":")
			if len(mimeParts) > 1 {
				mimeType = mimeParts[1]
			}
			b64data = b64data[idx+8:]
		}

		imgBytes, err := base64.StdEncoding.DecodeString(b64data)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid base64 string"})
			return
		}

		locationContext := ""
		if req.Location != "" {
			locationContext = fmt.Sprintf(" Lokasi pengguna saat ini adalah di %s. Wajib prioritaskan/cari rekomendasi bank sampah di area kota tersebut.", req.Location)
		}

		promptText := fmt.Sprintf("Analisis gambar ini untuk mengidentifikasi jenis plastiknya. Anda HARUS merespons HANYA dengan format objek JSON yang valid secara ketat seperti ini: {\"plasticType\": \"PET 1\", \"plasticName\": \"Nama ilmiah plastik\", \"matchPercentage\": 95, \"recyclingTips\": [\"tips daur ulang berbahasa indonesia 1\", \"tips 2\"], \"rekomendasiBankSampah\": [{\"nama\": \"Waste4Change\", \"alamat\": \"Bekasi, Jawa Barat\"}, {\"nama\": \"Bank Sampah Bersinar\", \"alamat\": \"Bandung\"}]}. Pastikan semua tips dan nama menggunakan Bahasa Indonesia. Berikan juga 2 rekomendasi nyata bank sampah atau fasilitas daur ulang di Indonesia yang menerima jenis plastik tersebut.%s", locationContext)
		prompt := genai.Text(promptText)

		resp, err := model.GenerateContent(ctx, genai.Blob{MIMEType: mimeType, Data: imgBytes}, prompt)
		if err != nil {
			log.Printf("Gemini generation error: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to analyze image"})
			return
		}

		if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Empty response from Gemini"})
			return
		}

		textResponse, ok := resp.Candidates[0].Content.Parts[0].(genai.Text)
		if !ok {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid response format from Gemini"})
			return
		}

		jsonStr := string(textResponse)
		jsonStr = strings.TrimSpace(jsonStr)
		jsonStr = strings.TrimPrefix(jsonStr, "```json")
		jsonStr = strings.TrimSuffix(jsonStr, "```")
		jsonStr = strings.TrimSpace(jsonStr)

		var result map[string]interface{}
		if err := json.Unmarshal([]byte(jsonStr), &result); err != nil {
			log.Printf("Failed to unmarshal JSON: %v. Raw text: %s", err, jsonStr)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse AI response as JSON"})
			return
		}

		c.JSON(http.StatusOK, result)
	})

	r.POST("/api/chat", func(c *gin.Context) {
		var req ChatRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
			return
		}

		ctx := context.Background()
		client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to initialize GenAI client"})
			return
		}
		defer client.Close()

		model := client.GenerativeModel("gemini-flash-latest")

		locationContext := ""
		if req.Location != "" {
			locationContext = fmt.Sprintf(" Lokasi pengguna saat ini adalah di %s. Jika dia bertanya soal tempat pembuangan atau bank sampah, berikan rekomendasi di area tersebut.", req.Location)
		}

		prompt := fmt.Sprintf("Anda adalah asisten cerdas WasteWise yang ahli dalam pengelolaan sampah plastik. Jawablah pertanyaan pengguna berikut dalam Bahasa Indonesia dengan nada ramah dan informatif. Pertanyaan: %s %s", req.Message, locationContext)

		resp, err := model.GenerateContent(ctx, genai.Text(prompt))
		if err != nil {
			log.Printf("Gemini chat error: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate chat response"})
			return
		}

		if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Empty response from Gemini"})
			return
		}

		textResponse, ok := resp.Candidates[0].Content.Parts[0].(genai.Text)
		if !ok {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid response format from Gemini"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"response": string(textResponse)})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Printf("Backend is running on http://localhost:%s\n", port)
	r.Run(":" + port)
}
