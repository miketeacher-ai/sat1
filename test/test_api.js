// test/test_api.js - Otomatik Kalite ve Entegrasyon Testleri
const { runFullQualityReport } = require('../middleware/qualityCheck');
const questionsDb = require('../data/questions.json');
const lessons = require('../data/lessons.json');

console.log('==================================================');
console.log('🧪 SAT READING WEB SERVICE KALİTE & TEST SUITE');
console.log('==================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✅ [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`❌ [FAIL] ${message}`);
  }
}

// TEST 1: Ders Veritabanı Bütünlüğü
console.log('--- 1. Ders Veritabanı Kontrolleri ---');
assert(Array.isArray(lessons), 'lessons.json bir dizi olmalı');
assert(lessons.length === 11, `Tam 11 ders olmalı (Mevcut: ${lessons.length})`);

const lessonIds = lessons.map(l => l.id);
const expectedIds = ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '3A', '3B', '4A', '4B'];
expectedIds.forEach(id => {
  assert(lessonIds.includes(id), `Ders ${id} mevcut olmalı`);
});

lessons.forEach(l => {
  assert(l.title && l.titleTR, `Ders ${l.id} Türkçe ve İngilizce başlığa sahip olmalı`);
  assert(l.framework && l.framework.name, `Ders ${l.id} çözüm çerçevesine (mnemonic) sahip olmalı`);
  assert(Array.isArray(l.skills) && l.skills.length === 5, `Ders ${l.id} 5 temel beceriye sahip olmalı`);
  assert(Array.isArray(l.wrongAnswerTraps) && l.wrongAnswerTraps.length >= 4, `Ders ${l.id} en az 4 tuzak analizi içermeli`);
  assert(Array.isArray(l.goldenRules) && l.goldenRules.length >= 3, `Ders ${l.id} en az 3 altın kural içermeli`);
});

// TEST 2: Soru Bankası ve Kalite Raporu
console.log('\n--- 2. Soru Kalite & Doğruluk Denetimi ---');
const qualityReport = runFullQualityReport(questionsDb);

console.log(`Toplam Soru Sayısı: ${qualityReport.totalQuestions}`);
console.log(`Geçen Soru Sayısı: ${qualityReport.passed}`);
console.log(`Başarısız Soru Sayısı: ${qualityReport.failed}`);
console.log(`Ortalama Kalite Skoru: ${qualityReport.averageScore}/100`);
console.log(`Kalite Notu: ${qualityReport.qualityGrade}`);

assert(qualityReport.totalQuestions === 55, `Tam 55 soru olmalı (11 tip x 5 soru). Mevcut: ${qualityReport.totalQuestions}`);
assert(qualityReport.failed === 0, `0 hatalı soru olmalı. Mevcut: ${qualityReport.failed}`);
assert(qualityReport.averageScore >= 95, `Ortalama kalite skoru en az 95 olmalı. Mevcut: ${qualityReport.averageScore}`);
assert(qualityReport.qualityGrade === 'A', `Kalite derecesi 'A' olmalı. Mevcut: ${qualityReport.qualityGrade}`);

// Her dersin tam 5 sorusu var mı?
expectedIds.forEach(id => {
  const qList = questionsDb[id] || [];
  assert(qList.length === 5, `Ders ${id} için tam 5 soru olmalı (Mevcut: ${qList.length})`);
  
  qList.forEach(q => {
    assert(['A', 'B', 'C', 'D'].includes(q.correctAnswer), `Soru ${q.id} geçerli doğru cevaba sahip olmalı (A/B/C/D)`);
    assert(q.choices && Object.keys(q.choices).length === 4, `Soru ${q.id} 4 seçeneğe sahip olmalı`);
    assert(q.explanation && q.explanation.length > 20, `Soru ${q.id} detaylı açıklamaya sahip olmalı`);
    assert(q.trapExplanation && Object.keys(q.trapExplanation).length >= 1, `Soru ${q.id} en az 1 tuzak açıklamasına sahip olmalı`);
  });
});

console.log('\n==================================================');
console.log(`🏁 TEST SONUCU: ${passedTests}/${totalTests} BAŞARILI`);
console.log('==================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
