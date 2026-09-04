// middleware/validator.js
// API isteklerini doğrular

/**
 * Quiz submit isteğini doğrular.
 * Beklenen body: { lessonId: string, answers: { questionId: 'A'|'B'|'C'|'D' } }
 */
function validateQuizSubmit(req, res, next) {
  const { lessonId, answers } = req.body;

  if (!lessonId || typeof lessonId !== 'string') {
    return res.status(400).json({
      error: 'Geçersiz istek',
      detail: 'lessonId zorunlu ve string olmalı'
    });
  }

  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
    return res.status(400).json({
      error: 'Geçersiz istek',
      detail: 'answers objesi zorunlu (örn: { "1A-Q1": "B" })'
    });
  }

  const validChoices = ['A', 'B', 'C', 'D'];
  for (const [qId, answer] of Object.entries(answers)) {
    if (!validChoices.includes(answer)) {
      return res.status(400).json({
        error: 'Geçersiz cevap',
        detail: `"${qId}" için geçersiz cevap: "${answer}". Sadece A, B, C, D geçerli.`
      });
    }
  }

  next();
}

/**
 * Lesson ID formatını doğrular (örn: 1A, 2B, 4A)
 */
function validateLessonId(req, res, next) {
  const { id } = req.params;
  const validPattern = /^[1-4][A-D]$/;

  if (!validPattern.test(id)) {
    return res.status(400).json({
      error: 'Geçersiz ders ID',
      detail: `"${id}" geçerli bir ders ID değil. Örnek: 1A, 2B, 3A, 4B`
    });
  }

  next();
}

/**
 * Flag isteğini doğrular.
 */
function validateFlag(req, res, next) {
  const { questionId, reason } = req.body;

  if (!questionId || typeof questionId !== 'string') {
    return res.status(400).json({
      error: 'questionId zorunlu'
    });
  }

  if (!reason || typeof reason !== 'string' || reason.trim().length < 5) {
    return res.status(400).json({
      error: 'reason zorunlu ve en az 5 karakter olmalı'
    });
  }

  next();
}

module.exports = { validateQuizSubmit, validateLessonId, validateFlag };
