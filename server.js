const express = require('express');
const cors = require('cors');
const path = require('path');

const lessonsRouter = require('./routes/lessons');
const quizRouter = require('./routes/quiz');
const qualityRouter = require('./routes/quality');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/lessons', lessonsRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/quality', qualityRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'SAT Reading & Writing Web Service',
    timestamp: new Date().toISOString()
  });
});

// Fallback for HTML routing
app.get('/lesson', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'lesson.html'));
});

app.get('/quiz', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'quiz.html'));
});

app.get('/results', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'results.html'));
});

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🎯 SAT Reading Web Service Yayında!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`📊 Kalite Raporu: http://localhost:${PORT}/api/quality/report`);
  console.log(`=========================================`);
});
