// routes/lessons.js
const express = require('express');
const router = express.Router();
const { validateLessonId } = require('../middleware/validator');
const lessons = require('../data/lessons.json');
const guidedExercises = require('../data/guidedExercises.json');

// GET /api/lessons — tüm dersler (özet liste)
router.get('/', (req, res) => {
  const { category } = req.query;

  let result = lessons.map(l => ({
    id: l.id,
    title: l.title,
    titleTR: l.titleTR,
    category: l.category,
    categoryTR: l.categoryTR,
    icon: l.icon,
    difficulty: l.difficulty,
    questionCount: l.questionCount,
    typicalCount: l.typicalCount,
    signalPhrases: l.signalPhrases
  }));

  if (category) {
    result = result.filter(l =>
      l.category.toLowerCase().includes(category.toLowerCase()) ||
      l.categoryTR.toLowerCase().includes(category.toLowerCase())
    );
  }

  res.json({
    total: result.length,
    lessons: result
  });
});

// GET /api/lessons/:id — tek ders (tam içerik + 3 rehberli alıştırma)
router.get('/:id', validateLessonId, (req, res) => {
  const lesson = lessons.find(l => l.id === req.params.id.toUpperCase());

  if (!lesson) {
    return res.status(404).json({
      error: 'Ders bulunamadı',
      detail: `ID: ${req.params.id}`
    });
  }

  res.json({
    ...lesson,
    guidedExercises: guidedExercises[lesson.id] || []
  });
});

// GET /api/lessons/:id/guided — sadece 3 rehberli alıştırma
router.get('/:id/guided', validateLessonId, (req, res) => {
  const list = guidedExercises[req.params.id.toUpperCase()] || [];
  res.json({
    lessonId: req.params.id.toUpperCase(),
    total: list.length,
    guidedExercises: list
  });
});

// GET /api/lessons/:id/skills — sadece beceri tablosu
router.get('/:id/skills', validateLessonId, (req, res) => {
  const lesson = lessons.find(l => l.id === req.params.id.toUpperCase());

  if (!lesson) {
    return res.status(404).json({ error: 'Ders bulunamadı' });
  }

  res.json({
    id: lesson.id,
    title: lesson.title,
    framework: lesson.framework,
    skills: lesson.skills,
    wrongAnswerTraps: lesson.wrongAnswerTraps,
    goldenRules: lesson.goldenRules
  });
});

module.exports = router;
