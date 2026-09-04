// scripts/add_english_explanations.js
const fs = require('fs');
const path = require('path');

const qPath = path.join(__dirname, '..', 'data', 'questions.json');
const gPath = path.join(__dirname, '..', 'data', 'guidedExercises.json');

const questions = JSON.parse(fs.readFileSync(qPath, 'utf8'));
const guided = JSON.parse(fs.readFileSync(gPath, 'utf8'));

// 1. English Explanations for all 55 questions in questions.json
const enExplanations = {
  // 1A
  "1A-Q1": {
    en: "Choice B is the best response because it encapsulates the overarching claim of the passage: discoveries at hydrothermal vents and deep ocean floors have broadened the scientific paradigm regarding where life can flourish and persist.",
    traps: {
      "A": "TOO SPECIFIC — Focuses solely on the 1977 discovery and two organisms, missing the broader scientific significance.",
      "C": "NOT MENTIONED — The text makes no comparison regarding the thermodynamic efficiency of chemosynthesis versus photosynthesis.",
      "D": "TOO NARROW — Europa's ocean is merely an illustrative implication mentioned at the end, not the central thesis."
    }
  },
  "1A-Q2": {
    en: "Choice C accurately summarizes the complete passage: the transformation in urban design paradigms from an automobile-dominated philosophy to human-scaled, walkable neighborhood environments.",
    traps: {
      "A": "TOO SPECIFIC — Jane Jacobs's book is an important turning point, but not the entirety of the text.",
      "B": "TOO SPECIFIC — Early 20th-century urban conditions merely establish initial historical context.",
      "D": "NOT STATED — The author does not assert walkability as the single most critical determinant of municipal success."
    }
  },
  "1A-Q3": {
    en: "Choice C best captures the author's primary argument that the Columbian Exchange was a multifaceted phenomenon encompassing ecological, social, and economic transformations across both hemispheres.",
    traps: {
      "A": "DISTORTION — The passage underscores both advantageous and devastating outcomes; calling it 'primarily beneficial' is one-sided.",
      "B": "NOT MENTIONED — Sugarcane is cited as driving the slave trade, but the text does not rank it as the single most significant crop.",
      "D": "NOT MENTIONED — Columbus's personal agricultural intentions are never addressed."
    }
  },
  "1A-Q4": {
    en: "Choice C correctly combines two explicit facts stated in the passage: cold-water corals sustain rich biodiversity and are acutely threatened by ocean acidification dissolving their calcium carbonate skeletons.",
    traps: {
      "A": "WRONG DETAIL — Cold-water corals inhabit three oceans at depths between 200 and 4,000 meters, not exclusively below 4,000 meters.",
      "B": "OPPOSITE — The text explicitly states they do not rely on photosynthesis or sunlight.",
      "D": "NOT STATED — No comparative climate resilience between cold-water and tropical corals is asserted."
    }
  },
  "1A-Q5": {
    en: "Choice B conveys the main assertion: digital archives and AI translation technologies have expanded scholarly access and accelerated productivity across classical language studies.",
    traps: {
      "A": "OVERSTATEMENT — The text explicitly notes scholars debate whether AI matches human interpretive nuance.",
      "C": "EXTREME — 'No longer play a role' is overly absolute; academic institutions remain central to scholarship.",
      "D": "EXTREME — 'Fully deciphered' exaggerates the preliminary decipherment progress described."
    }
  },

  // 1B
  "1B-Q1": {
    en: "Choice B directly validates the researcher's conclusion by establishing that adolescents participating in online book communities read a significantly higher volume of books annually.",
    traps: {
      "A": "IRRELEVANT — Time dedicated to homework does not substantiate reading engagement.",
      "C": "CONTRADICTS — Absence of recommendation features would weaken, rather than support, the researcher's thesis.",
      "D": "IRRELEVANT — Declining reading comprehension does not directly measure the volume of reading or social media engagement."
    }
  },
  "1B-Q2": {
    en: "Choice B provides the direct empirical link between vegetation and cooling, showing areas with higher canopy density systematically register lower temperatures.",
    traps: {
      "A": "DEFINES PROBLEM — Merely establishes the definition of urban heat islands without proving a mitigation mechanism.",
      "C": "DESCRIBES ACTION — Notes that an initiative was piloted, but does not provide the supporting causal evidence.",
      "D": "INDIRECT — Citing lack of vegetation explains vulnerability, but does not provide direct positive evidence of mitigation."
    }
  },
  "1B-Q3": {
    en: "Choice A reflects Nussbaum's philosophy: she would concede that humanities offer limited narrow vocational utility while vigorously defending their indispensable role in democratic deliberation and empathy.",
    traps: {
      "B": "OPPOSITE — Nussbaum rejects employer market signals as the definitive metric of educational purpose.",
      "C": "NOT HER ARGUMENT — Nussbaum does not ground her defense in quantifiable economic productivity.",
      "D": "OVERREACH — Nussbaum does not categorically reject economic analysis, but offers a distinct moral framework."
    }
  },
  "1B-Q4": {
    en: "Choice B poses a direct methodological critique: if magnets introduced substantial physical drag or flight impairment, the disorientation was caused by weight rather than disrupted magnetic reception.",
    traps: {
      "A": "WEAK CHALLENGE — Using visual landmarks does not eliminate magnetic field sensing as the primary mechanism.",
      "C": "IRRELEVANT — Captive bird disorientation does not invalidate experimental findings in wild migrants.",
      "D": "IRRELEVANT — Natural regional magnetic variance is consistent with magnetic navigation."
    }
  },
  "1B-Q5": {
    en: "Choice B directly proves the claim by documenting that measurable clinical benefits occur even when patients are explicitly informed that they are receiving an inert placebo.",
    traps: {
      "A": "INCLUDES DECEPTION — Pertains to traditional blind placebos where patients mistakenly believe they are receiving real drugs.",
      "C": "SUPPORTS DECEPTION — Presenting sugar pills as medication is the very definition of deception.",
      "D": "INTERPRETATION — A concluding assertion rather than the empirical data supporting the claim."
    }
  },

  // 1C
  "1C-Q1": {
    en: "Choice A demonstrates acceleration by contrasting the earlier rate (12 mm over 5 years) with the substantially faster recent rate (16 mm over 5 years).",
    traps: {
      "B": "TOTAL NOT RATE — Cumulative sea level rise does not by itself prove that the rate of increase is accelerating.",
      "C": "CONSISTENCY NOT ACCELERATION — Demonstrating steady five-year increases does not show a growing rate of change.",
      "D": "FACTUALLY WRONG — The table shows the largest five-year surge occurred between 2018 and 2023 (16 mm), not 2013-2018."
    }
  },
  "1C-Q2": {
    en: "Choice C correctly identifies the methodological flaw: Germany is the sole European nation in the dataset, making a broad regional generalization about 'European nations' empirically invalid.",
    traps: {
      "A": "INSUFFICIENT DATA — Germany's individual progress cannot be extrapolated to represent all of Europe.",
      "B": "WRONG DIRECTION — Citing Germany's top ranking overlooks the regional sample size limitation.",
      "D": "IRRELEVANT — Brazil's baseline share does not refute the comparative progress argument."
    }
  },
  "1C-Q3": {
    en: "Choice B provides empirical evidence for the non-linear threshold: cognitive scores peak at 8 hours (91 points) and progressively decline with additional sleep (89 at 9h, 84 at 10h).",
    traps: {
      "A": "INCOMPLETE — Only illustrates the ascending phase without documenting the subsequent performance decline.",
      "C": "IRRELEVANT DETAIL — The 37-point gain between 4 and 7 hours does not substantiate the upper-threshold drop.",
      "D": "TOO NARROW — A single pairwise comparison fails to substantiate the overarching non-linear claim."
    }
  },
  "1C-Q4": {
    en: "Choice B accurately evaluates the metrics: e-mail achieves the lowest acquisition cost ($2.10) while securing the second-highest conversion rate (6.8%, behind search engines at 8.5%).",
    traps: {
      "A": "FACTUALLY WRONG — E-mail does not possess the highest conversion rate; search engines rank higher at 8.5%.",
      "C": "FACTUALLY WRONG — Search engine marketing is the most expensive channel ($12.40), not the lowest.",
      "D": "FACTUALLY WRONG — Social media is more expensive ($8.20) than e-mail ($2.10)."
    }
  },
  "1C-Q5": {
    en: "Choice B comprehensively supports the economist's dual conclusion by affirming that both median income increases and unemployment rates decrease at every successive educational credential.",
    traps: {
      "A": "ONE METRIC ONLY — Focuses exclusively on doctoral income while omitting job security metrics.",
      "C": "ONE METRIC ONLY — Examines only unemployment rate without integrating income data.",
      "D": "TOO SPECIFIC — Highlights a single isolated comparison between master's and bachelor's degrees."
    }
  },

  // 1D
  "1D-Q1": {
    en: "Choice C is logically deduced from the text's observation that men who defined their self-worth through their provider roles suffered severe identity distress during economic hardship.",
    traps: {
      "A": "NOT SUPPORTED — The passage does not claim that the American middle class suffered permanent dissolution.",
      "B": "NOT SUPPORTED — The adequacy or inadequacy of government relief is never evaluated in the text.",
      "D": "OVERINFERENCE — The text makes no comparative psychological assessment regarding female experiences."
    }
  },
  "1D-Q2": {
    en: "Choice B logically follows from the ecological cascade: the return of predators altered elk grazing patterns, which stabilized riverbanks and reconfigured the physical landscape.",
    traps: {
      "A": "OVERREACH — 'The most important species in any ecosystem' is an extreme, unsupported generalization.",
      "C": "NOT STATED — Historical elk population capacity prior to 1995 is not documented.",
      "D": "EXTREME — 'Solely' is unwarranted; river erosion involves diverse hydrological factors."
    }
  },
  "1D-Q3": {
    en: "Choice C reasonably infers that because egalitarian Indus cities lacked palaces and monuments, the presence of monumental architecture elsewhere correlates with stratified social hierarchies.",
    traps: {
      "A": "OVERSPECIFIC — Monumental architecture is not identified as an exclusively military display.",
      "B": "EXTREME — 'Always more advanced' is an unsubstantiated value judgment.",
      "D": "NOT STATED — Deliberate destruction of monuments is pure historical speculation."
    }
  },
  "1D-Q4": {
    en: "Choice C captures the linguistic relativity principle implied by the text: grammatical structures (like Hopi time) and specialized lexicons reflect and influence cultural perceptions of reality.",
    traps: {
      "A": "OVERINFERENCE — Encoding time differently does not imply an inability to perceive temporal events.",
      "B": "VALUE JUDGMENT — The passage draws descriptive distinctions without ranking language sophistication.",
      "D": "NORMATIVE — The text does not advocate policy recommendations regarding preservation costs."
    }
  },
  "1D-Q5": {
    en: "Choice C reconciles the contrasting findings: free choice enhances volume and enjoyment, while assigned reading strengthens rigorous comprehension, suggesting a balanced instructional strategy.",
    traps: {
      "A": "EXTREME — 'Always allow' contradicts the finding that structured assigned texts provide distinct benefits.",
      "B": "DISTORTION — Enjoyment and comprehension are not shown to be mutually exclusive.",
      "D": "OVERINFERENCE — Page volume does not automatically guarantee superior analytical comprehension."
    }
  },

  // 2A
  "2A-Q1": {
    en: "Choice B correctly interprets 'fragile' in an academic context: a single contradictory finding could shatter it, meaning the hypothesis is easily disproven or vulnerable to falsification.",
    traps: {
      "A": "LITERAL — Pertains to physical brittleness, which is inapplicable to an abstract scientific theory.",
      "C": "CLOSE BUT WRONG — The hypothesis was structurally elegant, not merely incomplete.",
      "D": "UNSUBSTANTIATED — The text praises its elegance rather than criticizing its reasoning."
    }
  },
  "2A-Q2": {
    en: "Choice C accurately reflects the critical reception: viewing Impressionist brushwork as undisciplined meant critics disregarded the artists as unworthy of serious artistic acclaim.",
    traps: {
      "A": "LITERAL — Refers to employment termination, which does not fit an art critique context.",
      "B": "LITERAL — Refers to physical removal from a room or location.",
      "D": "CLOSE BUT WRONG — 'Briefly considered' contradicts the categorical rejection implied."
    }
  },
  "2A-Q3": {
    en: "Choice C captures the figurative force of 'searing': praised for 'unflinching honesty,' the documentary offered an intensely critical, vivid, and piercing depiction of inequality.",
    traps: {
      "A": "LITERAL — Pertains to physical temperature, a classic SAT distractor trap.",
      "B": "LITERAL — Culinary definition of flash-cooking at high heat.",
      "D": "NOT SUPPORTED — Focuses on emotional intensity and candor rather than technical craftsmanship."
    }
  },
  "2A-Q4": {
    en: "Choice C correctly identifies the metaphorical meaning: with weak enforcement and ignored commitments, the treaty's promises lacked genuine substance and proved completely empty.",
    traps: {
      "A": "LITERAL — Physical emptiness inside an object; inapplicable to legal statutes.",
      "B": "LITERAL — Acoustic description of low-frequency reverberant sound.",
      "D": "NOT SUPPORTED — The provisions were not intellectually confusing; they were simply ignored."
    }
  },
  "2A-Q5": {
    en: "Choice C fits the intellectual maneuvering described: because the philosopher's stance shifted whenever critics approached a flaw, the argument was difficult to grasp or definitively refute.",
    traps: {
      "A": "LITERAL — Physical lubricity or smoothness.",
      "B": "CLOSE BUT WRONG — 'Deceitful' implies moral dishonesty, whereas the text highlights intellectual elusiveness.",
      "D": "NOT SUPPORTED — The issue was evasiveness rather than loose construction."
    }
  },

  // 2B
  "2B-Q1": {
    en: "Choice C defines the overarching rhetorical objective: presenting nuanced survey data to challenge an oversimplified narrative that algorithms unconditionally drive political polarization.",
    traps: {
      "A": "EXTREME — The author explicitly notes the findings 'do not exonerate social media entirely.'",
      "B": "TOO SPECIFIC — Methodological descriptions serve only as supporting background.",
      "D": "NOT STATED — The author does not propose legislative or regulatory mandates."
    }
  },
  "2B-Q2": {
    en: "Choice B identifies the illustrative function of the paragraph: the Aral Sea's dramatic desiccation serves as a concrete case study highlighting the catastrophic scale of water mismanagement.",
    traps: {
      "A": "TOO SPECIFIC — Detailed irrigation policies are secondary to the ecological outcome.",
      "C": "OVERREACH — The text does not claim every large lake faces imminent desiccation.",
      "D": "TOO NARROW — Dust storms represent only the concluding consequence mentioned."
    }
  },
  "2B-Q3": {
    en: "Choice C correctly characterizes the third sentence's interpretive role: it explains what the scientific shift toward metabolic impacts signifies for our conceptual understanding of sleep.",
    traps: {
      "A": "WRONG FUNCTION — It provides an overarching interpretation rather than reporting a novel data point.",
      "B": "WRONG DIRECTION — It contextualizes the modern shift rather than analyzing historical motives.",
      "D": "OPPOSITE — It corroborates and validates the significance of metabolic findings."
    }
  },
  "2B-Q4": {
    en: "Choice B articulates the literary critique: withholding narrative exposition in the opening chapter was a deliberate aesthetic strategy designed to evoke grief before intellectual comprehension.",
    traps: {
      "A": "OPPOSITE — The author commends the structural strategy rather than criticizing it as disoriented.",
      "C": "OVERGENERALIZATION — The author evaluates this specific novel rather than declaring flashbacks the single best device.",
      "D": "OPPOSITE — The text emphasizes that grief preceded understanding in this work."
    }
  },
  "2B-Q5": {
    en: "Choice B captures the concessionary function: acknowledging that gig workers face legitimate vulnerabilities allows the author to build a balanced, nuanced counterpoint regarding autonomy.",
    traps: {
      "A": "WRONG POSITION — It constitutes a concession rather than the author's primary thesis.",
      "C": "WRONG FUNCTION — It concedes a point rather than introducing statistical evidence.",
      "D": "INCOMPLETE — 'Agrees completely' overlooks the author's subsequent defense of worker autonomy."
    }
  },

  // 2C
  "2C-Q1": {
    en: "Choice B captures the nuanced empirical relationship: Text 2 shows structured preschool advantages fade by third grade, partially supporting Text 1's thesis that early academic drills offer no lasting superiority over play.",
    traps: {
      "A": "OVERCLAIM — Text 2 does not prove play lacks benefits; it confirms equal long-term outcomes.",
      "C": "OPPOSITE — Text 2 does not demonstrate that structured preparation causes harm.",
      "D": "CONNECTED — Academic readiness is directly relevant to the developmental debate in Text 1."
    }
  },
  "2C-Q2": {
    en: "Choice B accurately frames Webb's critique: while accepting African participation as historical fact, he warns that Diallo's framing risks creating a false moral and structural equivalence between African and European power.",
    traps: {
      "A": "OPPOSITE — Webb explicitly qualifies and critiques Diallo's thesis.",
      "C": "WRONG DIRECTION — Webb argues European economic demand was the primary driving engine.",
      "D": "OVERREACH — Webb acknowledges African participation rather than labeling Diallo's claims indefensible."
    }
  },
  "2C-Q3": {
    en: "Choice B recognizes that deaf children spontaneously inventing Nicaraguan Sign Language without adult tutoring provides powerful real-world support for Chomsky's innate language acquisition device.",
    traps: {
      "A": "MISREADS — The spontaneous emergence of grammar supports an innate biological predisposition.",
      "C": "DISTORTION — Fundamental grammatical syntax emerged rapidly within a single generation.",
      "D": "IRRELEVANT DISTINCTION — Sign languages adhere to universal linguistic grammar systems."
    }
  },
  "2C-Q4": {
    en: "Choice C succinctly contrasts the competing frameworks: Text 1 champions UBI for poverty alleviation, while Text 2 highlights fiscal deficits and advocates targeted welfare efficiency.",
    traps: {
      "A": "OVERCLAIM — Text 2 raises macro-fiscal concerns rather than claiming all pilots failed.",
      "B": "OPPOSITE — The two texts present conflicting ideological and economic stances.",
      "D": "WRONG TEXT — The social stigma of targeted welfare is argued in Text 1, not Text 2."
    }
  },
  "2C-Q5": {
    en: "Choice C correctly identifies the complicating effect: by demonstrating that MPA outcomes hinge on enforcement and species mobility, Text 2 shows that establishing no-take zones is not an automatic panacea.",
    traps: {
      "A": "OVERCLAIM — Text 2 confirms tropical MPAs succeeded; it does not declare MPAs ineffective.",
      "B": "OPPOSITE — 'Always lead to recovery' is directly contradicted by high-latitude results.",
      "D": "MISREAD — Text 2 evaluates MPAs across both tropical and high-latitude ecosystems."
    }
  },

  // 3A
  "3A-Q1": {
    en: "Choice B perfectly fulfills the dual objective by fronting the Amazon's immense biodiversity and oxygen output, followed immediately by the threat of 17% deforestation.",
    traps: {
      "A": "PARTIAL — Mentions physical area and deforestation, omitting explicit biodiversity importance.",
      "C": "WRONG ORDER — Focuses on deforestation history without highlighting ecological significance.",
      "D": "INCOMPLETE — Emphasizes ecological statistics but completely ignores the environmental threat."
    }
  },
  "3A-Q2": {
    en: "Choice C introduces Marie Curie while highlighting her historically unique double-distinction: the first woman to win a Nobel Prize and the only person to win across two different scientific fields.",
    traps: {
      "A": "NO UNIQUENESS — Merely lists the years without communicating her historical uniqueness.",
      "B": "VAGUE — 'Important contributions' is generic and fails to articulate her singular legacy.",
      "D": "PARTIAL — Notes two Nobel Prizes but omits that they were awarded in two distinct sciences."
    }
  },
  "3A-Q3": {
    en: "Choice B executes a clear comparative structure: contrasting Tokyo's city proper population (14M) directly with the Greater Tokyo Area (37M) to demonstrate metropolitan scale.",
    traps: {
      "A": "WRONG DATA — Integrates transit passenger volume rather than contrasting the two population boundaries.",
      "C": "INCOMPLETE — Cites city proper and transit data while omitting the greater metropolitan comparison.",
      "D": "ONE-SIDED — Provides only metropolitan numbers, missing the required internal comparative contrast."
    }
  },
  "3A-Q4": {
    en: "Choice B targets a business audience by linking commodity market rank (second only to petroleum) with global industry valuation ($460 billion annually).",
    traps: {
      "A": "WRONG FOCUS — Highlights geographical origins and agricultural production rather than market value.",
      "C": "TOO NARROW — Mentions Brazil's single market share without establishing overarching industry worth.",
      "D": "HISTORICAL NOT COMMERCIAL — Discusses cultural significance rather than business and fiscal scale."
    }
  },
  "3A-Q5": {
    en: "Choice A effectively introduces the Great Barrier Reef (2,300 km expanse) and establishes immediate urgency by citing 50% coral loss driven by ocean warming.",
    traps: {
      "B": "NO URGENCY — Catalogs species diversity while omitting any mention of degradation or crisis.",
      "C": "WRONG START — Focuses on global climate dynamics before introducing the reef itself.",
      "D": "NO THREAT — Praises biological diversity while ignoring recent environmental loss."
    }
  },

  // 3B
  "3B-Q1": {
    en: "Choice C provides the appropriate contrastive transition: tumor reduction was remarkably effective, 'However,' serious cardiovascular side effects emerged in Phase III trials.",
    traps: {
      "A": "WRONG DIRECTION — 'Furthermore' introduces cumulative support rather than an adverse development.",
      "B": "WRONG RELATION — 'Therefore' indicates logical consequence, whereas the side effects represent a contrast.",
      "D": "WRONG RELATION — 'For instance' indicates an example rather than a contradictory trial result."
    }
  },
  "3B-Q2": {
    en: "Choice C provides the additive transition: crop rotation conserves soil nutrients, and 'Additionally,' it suppresses pest and pathogen accumulation.",
    traps: {
      "A": "WRONG RELATION — 'In contrast' indicates opposition, whereas both sentences cite agricultural benefits.",
      "B": "WRONG RELATION — 'However' signals contrast rather than cumulative advantages.",
      "D": "WRONG RELATION — 'Consequently' indicates cause-and-effect; pest reduction is a distinct benefit, not a consequence of soil nutrients."
    }
  },
  "3B-Q3": {
    en: "Choice B signals the cause-and-effect relationship: ocean absorption of CO2 creates carbonic acid, and 'As a result,' shell-building organisms struggle to maintain calcium structures.",
    traps: {
      "A": "WRONG RELATION — 'In contrast' is invalid because the second clause is the direct consequence of the first.",
      "C": "WRONG RELATION — 'For example' requires introducing an isolated specimen rather than an overarching ecological result.",
      "D": "WRONG RELATION — 'That said' signals a concession rather than direct chemical causality."
    }
  },
  "3B-Q4": {
    en: "Choice C provides the illustrative transition: following the broad claim that four-day weeks boost productivity, Microsoft Japan's 40% surge serves as a concrete instance ('For instance').",
    traps: {
      "A": "WRONG RELATION — 'Nevertheless' signals an unexpected concession rather than supporting evidence.",
      "B": "WRONG RELATION — 'Conversely' indicates an antithetical outcome, but Microsoft's data confirms the claim.",
      "D": "WRONG RELATION — 'Therefore' implies logical deduction rather than presenting experimental case data."
    }
  },
  "3B-Q5": {
    en: "Choice D signals the contrastive relationship: the longstanding belief that Neanderthals and humans never interbred is directly challenged ('However') by modern DNA evidence.",
    traps: {
      "A": "WRONG RELATION — 'Similarly' suggests parallelism, whereas the two sentences present opposing positions.",
      "B": "WRONG RELATION — 'As a result' indicates causality; modern DNA discoveries are not caused by ancient beliefs.",
      "C": "WRONG RELATION — 'In addition' introduces supplementary facts rather than refuting previous assumptions."
    }
  },

  // 4A
  "4A-Q1": {
    en: "Choice A correctly joins two independent clauses using a comma accompanied by the coordinating conjunction 'and' (FANBOYS comma rule).",
    traps: {
      "B": "MISSING SEMICOLON — 'However' is a conjunctive adverb that requires a semicolon ('; however,') to link clauses.",
      "C": "COMMA SPLICE — 'Therefore' cannot link two independent clauses with only a preceding comma.",
      "D": "CHANGES MEANING — Subordinating with 'because' reverses the causal relationship."
    }
  },
  "4A-Q2": {
    en: "Choice B correctly uses the subordinating conjunction 'Although' to introduce a dependent concession clause followed by the main independent clause.",
    traps: {
      "A": "WRONG GRAMMAR — 'Despite' is a preposition requiring a noun phrase, not a full subject-verb clause.",
      "C": "WRONG LOGIC — 'Because' implies jury deliberation lasted three days because the evidence was compelling, contradicting the contrast.",
      "D": "WRONG LOGIC — 'Since' signals causal reasoning, which is inconsistent with the concessive context."
    }
  },
  "4A-Q3": {
    en: "Choice B correctly uses an em dash to introduce an appositive relative clause ('—all of which constituted') modifying the preceding artifacts without creating a comma splice.",
    traps: {
      "A": "COMMA SPLICE — Links two independent clauses with only a comma.",
      "C": "COMMA SPLICE — 'they constituted' initiates a new independent clause without a coordinating conjunction.",
      "D": "INCORRECT STRUCTURE — A semicolon cannot be followed by a participial phrase fragment."
    }
  },
  "4A-Q4": {
    en: "Choice B correctly links two independent clauses with a semicolon followed by the transitional adverb 'consequently' and a comma ('; consequently,').",
    traps: {
      "A": "COMMA SPLICE — A lone comma cannot separate two independent clauses.",
      "C": "LOGIC INVERSION — Placing 'because' before the second clause reverses the causal direction.",
      "D": "CONTRADICTION — 'Despite this' introduces an illogical contrast between scholarly publishing and authority."
    }
  },
  "4A-Q5": {
    en: "Choice A provides the correct past participial modifier ('Devastated by two years of drought'), which logically modifies the immediate subject 'the region's agricultural output.'",
    traps: {
      "B": "DANGLING MODIFIER — 'Having devastated' is active voice, illogically implying that agricultural output devastated the drought.",
      "C": "WRONG FORM — 'Devastation' creates an ungrammatical nominal fragment.",
      "D": "WRONG MEANING — An infinitive phrase ('To devastate') illogically indicates deliberate intent or purpose."
    }
  },

  // 4B
  "4B-Q1": {
    en: "Choice C maintains singular subject-verb agreement: the subject is 'The committee' (singular), which governs the singular verb 'is' regardless of the intervening prepositional phrase 'along with several independent advisors.'",
    traps: {
      "A": "AGREEMENT ERROR — 'are' is plural, mistakenly agreeing with the intervening noun 'advisors.'",
      "B": "TENSE + AGREEMENT — 'were' is both plural and past tense, conflicting with 'before its implementation.'",
      "D": "TENSE ERROR — 'have been' is plural and present perfect."
    }
  },
  "4B-Q2": {
    en: "Choice C preserves grammatical parallelism in the past-tense coordinate series: 'conducted surveys, analyzed data, and presented their findings.'",
    traps: {
      "A": "NOT PARALLEL — 'presenting' is a present participle, violating the past-tense verbal series.",
      "B": "NOT PARALLEL — 'to present' is an infinitive, breaking series uniformity.",
      "D": "TENSE MISMATCH — 'have presented' disrupts the simple past aspect of 'conducted' and 'analyzed.'"
    }
  },
  "4B-Q3": {
    en: "Choice C applies the rule that subjects preceded by 'Every' ('Every student and every teacher') are grammatically singular and require the singular verb 'is.'",
    traps: {
      "A": "AGREEMENT TRAP — Treats 'student and teacher' as a compound plural subject.",
      "B": "TENSE + AGREEMENT — 'were' is plural and past tense, clashing with the present requirement 'before the semester begins.'",
      "D": "TENSE ERROR — 'have been' is plural and present perfect."
    }
  },
  "4B-Q4": {
    en: "Choice B maintains tense consistency: the simple past passive 'when her debut was released' requires the coordinating simple past verb 'was' for the singular subject 'The novelist.'",
    traps: {
      "A": "TENSE ERROR — 'is' is present tense, clashing with the historical past event 'was released.'",
      "C": "AGREEMENT ERROR — 'were' is plural, conflicting with the singular subject 'The novelist.'",
      "D": "TENSE ERROR — 'has been' is present perfect, inconsistent with the completed past event."
    }
  },
  "4B-Q5": {
    en: "Choice B preserves subjunctive and parallel structure: verbs governed by 'recommend that athletes [base verb]' must maintain bare infinitive form: 'consume... eat... and avoid.'",
    traps: {
      "A": "NOT PARALLEL — 'eating' is a gerund-participle, clashing with 'consume' and 'avoid.'",
      "C": "NOT PARALLEL — 'to eat' introduces an infinitive 'to,' breaking coordinate symmetry.",
      "D": "NOT PARALLEL — 'having eaten' is a perfect participle, disrupting both aspect and parallelism."
    }
  }
};

// Update questions.json
for (const [lessonId, qList] of Object.entries(questions)) {
  for (const q of qList) {
    if (enExplanations[q.id]) {
      q.explanationEN = enExplanations[q.id].en;
      q.trapExplanationEN = enExplanations[q.id].traps;
    } else {
      // Fallback
      q.explanationEN = q.explanation;
      q.trapExplanationEN = q.trapExplanation;
    }
  }
}

fs.writeFileSync(qPath, JSON.stringify(questions, null, 2), 'utf8');
console.log('✅ questions.json updated with English explanations!');
