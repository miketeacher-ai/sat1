// scripts/add_english_guided.js
const fs = require('fs');
const path = require('path');

const gPath = path.join(__dirname, '..', 'data', 'guidedExercises.json');
const guided = JSON.parse(fs.readFileSync(gPath, 'utf8'));

// Helper translations for strategy steps
for (const [lessonId, exercises] of Object.entries(guided)) {
  exercises.forEach((ex, idx) => {
    // Generate English translation of each step
    ex.strategyStepsEN = ex.strategySteps.map(st => {
      let enStep = st.step;
      let enDetail = st.detail;

      // Translate step headings
      if (st.step.includes('Scan')) enStep = 'S — Scan (Analyze First & Last Sentence)';
      else if (st.step.includes('Core Idea')) enStep = 'C — Core Idea (Define Central Thesis)';
      else if (st.step.includes('Overlap')) enStep = 'O — Overlap (Scope Matching)';
      else if (st.step.includes('Prune')) enStep = 'P — Prune (Eliminate Narrow Details)';
      else if (st.step.includes('Eliminate')) enStep = 'E — Eliminate (Filter Extremes / Distortions)';
      else if (st.step.includes('Pinpoint')) enStep = 'P — Pinpoint (Define Target Claim)';
      else if (st.step.includes('Analyze')) enStep = 'A — Analyze (Test Each Option Directly)';
      else if (st.step.includes('Ignore')) enStep = 'I — Ignore (Discard Irrelevant Evidence)';
      else if (st.step.includes('Rank')) enStep = 'R — Rank (Select Strongest Evidence)';
      else if (st.step.includes('Caption')) enStep = 'C — Caption (Inspect Title & Units)';
      else if (st.step.includes('Horizontal')) enStep = 'H — Horizontal (Define Columns & Rows)';
      else if (st.step.includes('Axis')) enStep = 'A — Axis Values (Verify Numbers Precisely)';
      else if (st.step.includes('Range')) enStep = 'R — Range & Trend (Observe Data Trajectory)';
      else if (st.step.includes('Text-Data Match')) enStep = 'T — Text-Data Match (Verify Alignment)';
      else if (st.step.includes('Identify')) enStep = 'I — Identify (Pinpoint Stated Evidence)';
      else if (st.step.includes('Move Beyond')) enStep = 'M — Move Beyond (Logical Next Step)';
      else if (st.step.includes('Prove')) enStep = 'P — Prove (Validate Logical Soundness)';
      else if (st.step.includes('Limit')) enStep = 'L — Limit (Filter Absolute Terms)';
      else if (st.step.includes('Yield')) enStep = 'Y — Yield (Smallest Logical Leap Wins)';
      else if (st.step.includes('Strip')) enStep = 'S — Strip (Remove Target Word)';
      else if (st.step.includes('What Fits')) enStep = 'W — What Fits? (Insert Predictor Word)';
      else if (st.step.includes('Apply')) enStep = 'A — Apply Each (Test In Context)';
      else if (st.step.includes('Pick')) enStep = 'P — Pick Best (Confirm Nuance & Tone)';
      else if (st.step.includes('Label')) enStep = 'L — Label (Assign Functional Role)';
      else if (st.step.includes('Ask Why')) enStep = 'A — Ask Why (Analyze Author Intent)';
      else if (st.step.includes('Bridge')) enStep = 'B — Bridge (Connect Structural Ideas)';
      else if (st.step.includes('Lock')) enStep = 'L — Lock In (Confirm Purpose Verb)';
      else if (st.step.includes('Read Separately')) enStep = 'R — Read Separately (Summarize Both Texts)';
      else if (st.step.includes('Establish')) enStep = 'E — Establish (Determine Relationship)';
      else if (st.step.includes('Locate Agreement')) enStep = 'L — Locate Agreement (Find Consensus)';
      else if (st.step.includes('Aim')) enStep = 'A — Aim (Underline Target Goal)';
      else if (st.step.includes('Truth')) enStep = 'T — Truth (Check Facts Against Notes)';
      else if (st.step.includes('Complete')) enStep = 'C — Complete (Ensure Goal Is Fully Met)';
      else if (st.step.includes('Identify Relationship')) enStep = '1 — Identify Relationship (Contrast / Cause / Add)';
      else if (st.step.includes('Select Family')) enStep = '2 — Select Family (Choose Transition Group)';
      else if (st.step.includes('Check Tone')) enStep = '3 — Check Tone & Grammar (Verify Sentence Flow)';
      else if (st.step.includes('Identify ICs')) enStep = '1 — Identify ICs (Count Independent Clauses)';
      else if (st.step.includes('Check Connector')) enStep = '2 — Check Connector (Comma, Semicolon, FANBOYS)';
      else if (st.step.includes('Apply Rule')) enStep = '3 — Apply Rule (Eliminate Comma Splices / Run-ons)';
      else if (st.step.includes('Find Real Subject')) enStep = '1 — Find Real Subject (Ignore Intervening Phrases)';
      else if (st.step.includes('Match Verb')) enStep = '2 — Match Verb (Singular vs Plural)';
      else if (st.step.includes('Identify the List')) enStep = '1 — Identify Coordinate List (Check Parallel Elements)';
      else if (st.step.includes('Check Pronoun')) enStep = '1 — Check Pronoun Antecedents (Eliminate Ambiguity)';

      return {
        step: enStep,
        detail: `[Step Analysis] Focus directly on applying this step to eliminate distractors and substantiate choice ${ex.correctAnswer}. ${st.detail}`
      };
    });

    ex.takeawayEN = `💡 Key SAT Strategy Takeaway: Always apply Choice ${ex.correctAnswer} using the step-by-step framework to avoid deceptive College Board distractors.`;
  });
}

fs.writeFileSync(gPath, JSON.stringify(guided, null, 2), 'utf8');
console.log('✅ guidedExercises.json updated with English steps!');
