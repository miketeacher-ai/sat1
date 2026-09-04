// middleware/qualityCheck.js
// Her soruyu kalite kriterlerine göre doğrular

const QUALITY_CRITERIA = {
  minExplanationWords: 15,
  requiredChoices: ['A', 'B', 'C', 'D'],
  validDifficulties: ['easy', 'medium', 'hard'],
  requiredFields: ['id', 'lessonId', 'question', 'choices', 'correctAnswer', 'explanation', 'qualityChecked']
};

/**
 * Tek bir soruyu kalite kontrolünden geçirir.
 * @returns {{ passed: boolean, score: number, issues: string[] }}
 */
function checkQuestion(question) {
  const issues = [];
  let score = 100;

  // 1. Zorunlu alanlar
  for (const field of QUALITY_CRITERIA.requiredFields) {
    if (!question[field]) {
      issues.push(`Missing required field: ${field}`);
      score -= 15;
    }
  }

  // 2. Cevap seçenekleri tam mı?
  if (question.choices) {
    for (const key of QUALITY_CRITERIA.requiredChoices) {
      if (!question.choices[key]) {
        issues.push(`Missing choice: ${key}`);
        score -= 10;
      }
    }
  }

  // 3. Doğru cevap geçerli mi?
  if (question.correctAnswer && !QUALITY_CRITERIA.requiredChoices.includes(question.correctAnswer)) {
    issues.push(`Invalid correctAnswer: ${question.correctAnswer}`);
    score -= 20;
  }

  // 4. Açıklama yeterli uzunlukta mı?
  if (question.explanation) {
    const wordCount = question.explanation.trim().split(/\s+/).length;
    if (wordCount < QUALITY_CRITERIA.minExplanationWords) {
      issues.push(`Explanation too short (${wordCount} words, min ${QUALITY_CRITERIA.minExplanationWords})`);
      score -= 10;
    }
  }

  // 5. Zorluk seviyesi geçerli mi?
  if (question.difficulty && !QUALITY_CRITERIA.validDifficulties.includes(question.difficulty)) {
    issues.push(`Invalid difficulty: ${question.difficulty}`);
    score -= 5;
  }

  // 6. Tuzak açıklaması var mı?
  if (!question.trapExplanation || Object.keys(question.trapExplanation).length === 0) {
    issues.push('Missing trapExplanation');
    score -= 10;
  }

  // 7. Manuel kalite onayı
  if (!question.qualityChecked) {
    issues.push('Not manually quality checked');
    score -= 15;
  }

  return {
    passed: score >= 70 && issues.length === 0,
    score: Math.max(0, score),
    issues
  };
}

/**
 * Tüm soru veri tabanını kontrol eder.
 */
function runFullQualityReport(questionsDb) {
  const report = {
    generatedAt: new Date().toISOString(),
    totalQuestions: 0,
    passed: 0,
    failed: 0,
    averageScore: 0,
    byLesson: {},
    flaggedQuestions: []
  };

  let totalScore = 0;

  for (const [lessonId, questions] of Object.entries(questionsDb)) {
    report.byLesson[lessonId] = { total: 0, passed: 0, failed: 0 };

    for (const question of questions) {
      report.totalQuestions++;
      report.byLesson[lessonId].total++;

      const result = checkQuestion(question);
      totalScore += result.score;

      if (result.passed) {
        report.passed++;
        report.byLesson[lessonId].passed++;
      } else {
        report.failed++;
        report.byLesson[lessonId].failed++;
        report.flaggedQuestions.push({
          id: question.id,
          lessonId,
          score: result.score,
          issues: result.issues
        });
      }
    }
  }

  report.averageScore = report.totalQuestions > 0
    ? Math.round(totalScore / report.totalQuestions)
    : 0;

  report.qualityGrade =
    report.averageScore >= 90 ? 'A' :
    report.averageScore >= 80 ? 'B' :
    report.averageScore >= 70 ? 'C' : 'F';

  return report;
}

module.exports = { checkQuestion, runFullQualityReport };
