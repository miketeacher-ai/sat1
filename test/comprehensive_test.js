// test/comprehensive_test.js
// SAT Reading & Writing Web Service - End-to-End Stress & Verification Test Suite

const lessons = require('../data/lessons.json');
const questions = require('../data/questions.json');
const guided = require('../data/guidedExercises.json');

const BASE_URL = 'http://localhost:3000';

let passCount = 0;
let failCount = 0;
const failures = [];

function check(desc, condition, detail = '') {
  if (condition) {
    console.log(`  ✅ [PASS] ${desc}`);
    passCount++;
  } else {
    console.error(`  ❌ [FAIL] ${desc} ${detail ? '-> ' + detail : ''}`);
    failCount++;
    failures.push({ desc, detail });
  }
}

async function request(path, options = {}) {
  const url = BASE_URL + path;
  try {
    const res = await fetch(url, options);
    let data = null;
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }
    return { status: res.status, headers: res.headers, data };
  } catch (err) {
    return { status: 0, error: err.message };
  }
}

async function runAllTests() {
  console.log('===============================================================');
  console.log('🧪 SAT READING & WRITING — GENİŞ ÇAPLI SİSTEM & STRESS TESTİ');
  console.log('===============================================================\n');

  // -------------------------------------------------------------
  // BÖLÜM 1: STATİK SAYFALAR VE DOSYALAR
  // -------------------------------------------------------------
  console.log('📌 BÖLÜM 1: Web Sayfaları & Statik Varlıklar');
  const pages = [
    { path: '/', titleSnippet: 'SAT Reading & Writing Akademi' },
    { path: '/lesson?id=1A', titleSnippet: 'Ders Detayı' },
    { path: '/quiz?id=1A', titleSnippet: 'SAT Alıştırma' },
    { path: '/results?id=1A', titleSnippet: 'Sonuç Raporu' },
    { path: '/js/app.js', titleSnippet: 'SATApp' }
  ];

  for (const p of pages) {
    const res = await request(p.path);
    check(`Sayfa erişimi: ${p.path} (HTTP 200)`, res.status === 200);
    check(`Sayfa içeriği geçerli: ${p.path}`, typeof res.data === 'string' && res.data.includes(p.titleSnippet));
  }

  // -------------------------------------------------------------
  // BÖLÜM 2: VERİ TABANI BÜTÜNLÜĞÜ (DATA INTEGRITY)
  // -------------------------------------------------------------
  console.log('\n📌 BÖLÜM 2: Veri Tabanı Bütünlüğü & Çift Dilli İçerik');
  check('11 Dersin tamamı mevcut', Array.isArray(lessons) && lessons.length === 11);

  const lessonIds = ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '3A', '3B', '4A', '4B'];

  for (const id of lessonIds) {
    const l = lessons.find(x => x.id === id);
    check(`Ders ${id} şablonu eksiksiz`, l && l.framework && l.skills.length === 5 && l.goldenRules.length >= 3);

    // 5 Soru kontrolü
    const qList = questions[id];
    check(`Ders ${id} soru bankası tam (5 soru)`, Array.isArray(qList) && qList.length === 5);

    if (qList) {
      qList.forEach(q => {
        const hasChoices = q.choices && q.choices.A && q.choices.B && q.choices.C && q.choices.D;
        const validAns = ['A', 'B', 'C', 'D'].includes(q.correctAnswer);
        const hasTR = q.explanation && q.explanation.length > 20;
        const hasEN = q.explanationEN && q.explanationEN.length > 20;
        const hasTrapsTR = q.trapExplanation && Object.keys(q.trapExplanation).length >= 1;
        const hasTrapsEN = q.trapExplanationEN && Object.keys(q.trapExplanationEN).length >= 1;

        check(`Soru ${q.id}: Seçenekler ve Doğru Cevap geçerli`, hasChoices && validAns);
        check(`Soru ${q.id}: Türkçe ve İngilizce açıklamalar tam`, hasTR && hasEN);
        check(`Soru ${q.id}: Çift dilli tuzak analizleri mevcut`, hasTrapsTR && hasTrapsEN);
      });
    }

    // 3 Rehberli Alıştırma kontrolü
    const gList = guided[id];
    check(`Ders ${id} 3 Rehberli Alıştırma içeriyor`, Array.isArray(gList) && gList.length === 3);

    if (gList) {
      gList.forEach(g => {
        const hasStepsTR = Array.isArray(g.strategySteps) && g.strategySteps.length >= 3;
        const hasStepsEN = Array.isArray(g.strategyStepsEN) && g.strategyStepsEN.length >= 3;
        check(`Alıştırma ${g.id}: Strateji adımları çift dilli`, hasStepsTR && hasStepsEN);
      });
    }
  }

  // -------------------------------------------------------------
  // BÖLÜM 3: GÜVENLİK VE CEVAP SIZINTISI KONTROLÜ (ANTI-CHEAT)
  // -------------------------------------------------------------
  console.log('\n📌 BÖLÜM 3: Güvenlik & Cevap Sızıntısı Denetimi (Anti-Cheat)');
  for (const id of lessonIds) {
    const res = await request(`/api/quiz/${id}`);
    check(`Quiz endpoint ${id} HTTP 200 döndü`, res.status === 200);

    const questionsReturned = res.data.questions || [];
    let leakDetected = false;
    for (const q of questionsReturned) {
      if (q.correctAnswer || q.explanation || q.explanationEN || q.trapExplanation || q.trapExplanationEN) {
        leakDetected = true;
        break;
      }
    }
    check(`Ders ${id} sorularında cevap anahtarı gizlendi (Sızıntı YOK)`, !leakDetected);
  }

  // -------------------------------------------------------------
  // BÖLÜM 4: PUANLAMA, HATA ANALİZİ VE STRES TESTLERİ
  // -------------------------------------------------------------
  console.log('\n📌 BÖLÜM 4: Notlandırma, Puanlama & Hata Analizi');

  // Senaryo A: %100 Başarı (5/5 Doğru)
  const perfectSubmit = await request('/api/quiz/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lessonId: '1A',
      answers: {
        '1A-Q1': 'B',
        '1A-Q2': 'C',
        '1A-Q3': 'C',
        '1A-Q4': 'C',
        '1A-Q5': 'B'
      }
    })
  });
  check('Mükemmel Quiz Gönderimi HTTP 200', perfectSubmit.status === 200);
  check('Mükemmel Skor = 100%', perfectSubmit.data.score === 100 && perfectSubmit.data.correct === 5);
  check('Hata sayısı = 0', perfectSubmit.data.errorAnalysis.mistakeCount === 0);

  // Senaryo B: %0 Başarı (0/5 Yanlış) -> Tüm tuzaklar tetiklenmeli
  const failSubmit = await request('/api/quiz/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lessonId: '1A',
      answers: {
        '1A-Q1': 'A',
        '1A-Q2': 'A',
        '1A-Q3': 'A',
        '1A-Q4': 'A',
        '1A-Q5': 'A'
      }
    })
  });
  check('Tüm Yanlışlar Quiz Gönderimi HTTP 200', failSubmit.status === 200);
  check('Skor = 0%', failSubmit.data.score === 0 && failSubmit.data.correct === 0);
  check('Tüm tuzak açıklamaları Türkçe ve İngilizce geldi', 
    failSubmit.data.results.every(r => r.trapExplanation && r.trapExplanationEN)
  );

  // Senaryo C: RANDOM Mod Gönderimi
  const randomSubmit = await request('/api/quiz/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lessonId: 'RANDOM',
      answers: {
        '1B-Q1': 'B', // Doğru
        '2B-Q1': 'A', // Yanlış
        '3A-Q1': 'B', // Doğru
        '4A-Q1': 'A'  // Doğru
      }
    })
  });
  check('RANDOM Modu Gönderimi HTTP 200', randomSubmit.status === 200);
  check('RANDOM Modunda 4 soru değerlendirildi', randomSubmit.data.total === 4);
  check('RANDOM Modu doğru skoru hesapladı (3/4 = %75)', randomSubmit.data.score === 75);

  // -------------------------------------------------------------
  // BÖLÜM 5: NEGATİF VE HATA YÖNETİMİ TESTLERİ (ERROR HANDLING)
  // -------------------------------------------------------------
  console.log('\n📌 BÖLÜM 5: Hata Yönetimi & Giriş Doğrulama (Negative Testing)');

  // 1. Geçersiz ders ID
  const badLesson = await request('/api/lessons/99Z');
  check('Geçersiz Ders ID isteği reddedildi (HTTP 400)', badLesson.status === 400);

  // 2. Olmayan quiz ID
  const badQuiz = await request('/api/quiz/99Z');
  check('Olmayan Quiz ID isteği reddedildi (HTTP 404)', badQuiz.status === 404);

  // 3. Geçersiz cevap seçeneği (E seçeneği)
  const badAnswerChoice = await request('/api/quiz/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lessonId: '1A',
      answers: { '1A-Q1': 'Z' }
    })
  });
  check('Geçersiz seçenek (Z) reddedildi (HTTP 400)', badAnswerChoice.status === 400);

  // 4. Eksik gövde
  const emptySubmit = await request('/api/quiz/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  check('Boş POST body reddedildi (HTTP 400)', emptySubmit.status === 400);

  // 5. Geçersiz Soru Bildirimi (Flag)
  const badFlag = await request('/api/quality/flag', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionId: '1A-Q1', reason: 'abc' }) // < 5 karakter
  });
  check('Yetersiz gerekçeli soru bildirimi reddedildi (HTTP 400)', badFlag.status === 400);

  // 6. Başarılı Soru Bildirimi (Flag)
  const goodFlag = await request('/api/quality/flag', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      questionId: '1A-Q1',
      reason: 'Gerekçe açıklaması en az 5 karakterden uzun geçerli metin',
      suggestedCorrection: 'Düzeltme metni'
    })
  });
  check('Geçerli soru bildirimi kabul edildi (HTTP 201)', goodFlag.status === 201);

  // -------------------------------------------------------------
  // BÖLÜM 6: KALİTE RAPORU VE FİNAL ÖZET
  // -------------------------------------------------------------
  console.log('\n📌 BÖLÜM 6: Kalite Raporu Uç Noktası');
  const qualityRep = await request('/api/quality/report');
  check('Kalite raporu HTTP 200', qualityRep.status === 200);
  check('Kalite puanı 100/100', qualityRep.data.averageScore === 100);
  check('Kalite derecesi A', qualityRep.data.qualityGrade === 'A');
  check('0 Başarısız soru', qualityRep.data.failed === 0);

  console.log('\n===============================================================');
  console.log(`🏁 TEST TAMAMLANDI: ${passCount} BAŞARILI / ${failCount} BAŞARISIZ`);
  console.log('===============================================================');

  if (failCount > 0) {
    console.error('Başarısız olan maddeler:', JSON.stringify(failures, null, 2));
    process.exit(1);
  } else {
    console.log('🎉 TÜM SİSTEM BİLEŞENLERİ %100 HATASIZ ÇALIŞIYOR!');
    process.exit(0);
  }
}

runAllTests();
