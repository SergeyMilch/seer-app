package service

import (
	"fmt"
	"os"
	"strings"
)

type BookService interface {
	ExtractSentence(pageNumber, lineNumber int) (string, error)
}

type Book struct {
	Title       string
	PageContent []string
}

func NewBook(title string, filePath string) (*Book, error) {
	content, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	pageContent := strings.Split(string(content), "===============")

	for i, page := range pageContent {
		lines := strings.Split(page, "\n")

		// Удаляем пустые строки
		var cleanedLines []string
		for _, line := range lines {
			if strings.TrimSpace(line) != "" {
				cleanedLines = append(cleanedLines, line)
			}
		}

		pageContent[i] = strings.Join(cleanedLines, "\n")
	}

	return &Book{
		Title:       title,
		PageContent: pageContent,
	}, nil
}

func (b *Book) ExtractSentence(pageNumber, lineNumber int) (string, error) {
	if pageNumber < 1 || pageNumber > len(b.PageContent) {
		return "", fmt.Errorf("Неверный номер страницы: [%v]", pageNumber)
	}

	lines := strings.Split(b.PageContent[pageNumber-1], "\n")

	if lineNumber < 1 || lineNumber > len(lines) {
		return "", fmt.Errorf("Неверный номер строки: [%v]", lineNumber)
	}

	line := lines[lineNumber-1]

	sentences := strings.Split(line, ".")

	if len(sentences) > 0 {
		return sentences[0], nil
	}
	return "", fmt.Errorf("Предложение не найдено: [%v]", sentences)
}
