// routes/quiz.js
const express = require('express');
const router = express.Router();
const { validateQuizSubmit } = require('../middleware/validator');
const questionsDb = require('../data/questions.json');

// Cevap anahtarını ve açıklamaları (TR & EN) gizleyen soru formatı
function sanitizeQuestion(q) {
  const {
    correctAnswer,
    trapExplanation,
    trapExplanationEN,
    explanation,
    explanationEN,
    qualityChecked,
    ...safe
  } = q;
  return safe;
}

// GET /api/quiz/:lessonId — derse ait 5 soru (cevap anahtarı gizli)
router.get('/:lessonId', (req, res) => {
  const lessonId = req.params.lessonId.toUpperCase();
  const questions = questionsDb[lessonId];

  if (!questions) {
    return res.status(404).json({
      error: 'Bu derse ait soru bulunamadı',
      detail: `Ders ID: ${lessonId}`
    });
  }

  res.json({
    lessonId,
    total: questions.length,
    questions: questions.map(sanitizeQuestion)
  });
});

// GET /api/quiz/random — tüm tiplerden karışık 10 soru
router.get('/mode/random', (req, res) => {
  const count = Math.min(parseInt(req.query.count) || 10, 20);
  const allQuestions = Object.values(questionsDb).flat();

  // Fisher-Yates shuffle
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  res.json({
    total: selected.length,
    questions: selected.map(sanitizeQuestion)
  });
});

// POST /api/quiz/submit — cevapları gönder, skor + açıklamalar al
router.post('/submit', validateQuizSubmit, (req, res) => {
  const { lessonId, answers } = req.body;
  const lessonIdUpper = (lessonId || '').toUpperCase();

  let questions = [];
  if (lessonIdUpper === 'RANDOM') {
    const allQuestions = Object.values(questionsDb).flat();
    const answeredIds = Object.keys(answers);
    questions = allQuestions.filter(q => answeredIds.includes(q.id));
  } else {
    questions = questionsDb[lessonIdUpper];
  }

  if (!questions || questions.length === 0) {
    return res.status(404).json({ error: 'Ders veya sorular bulunamadı' });
  }

  const results = [];
  let correct = 0;

  for (const question of questions) {
    const userAnswer = answers[question.id];
    const isCorrect = userAnswer === question.correctAnswer;

    if (isCorrect) correct++;

    results.push({
      questionId: question.id,
      question: question.question,
      userAnswer: userAnswer || null,
      correctAnswer: question.correctAnswer,
      isCorrect,
      difficulty: question.difficulty,
      explanation: question.explanation,
      explanationEN: question.explanationEN || question.explanation,
      trapExplanation: userAnswer && !isCorrect
        ? question.trapExplanation?.[userAnswer]
        : null,
      trapExplanationEN: userAnswer && !isCorrect
        ? question.trapExplanationEN?.[userAnswer] || question.trapExplanation?.[userAnswer]
        : null
    });
  }

  const score = questions.length > 0
    ? Math.round((correct / questions.length) * 100)
    : 0;

  const performance =
    score === 100 ? 'Mükemmel! 🎉' :
    score >= 80  ? 'Harika! Çok yaklaştın 💪' :
    score >= 60  ? 'İyi gidiyorsun, biraz daha pratik 📖' :
    'Bu konuyu tekrar çalış 🔄';

  // Hata analizi
  const mistakes = results.filter(r => !r.isCorrect);
  const commonTraps = mistakes.map(m => m.trapExplanation).filter(Boolean);

  res.json({
    lessonId: lessonIdUpper,
    score,
    correct,
    total: questions.length,
    performance,
    results,
    errorAnalysis: {
      mistakeCount: mistakes.length,
      commonTraps,
      recommendation: mistakes.length === 0
        ? 'Sonraki derse geç!'
        : `${mistakes.length} soruyu tekrar incele`
    }
  });
});

module.exports = router;
