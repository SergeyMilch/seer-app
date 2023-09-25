package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/SergeyMilch/seer-app/pkg/handler"
	"github.com/SergeyMilch/seer-app/pkg/service"
	"github.com/gin-gonic/gin"
)

func main() {
	book, err := service.NewBook("updated_Azazel_no_spaces", "./updated_Azazel_no_spaces.txt")
	if err != nil {
		fmt.Println("Ошибка при загрузке книги:", err)
		return
	}

	appHandler := handler.NewAppHandler(book)

	router := gin.Default()

	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		c.Next()
	})

	// Маршруты
	router.GET("/sentence/:page/:line", appHandler.GetSentence)

	// Запуск сервера в горутине
	go func() {
		if err := router.Run(":8000"); err != nil {
			fmt.Println("Ошибка при запуске сервера:", err)
			os.Exit(1)
		}
	}()

	// Ожидание сигнала завершения
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	// TODO Логика при завершении программы

	fmt.Println("Приложение завершено.")
}
