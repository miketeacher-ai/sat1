// routes/quality.js
const express = require('express');
const router = express.Router();
const { runFullQualityReport } = require('../middleware/qualityCheck');
const questionsDb = require('../data/questions.json');
const { validateFlag } = require('../middleware/validator');

const flaggedItems = [];

// GET /api/quality/report — tüm soruların kalite ve doğruluk analiz raporu
router.get('/report', (req, res) => {
  const report = runFullQualityReport(questionsDb);
  report.userReportedFlagsCount = flaggedItems.length;
  report.userReportedFlags = flaggedItems;
  res.json(report);
});

// POST /api/quality/flag — kullanıcı veya eğitmen hatalı soru/açıklama bildirimi
router.post('/flag', validateFlag, (req, res) => {
  const { questionId, reason, suggestedCorrection } = req.body;
  const flagRecord = {
    id: `FLAG-${Date.now()}`,
    questionId,
    reason,
    suggestedCorrection: suggestedCorrection || null,
    createdAt: new Date().toISOString()
  };
  flaggedItems.push(flagRecord);

  res.status(201).json({
    message: 'Geri bildiriminiz kaydedildi, kalite kontrol ekibine iletildi.',
    flag: flagRecord
  });
});

module.exports = router;
