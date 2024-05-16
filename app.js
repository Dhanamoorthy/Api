const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Directory to store the text files
const folderPath = path.join(__dirname, 'texts');

// Ensure the directory exists
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

// Endpoint to create a text file with the current timestamp
app.post('/create-file', (req, res) => {
    const timestamp = new Date().toISOString();
    const fileName = `${timestamp.replace(/:/g, '-')}.txt`;
    const filePath = path.join(folderPath, fileName);

    fs.writeFile(filePath, timestamp, (err) => {
        if (err) {
            return res.status(500).send('Error creating file');
        }
        res.send(`File created: ${fileName}`);
    });
});

// Endpoint to retrieve all text files in the folder
app.get('/list-files', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading directory');
        }
        const textFiles = files.filter(file => file.endsWith('.txt'));
        res.json(textFiles);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
