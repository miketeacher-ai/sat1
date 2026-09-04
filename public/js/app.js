// public/js/app.js - SAT Reading Web Service Client Library

const SATApp = {
  // localStorage Progress Helpers
  getProgressKey() {
    return 'sat_reading_progress_v1';
  },

  getAllProgress() {
    try {
      const data = localStorage.getItem(this.getProgressKey());
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Progress read error:', e);
      return {};
    }
  },

  getLessonProgress(lessonId) {
    const all = this.getAllProgress();
    return all[lessonId] || null;
  },

  saveQuizResult(lessonId, resultData) {
    const all = this.getAllProgress();
    all[lessonId] = {
      score: resultData.score,
      correct: resultData.correct,
      total: resultData.total,
      completedAt: new Date().toISOString(),
      performance: resultData.performance
    };
    try {
      localStorage.setItem(this.getProgressKey(), JSON.stringify(all));
    } catch (e) {
      console.error('Progress save error:', e);
    }
  },

  calculateOverallStats(lessons) {
    const progress = this.getAllProgress();
    const completedLessonIds = Object.keys(progress);
    const totalLessons = lessons.length;
    const completedCount = completedLessonIds.length;

    let totalScoreSum = 0;
    completedLessonIds.forEach(id => {
      totalScoreSum += progress[id].score || 0;
    });

    const avgScore = completedCount > 0 ? Math.round(totalScoreSum / completedCount) : 0;
    const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    return {
      totalLessons,
      completedCount,
      avgScore,
      percentage
    };
  },

  // API Callers
  async fetchLessons(category = '') {
    const url = category ? `/api/lessons?category=${encodeURIComponent(category)}` : '/api/lessons';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Dersler yüklenemedi.');
    return await res.json();
  },

  async fetchLesson(id) {
    const res = await fetch(`/api/lessons/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error('Ders detayı yüklenemedi.');
    return await res.json();
  },

  async fetchQuiz(lessonId) {
    const res = await fetch(`/api/quiz/${encodeURIComponent(lessonId)}`);
    if (!res.ok) throw new Error('Quiz soruları yüklenemedi.');
    return await res.json();
  },

  async submitQuiz(lessonId, answers) {
    const res = await fetch('/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId, answers })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Cevaplar gönderilemedi.');
    }
    return await res.json();
  },

  async fetchQualityReport() {
    const res = await fetch('/api/quality/report');
    if (!res.ok) throw new Error('Kalite raporu alınamadı.');
    return await res.json();
  },

  async flagQuestion(questionId, reason, suggestedCorrection = '') {
    const res = await fetch('/api/quality/flag', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, reason, suggestedCorrection })
    });
    return await res.json();
  },

  // Helper formatting
  getDifficultyBadge(difficulty) {
    const map = {
      easy: { text: 'Kolay', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      medium: { text: 'Orta', bg: 'bg-amber-100 text-amber-800 border-amber-300' },
      hard: { text: 'Zor', bg: 'bg-rose-100 text-rose-800 border-rose-300' }
    };
    const c = map[difficulty] || { text: difficulty, bg: 'bg-gray-100 text-gray-800 border-gray-300' };
    return `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold border ${c.bg}">${c.text}</span>`;
  }
};
