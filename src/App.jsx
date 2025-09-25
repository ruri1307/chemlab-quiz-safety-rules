import React, { useState, useMemo } from "react";

// Interactive 100-question quiz component (enhanced)
// Features added: pagination (10 per page), dark mode toggle, separate answer-key reveal after submit,
// and print-friendly styles (use browser Print — answers will be included in the printout if revealed).

const QUESTIONS = [
  { q: "Why should you read and understand the assigned experiment before coming to the lab?", choices: ["To finish faster","To avoid accidents and be aware of precautions","To impress the instructor","To get extra credit"], answer: 1 },
  { q: "If you don’t understand a lab instruction, you should:", choices: ["Ask a classmate","Skip that step","Ask the instructor","Guess"], answer: 2 },
  { q: "Whose safety are you responsible for during lab work?", choices: ["Only yours","Only your partner’s","Everyone’s including yours","Instructor’s only"], answer: 2 },
  { q: "Before a fire drill, you must:", choices: ["Leave all containers open","Turn off gas and electrical equipment","Continue the experiment","Take your experiment outside"], answer: 1 },
  { q: "If pregnant or with a medical condition, you should:", choices: ["Avoid telling anyone","Check with your physician first","Wear two goggles","Skip only chemical experiments"], answer: 1 },
  { q: "Accidents in a chemistry lab usually result from:", choices: ["Faulty equipment","Improper judgment","Bad weather","Poor lighting"], answer: 1 },
  { q: "The lab is considered:", choices: ["A place for social interaction","A community where everyone must watch for each other’s safety","A private work area","A testing ground for new procedures"], answer: 1 },
  { q: "If unsure about which chemical to use:", choices: ["Use any available","Ask your instructor","Ask your neighbor","Check online"], answer: 1 },
  { q: "In case of emergency during lab:", choices: ["Continue experiment","Evacuate without shutting equipment","Close containers and shut off equipment","Save chemicals first"], answer: 2 },
  { q: "To keep track of unclear instructions you should:", choices: ["Make a note to discuss at the start of lab","Ignore it","Ask friends later","Memorize silently"], answer: 0 },

  { q: "Students may be in the lab only when:", choices: ["Instructor is present","Classmates are present","It is convenient","After hours"], answer: 0 },
  { q: "Performing an unauthorized experiment is:", choices: ["Allowed if safe","Allowed if interesting","Not allowed","Encouraged"], answer: 2 },
  { q: "Altering a procedure is:", choices: ["Allowed with partner’s approval","Allowed with instructor’s approval","Never allowed","Required"], answer: 2 },
  { q: "Eating and drinking in the lab:", choices: ["Permitted only for water","Not allowed at all","Allowed if careful","Allowed during breaks"], answer: 1 },
  { q: "Chewing gum in the lab is dangerous because:", choices: ["It’s distracting","It can absorb chemicals","It smells","It sticks to equipment"], answer: 1 },
  { q: "Books and bags should be stored:", choices: ["On the floor near your feet","On the lab bench","In a locker or designated area","On the fume hood"], answer: 2 },
  { q: "Experiments must be:", choices: ["Left unattended while heating","Monitored at all times","Done only by instructor","Done in pairs"], answer: 1 },
  { q: "Noise and disruptive behavior in the lab:", choices: ["Allowed quietly","Strictly prohibited","Encouraged for fun","Required"], answer: 1 },
  { q: "Running in the lab:", choices: ["Permitted during emergency","Never permitted","Allowed if late","Allowed between benches"], answer: 1 },
  { q: "Social conversations and listening to music:", choices: ["Allowed with headphones","Strictly prohibited","Encouraged during breaks","Only for senior students"], answer: 1 },
  { q: "All accidents or injuries must be reported:", choices: ["Immediately to instructor","Later in writing","Only if severe","Only to classmates"], answer: 0 },
  { q: "If you feel ill in the lab you should:", choices: ["Leave without telling","Inform the instructor","Wait until end of session","Take medicine quietly"], answer: 1 },
  { q: "If you accidentally mix wrong chemicals you should:", choices: ["Discard silently","Tell the instructor immediately","Hide it","Flush it in sink"], answer: 1 },
  { q: "Before leaving the lab you should:", choices: ["Clean your work area","Wash your hands","Check equipment","All of the above"], answer: 3 },
  { q: "Skin contact with lab benches requires:", choices: ["Immediate handwashing","Ignoring if minor","Using gloves later","Wiping with dry towel"], answer: 0 },

  { q: "Safety goggles must be worn:", choices: ["Only when handling acids","At all times","Only during mixing","Only when instructor says"], answer: 1 },
  { q: "Contact lenses:", choices: ["Are permitted","May trap vapors and are not allowed","Must be colored","Are safe under goggles"], answer: 1 },
  { q: "Clothing should:", choices: ["Be synthetic and stylish","Cover torso and legs at least to knees","Include sandals","Be loose"], answer: 1 },
  { q: "Closed-toe shoes are:", choices: ["Optional","Required","Forbidden","Only for rainy days"], answer: 1 },
  { q: "Lab gowns or coats:", choices: ["Optional but recommended","Mandatory for experiments","Only for instructors","For visitors only"], answer: 1 },
  { q: "Loose clothing and long hair:", choices: ["Should be secured","Can be left as is","Adds style","Ignored"], answer: 0 },
  { q: "Jewelry that dangles:", choices: ["Can become a hazard","Is required","Is recommended","Attracts chemicals"], answer: 0 },
  { q: "Clothing material should ideally be:", choices: ["Synthetic","Cotton or natural fibers","Plastic","Rubber"], answer: 1 },
  { q: "If you come dressed inappropriately:", choices: ["You’ll be asked to leave","Instructor provides clothes","Allowed once","Allowed if careful"], answer: 0 },
  { q: "Safety goggles protect:", choices: ["Only from UV","From chemical splashes","From noise","From heat only"], answer: 1 },

  { q: "Treat all chemicals as though:", choices: ["They are harmless","They are hazardous","They are labeled incorrectly","They are expensive only"], answer: 1 },
  { q: "Smelling a chemical should be done by:", choices: ["Directly inhaling","Fanning air toward your nose","Sniffing the container","Using a straw"], answer: 1 },
  { q: "Touching your face in the lab requires:", choices: ["No precaution","First washing your hands","Wearing gloves","Using tissue"], answer: 1 },
  { q: "Chemical containers should be held:", choices: ["Close to your body","Away from your body","Over your head","On the floor"], answer: 1 },
  { q: "Before using a chemical always:", choices: ["Check label carefully","Guess based on color","Smell it","Ask a friend"], answer: 0 },
  { q: "Spatulas should:", choices: ["Be put into bottles","Never go into reagent bottles","Be used to stir directly in bottle","Be left dirty"], answer: 1 },
  { q: "Unused chemicals should:", choices: ["Be returned to original containers","Be disposed of properly","Be poured in sink","Be saved for later"], answer: 1 },
  { q: "Moving reagent bottles to your bench:", choices: ["Is allowed","Not allowed; bring your container instead","Required","Encouraged"], answer: 1 },
  { q: "Reagent bottles should be held:", choices: ["With palm over the label","With palm at the label","Upside down","By the stopper"], answer: 1 },
  { q: "When diluting concentrated acid you should:", choices: ["Add water to acid","Add acid to water","Mix both quickly","Pour both together"], answer: 1 },
  { q: "Pipetting by mouth:", choices: ["Is never allowed","Allowed for water","Allowed if careful","Instructor only"], answer: 0 },
  { q: "Fume hood sash should be:", choices: ["Up all the way","Down as far as possible","Removed","Ignored"], answer: 1 },
  { q: "Flammable liquids should be kept:", choices: ["Near open flames","Away from heat sources","On bench tops","In plastic cups"], answer: 1 },
  { q: "Chemicals from the lab should:", choices: ["Never be removed without explicit permission","Be taken for home experiments","Be shared","Be stored in backpacks"], answer: 0 },
  { q: "Alcohol used in the lab:", choices: ["Is safe to drink","Is chemically denatured","Has no poison","Is only for cleaning hands"], answer: 1 },
  { q: "Always pour chemicals:", choices: ["Above your head","At eye level","Below eye level","Without checking"], answer: 2 },
  { q: "Label on bottles must be:", choices: ["Ignored","Read twice","Read once","Checked only for color"], answer: 1 },
  { q: "Long-term storage of chemicals should be:", choices: ["In student lockers","As per instructor guidance","In any cabinet","Left on bench"], answer: 1 },
  { q: "Transfer of solids should be done with:", choices: ["Dirty spatula","Clean, dry spatula","Hands","Pipette"], answer: 1 },
  { q: "Replacing stoppers after use prevents:", choices: ["Spills","Evaporation and contamination","Both a and b","None"], answer: 2 },
  { q: "Concentrated bases should be handled:", choices: ["Like water","With the same care as concentrated acids","With bare hands","Without goggles"], answer: 1 },
  { q: "Spilled acid on skin should be rinsed with:", choices: ["Large amounts of water","Alcohol","Paper towels","Acetone"], answer: 0 },
  { q: "Organic solvents should be used:", choices: ["In a fume hood","On open bench","Near flames","Without ventilation"], answer: 0 },
  { q: "Heating flammable liquids should be done:", choices: ["With open flame","Using a water bath","In glass beaker directly on flame","With metal spoon"], answer: 1 },
  { q: "When carrying chemicals in glassware:", choices: ["Hold close to your face","Use a tray or secondary container","Run to save time","Carry several at once"], answer: 1 },

  { q: "Waste chemicals should be disposed:", choices: ["Down the sink automatically","As instructed by your instructor","In the trash","Mixed together"], answer: 1 },
  { q: "Broken glass should be placed:", choices: ["In regular trash","In designated glass container","On the bench","On the floor"], answer: 1 },
  { q: "Labels on waste containers must:", choices: ["Be clear and correct","Be ignored","Be changed randomly","Not be used"], answer: 0 },
  { q: "Neutralizing acidic waste should be done:", choices: ["Without instructor’s approval","Only as instructed","Always automatically","Using random bases"], answer: 1 },
  { q: "Empty chemical containers should be:", choices: ["Rinsed and placed in designated area","Thrown in trash","Left on bench","Taken home"], answer: 0 },
  { q: "Waste segregation means:", choices: ["Mixing all waste","Separating types of waste","Keeping waste on bench","None"], answer: 1 },
  { q: "Flammable waste should be stored:", choices: ["Near heat","In proper waste cans with lids","On open shelves","In student bags"], answer: 1 },
  { q: "Broken thermometers with mercury:", choices: ["Should be swept by hand","Report immediately","Ignored","Mopped"], answer: 1 },
  { q: "Unused reagents must:", choices: ["Go back to stock bottle","Be disposed as waste","Be given to friends","Left uncapped"], answer: 1 },
  { q: "Waste bottles should never be:", choices: ["Capped","Unlabeled or overfilled","Stored in cabinets","Used"], answer: 1 },

  { q: "All spills must be:", choices: ["Reported immediately","Ignored if small","Cleaned without telling","Left to evaporate"], answer: 0 },
  { q: "Solid chemical spills should be:", choices: ["Swept with brush and dustpan","Brushed by hand","Mopped","Ignored"], answer: 0 },
  { q: "Liquid chemical spills should be contained with:", choices: ["Spill kit materials","Paper only","Sand from playground","Mop"], answer: 0 },
  { q: "If chemical enters eyes:", choices: ["Rinse immediately at eyewash","Wait for instructor","Rub eyes","Use tissue"], answer: 0 },
  { q: "Spilled bases on skin:", choices: ["Rinse with large amounts of water","Wipe with paper towel","Neutralize with acid","Ignore"], answer: 0 },
  { q: "Small mercury spills should:", choices: ["Be vacuumed","Be reported and cleaned by trained personnel","Be swept","Be mopped"], answer: 1 },
  { q: "Large chemical spills:", choices: ["Evacuate and call instructor","Ignore","Cover with cloth","Clean alone"], answer: 0 },
  { q: "Glass fragments in a spill:", choices: ["Pick with hands","Use brush and dustpan","Kick aside","Leave"], answer: 1 },
  { q: "Spill kits are located:", choices: ["In designated area of the lab","With each student","At home","In lockers"], answer: 0 },
  { q: "After cleaning a spill:", choices: ["Wash hands thoroughly","Continue without cleaning","Leave area wet","None"], answer: 0 },

  { q: "Before using glassware check for:", choices: ["Cracks and cleanliness","Color","Labels","Owner"], answer: 0 },
  { q: "Broken glassware should be:", choices: ["Used carefully","Disposed in proper container","Left on bench","Given to partner"], answer: 1 },
  { q: "Lubricate glass tubing before inserting into:", choices: ["Rubber stoppers","Glass beakers","Hands","Test tubes"], answer: 0 },
  { q: "When inserting glass tubing:", choices: ["Hold close to end and twist gently","Force directly","Use dry hands","Push fast"], answer: 0 },
  { q: "When heating glassware check for:", choices: ["Labels","Cracks","None","Owner"], answer: 1 },

  { q: "Stoppers should be:", choices: ["Left uncapped","Replaced immediately after use","Placed on dirty bench","Shared between bottles"], answer: 1 },
  { q: "Rubber stoppers should be:", choices: ["Dry","Lubricated when inserting glass tubing","Broken","Ignored"], answer: 1 },
  { q: "Stoppers contaminated with chemicals:", choices: ["Should be wiped before reuse","Can be used directly","Stored in pocket","Left on bench"], answer: 0 },
  { q: "Using correct size stopper prevents:", choices: ["Spillage","Evaporation","Both a and b","None"], answer: 2 },
  { q: "Stoppers on reagent bottles should:", choices: ["Never be switched","Be interchangeable","Be left open","Used for stirring"], answer: 0 },

  { q: "Hot glassware looks:", choices: ["Different from cold","The same as cold","Red","Dark"], answer: 1 },
  { q: "When heating test tubes point the mouth:", choices: ["Toward yourself","Away from yourself and others","Up","Down"], answer: 1 },
  { q: "Use tongs or heat-resistant gloves:", choices: ["When handling hot equipment","Only for acids","Only when told","Never"], answer: 0 },
  { q: "Before heating a container check:", choices: ["For cracks","For labels","For water","For color"], answer: 0 },
  { q: "Glass tubing should be cooled:", choices: ["In water","Slowly on bench","With bare hands","In air quickly"], answer: 1 },
  { q: "Hot plates should be turned off:", choices: ["After use","At end of week","Only by instructor","Never"], answer: 0 },
  { q: "When heating liquids:", choices: ["Use boiling chips if required","Fill to brim","Cover tightly","Use open flame always"], answer: 0 },
  { q: "Steam burns can occur from:", choices: ["Hot water baths","Cold equipment","Dry glassware","Gloves"], answer: 0 },
  { q: "Heated glassware should be placed:", choices: ["Directly on lab bench","On heat-resistant pad","On paper","In locker"], answer: 1 },
  { q: "Before storing equipment after heating you should:", choices: ["Let it cool down completely","Place it immediately in a cabinet","Rinse with cold water while hot","Hand it to someone else right away"], answer: 0 },
];

const PER_PAGE = 10;

export default function ChemLabQuiz() {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [dark, setDark] = useState(false);

  const totalPages = Math.ceil(QUESTIONS.length / PER_PAGE);

  const pageQuestions = useMemo(() => {
    const start = page * PER_PAGE;
    return QUESTIONS.slice(start, start + PER_PAGE).map((q, i) => ({ ...q, index: start + i }));
  }, [page]);

  const answeredCount = answers.filter((a) => a !== null).length;
  const score = QUESTIONS.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0);

  const select = (qIndex, choiceIndex) => {
    if (showResults) return;
    const copy = [...answers];
    copy[qIndex] = choiceIndex;
    setAnswers(copy);
  };

  const submit = () => setShowResults(true);
  const reset = () => {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setShowResults(false);
    setShowKey(false);
    setPage(0);
  };
  const toggleKey = () => setShowKey((s) => !s);
  const toggleDark = () => setDark((d) => !d);

  return (
    <div className={"min-h-screen p-6 " + (dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900')}>
      <div className="max-w-5xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Chem Lab Safety — 100 MCQ Quiz</h1>
            <p className="text-sm opacity-80">Paginated (10 per page). Submit to reveal results. Toggle answer key separately after submitting.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleDark} className="px-3 py-1 border rounded">{dark ? 'Light' : 'Dark'}</button>
            <button onClick={reset} className="px-3 py-1 border rounded">Reset</button>
          </div>
        </header>

        <section className="mb-4 flex items-center justify-between">
          <div>Page {page + 1} / {totalPages}</div>
          <div>Answered: {answeredCount} / {QUESTIONS.length}</div>
        </section>

        <main className={"rounded shadow p-4 " + (dark ? 'bg-gray-800' : 'bg-white')}>
          {pageQuestions.map((q) => (
            <article key={q.index} className="mb-4">
              <div className="mb-2 font-medium">{q.index + 1}. {q.q}</div>

              {/* choices rendered as radio inputs + label for clear selection */}
              <div className="grid gap-2 md:grid-cols-1">
                {q.choices.map((c, ci) => {
                  const selected = answers[q.index] === ci;
                  const correct = showResults && q.answer === ci;
                  const wrong = showResults && selected && q.answer !== ci;

                  return (
                    <label
                      key={ci}
                      htmlFor={`q-${q.index}-c-${ci}`}
                      className={
                        "choice-row flex items-center justify-between p-2 border rounded cursor-pointer " +
                        (selected ? (dark ? 'selected-dark' : 'selected') : '') +
                        (correct ? ' correct' : '') +
                        (wrong ? ' wrong' : '')
                      }
                      onClick={() => select(q.index, ci)}
                    >
                      <div className="flex items-center gap-3">
                        {/* visible radio circle */}
                        <span className={"radio " + (selected ? 'radio-selected' : '')} aria-hidden="true" />
                        <span className="choice-text">{String.fromCharCode(97 + ci)}) {c}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Selected badge appears immediately */}
                        {selected && <span className="badge">Selected</span>}
                        {/* show check/cross only after submit */}
                        {showResults && correct && <span className="result-mark">✓</span>}
                        {showResults && wrong && <span className="result-mark">✕</span>}
                      </div>

                      {/* hidden native input for accessibility */}
                      <input
                        id={`q-${q.index}-c-${ci}`}
                        type="radio"
                        name={`q-${q.index}`}
                        checked={selected}
                        onChange={() => select(q.index, ci)}
                        style={{ display: 'none' }}
                      />
                    </label>
                  );
                })}
              </div>
            </article>
          ))}

          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} className="px-3 py-1 border rounded" disabled={page===0}>Prev</button>
              <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} className="px-3 py-1 border rounded" disabled={page===totalPages-1}>Next</button>
              <div className="ml-3">Jump to:</div>
              <select value={page} onChange={(e) => setPage(Number(e.target.value))} className="border px-2 py-1 rounded">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <option key={i} value={i}>Page {i+1}</option>
                ))}
              </select>
            </div>

            <div>
              {!showResults ? (
                <button onClick={submit} className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
              ) : (
                <>
                  <div className="mb-2">Score: <strong>{score}</strong> / {QUESTIONS.length}</div>
                  <div className="flex gap-2">
                    <button onClick={toggleKey} className="px-3 py-1 border rounded">{showKey ? 'Hide' : 'Show'} Answer Key</button>
                    <button onClick={() => window.print()} className="px-3 py-1 border rounded">Print</button>
                  </div>
                </>
              )}
            </div>
          </div>

          {showResults && showKey && (
            <section className="mt-6 border-t pt-4">
              <h2 className="font-semibold mb-2">Answer Key</h2>
              <ol className="list-decimal ml-5">
                {QUESTIONS.map((q, i) => (
                  <li key={i}>Question {i+1}: {String.fromCharCode(97 + q.answer)})</li>
                ))}
              </ol>
            </section>
          )}
        </main>

        <footer className="mt-4 text-sm opacity-80">Questions derived solely from the supplied Chem Lab safety PDF. Correct answers are revealed only after submitting.</footer>
      </div>

      <style>{`
        /* minimal styles for selection UI */
        .choice-row { transition: background .15s, border-color .15s; }
        .choice-row .radio {
          width: 18px; height: 18px; border-radius: 50%; border: 2px solid #ccc; display: inline-block;
        }
        .choice-row .radio-radio-selected { }
        .choice-row .choice-text { display: inline-block; }
        .choice-row .badge {
          background: #e2e8f0; padding: 2px 8px; border-radius: 12px; font-size: 12px;
        }
        .selected { background: #e6f0ff; border-color: #7fb3ff; }
        .selected-dark { background: #143246; border-color: #1e6fb3; }
        .radio-selected { background: #1f6feb; border-color: #1f6feb; box-shadow: inset 0 0 0 3px rgba(255,255,255,0.15); }
        .correct { background: #1a7f37 !important; color: white; border-color: #1a7f37; }
        .wrong { background: #7f1a1a !important; color: white; border-color: #7f1a1a; }
        .result-mark { font-weight: 700; font-size: 16px; }
      `}</style>
    </div>
  );
}