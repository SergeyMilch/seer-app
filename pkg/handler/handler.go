package handler

import (
	"strconv"

	"github.com/SergeyMilch/seer-app/pkg/service"
	"github.com/gin-gonic/gin"
)

type Handler interface {
	GetSentence(c *gin.Context)
}

type AppHandler struct {
	bookService service.BookService
}

func NewAppHandler(bookService service.BookService) *AppHandler {
	return &AppHandler{
		bookService: bookService,
	}
}

func (ah *AppHandler) GetSentence(c *gin.Context) {

	pageNumber, _ := strconv.Atoi(c.Param("page"))
	lineNumber, _ := strconv.Atoi(c.Param("line"))

	sentence, err := ah.bookService.ExtractSentence(pageNumber, lineNumber)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"sentence": sentence})
}
