const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();

// Настройка multer для сохранения файлов в папку 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

app.use(cors()); // Разрешаем CORS для всех запросов

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const filePath = path.join(__dirname, req.file.path);
  console.log('File received:', req.file);
  res.json({ fileUrl: `http://localhost:3000/uploads/${req.file.filename}` });
});

app.use('/uploads', express.static('uploads'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
