package main

import (
	"bytes"
	"encoding/csv"
	"encoding/json"
	"os"
)

type Record struct {
	Domain    string `json:"Domain"`
	Available string `json:"Available"`
	Price     string `json:"Price"`
}

const csvFile = "rocco-beast-search.csv"

func csvToJSON(csvFile string) (string, error) {
	// Open the CSV file
	file, err := os.Open(csvFile)

	if err != nil {
		return "", err
	}

	defer file.Close()

	// Create CSV reader
	reader := csv.NewReader(file)

	// Read all records
	rows, err := reader.ReadAll()

	if err != nil {
		return "", err
	}

	// Skip header if present
	if len(rows) > 0 {
		rows = rows[1:]
	}

	// Convert to structs
	var data []Record

	for _, row := range rows {
		if len(row) >= 3 {
			record := Record{
				Domain:    row[0],
				Available: row[1],
				Price:     row[2],
			}
			data = append(data, record)
		}
	}

	// Convert to JSON
	jsonData, err := json.Marshal(data)

	if err != nil {
		return "", err
	}

	return string(jsonData), nil
}

func saveJSON(jsonData string, minify ...bool) error {
	// Default minify to true if not provided
	isMinify := true

	if len(minify) > 0 {
		isMinify = minify[0]
	}

	// Set filename based on minify parameter
	filename := "rocco-beast-search.json"

	if isMinify {
		filename = "rocco-beast-search.min.json"
	}

	file, err := os.Create(filename)

	if err != nil {
		return err
	}
	defer file.Close()

	// Process JSON based on minify parameter
	if !isMinify {
		// Beautify JSON
		var beautifiedJSON bytes.Buffer

		err = json.Indent(&beautifiedJSON, []byte(jsonData), "", "  ")

		if err != nil {
			return err
		}

		jsonData = beautifiedJSON.String()
	}

	// If minify is true, use the original jsonData (already minified)
	_, err = file.WriteString(jsonData)

	if err != nil {
		return err
	}
	return nil
}

func main() {
	result, err := csvToJSON(csvFile)

	if err != nil {
		panic(err)
	}

	// Create both minified and beautified versions
	saveJSON(result, true)  // Minified version
	saveJSON(result, false) // Beautified version
}
