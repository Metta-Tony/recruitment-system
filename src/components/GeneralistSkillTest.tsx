import React, { useEffect, useState } from 'react';
import { Candidate } from '../types';
import { CheckCircle2, ClipboardCheck, RotateCcw } from 'lucide-react';

interface GeneralistSkillTestProps {
  candidates: Candidate[];
}

interface TestQuestion {
  id: number;
  prompt: string;
  kind: 'choice' | 'text' | 'textarea';
  options?: string[];
  correctAnswer?: string;
  sourceText?: string;
  placeholder?: string;
  rubric?: string;
}

interface TestRecord {
  responses: Record<number, string>;
  subjectiveScores: Record<number, boolean>;
  submittedAt: string | null;
}

const exactTypingAnswer = 'Accuracy and attention to detail are important in every computer-based task.';

const questions: TestQuestion[] = [
  { id: 1, prompt: 'Which keyboard shortcut copies selected text?', kind: 'choice', options: ['Ctrl + X', 'Ctrl + C', 'Ctrl + V', 'Ctrl + Z'], correctAnswer: 'Ctrl + C' },
  { id: 2, prompt: 'Which application is best used for creating and editing documents?', kind: 'choice', options: ['Microsoft Excel', 'Microsoft Word', 'Google Maps', 'Paint'], correctAnswer: 'Microsoft Word' },
  { id: 3, prompt: 'Which application is commonly used to organize data into rows and columns?', kind: 'choice', options: ['PowerPoint', 'Excel', 'Outlook', 'Chrome'], correctAnswer: 'Excel' },
  { id: 4, prompt: 'What is the purpose of a web browser?', kind: 'choice', options: ['Create spreadsheets.', 'Access websites on the internet.', 'Send text messages.', 'Install printers.'], correctAnswer: 'Access websites on the internet.' },
  { id: 5, prompt: 'Which shortcut saves your current document?', kind: 'choice', options: ['Ctrl + P', 'Ctrl + S', 'Ctrl + F', 'Ctrl + N'], correctAnswer: 'Ctrl + S' },
  { id: 6, prompt: 'What is a PDF file mainly used for?', kind: 'text', placeholder: 'Enter your answer', rubric: 'Award a point for noting that PDFs preserve a document’s layout and are easy to share or view.' },
  { id: 7, prompt: 'Which of the following is a professional email address?', kind: 'choice', options: ['coolguy123@gmail.com', 'sarah.johnson@company.com', 'footballking@yahoo.com', 'princesslove@hotmail.com'], correctAnswer: 'sarah.johnson@company.com' },
  { id: 8, prompt: 'What should you include in the subject line of a work email?', kind: 'text', placeholder: 'Enter your answer', rubric: 'Award a point for a concise subject that clearly describes the email’s purpose.' },
  { id: 9, prompt: 'A client says, “I haven’t received my report.” What is the most appropriate first response?', kind: 'textarea', placeholder: 'Write a brief, professional response', rubric: 'Award a point for acknowledging the concern politely and offering to check or resend the report.' },
  { id: 10, prompt: 'Name one advantage of using Google Drive or OneDrive for work files.', kind: 'text', placeholder: 'Enter one advantage', rubric: 'Award a point for a valid advantage such as cloud access, sharing, backup, or collaboration.' },
  { id: 11, prompt: 'Type the following sentence exactly as written:', kind: 'text', sourceText: exactTypingAnswer, placeholder: 'Type the sentence exactly as shown' },
  { id: 12, prompt: 'Rewrite this list in a clean numbered format:', kind: 'textarea', sourceText: 'Writing\n\nsend invoice\nupdate client list\nreply to emails\nschedule meeting', placeholder: 'Enter the numbered list', rubric: 'Award a point for a clear numbered list containing all four tasks in the given order.' },
  { id: 13, prompt: 'Organize the information below into a table with Name, Email, and Phone.', kind: 'textarea', sourceText: 'Jane Adams – jane@email.com – 08030001111\nPeter James – peter@email.com – 08145552222', placeholder: 'Enter the table with Name, Email, and Phone columns', rubric: 'Award a point for placing both people’s names, emails, and phone numbers under the correct headings.' },
  { id: 14, prompt: 'Which file type is most likely a spreadsheet?', kind: 'choice', options: ['.docx', '.xlsx', '.jpg', '.pdf'], correctAnswer: '.xlsx' },
  { id: 15, prompt: 'Where should invoice_april.pdf be stored?', kind: 'choice', options: ['Images', 'Finance', 'Music', 'Videos'], correctAnswer: 'Finance' },
  { id: 16, prompt: 'Write a short professional email informing a client that their task will be completed tomorrow morning.', kind: 'textarea', placeholder: 'Write your email', rubric: 'Award a point for a professional greeting, clear completion timing, and an appropriate sign-off.' },
  { id: 17, prompt: 'A customer writes: “My order confirmation hasn’t arrived.” Write a polite response (2–4 sentences).', kind: 'textarea', placeholder: 'Write a 2–4 sentence response', rubric: 'Award a point for a polite 2–4 sentence response that acknowledges the issue and offers to check or resend confirmation.' },
  { id: 18, prompt: 'You receive five tasks due today. What should you do first?', kind: 'choice', options: ['Complete the easiest task.', 'Ignore the deadlines.', 'Prioritize tasks based on urgency and deadline.', 'Wait until someone reminds you.'], correctAnswer: 'Prioritize tasks based on urgency and deadline.' },
  { id: 19, prompt: 'What would you do if you accidentally entered incorrect information into a spreadsheet?', kind: 'textarea', placeholder: 'Describe what you would do', rubric: 'Award a point for correcting the entry promptly, checking related data, and notifying someone if needed.' },
  { id: 20, prompt: 'Why is attention to detail important in data entry and administrative work?', kind: 'textarea', placeholder: 'Enter your answer', rubric: 'Award a point for explaining that accuracy prevents errors and supports reliable decisions or work.' }
];

const emptyRecord = (): TestRecord => ({ responses: {}, subjectiveScores: {}, submittedAt: null });
const storageKey = (candidateId: string) => `generalist-skill-test-${candidateId}`;

const loadRecord = (candidateId: string): TestRecord => {
  try {
    const saved = localStorage.getItem(storageKey(candidateId));
    return saved ? { ...emptyRecord(), ...JSON.parse(saved) } : emptyRecord();
  } catch {
    return emptyRecord();
  }
};

export const GeneralistSkillTest: React.FC<GeneralistSkillTestProps> = ({ candidates }) => {
  const [candidateId, setCandidateId] = useState(candidates[0]?.id ?? '');
  const [record, setRecord] = useState<TestRecord>(() => candidates[0] ? loadRecord(candidates[0].id) : emptyRecord());
  const candidate = candidates.find(item => item.id === candidateId);
  const submitted = record.submittedAt !== null;
  const answerableQuestions = questions.filter(question => question.kind === 'choice' || question.id === 11);
  const writtenQuestions = questions.filter(question => !answerableQuestions.includes(question));
  const automaticScore = submitted ? answerableQuestions.filter(question => {
    const response = record.responses[question.id]?.trim();
    return question.id === 11 ? response === exactTypingAnswer : response === question.correctAnswer;
  }).length : 0;
  const reviewedCount = Object.keys(record.subjectiveScores).length;
  const score = automaticScore + Object.values(record.subjectiveScores).filter(Boolean).length;
  const isFullyReviewed = submitted && reviewedCount === writtenQuestions.length;
  const answeredCount = questions.filter(question => record.responses[question.id]?.trim()).length;

  useEffect(() => {
    if (candidateId && (submitted || answeredCount > 0)) {
      localStorage.setItem(storageKey(candidateId), JSON.stringify(record));
    }
  }, [candidateId, record, submitted, answeredCount]);

  const updateResponse = (questionId: number, value: string) => {
    setRecord(current => ({ ...current, responses: { ...current.responses, [questionId]: value } }));
  };

  const changeCandidate = (nextCandidateId: string) => {
    setCandidateId(nextCandidateId);
    setRecord(nextCandidateId ? loadRecord(nextCandidateId) : emptyRecord());
  };

  const submitTest = (event: React.FormEvent) => {
    event.preventDefault();
    if (answeredCount !== questions.length || submitted) return;
    setRecord(current => ({ ...current, submittedAt: new Date().toISOString() }));
  };

  const startRetake = () => {
    if (candidateId) localStorage.removeItem(storageKey(candidateId));
    setRecord(emptyRecord());
  };

  if (candidates.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center">
        <ClipboardCheck className="mx-auto mb-3 h-8 w-8 text-slate-400" />
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Add a candidate to begin</h2>
        <p className="mt-1 text-xs text-slate-500">The skill test is attached to a candidate in the recruitment pipeline.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Generalist Computer-Based Tasker Basic Skill Test</h2>
          <p className="mt-1 text-xs text-slate-500">20 questions · 30–40 minutes · 1 point per question · pass mark 13/20 (65%)</p>
        </div>
        <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
          Candidate
          <select value={candidateId} onChange={event => changeCandidate(event.target.value)} className="mt-1 block w-full min-w-56 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
            {candidates.map(item => <option key={item.id} value={item.id}>{item.fullName} · {item.currentRole || 'Applicant'}</option>)}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-start gap-3 rounded-lg border border-sky-200 bg-sky-50 p-4 text-xs text-sky-900 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-200">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
        <p>Passing qualifies a candidate for job consideration. The stated opportunity is up to 90%; this is not a guarantee of employment. Written answers are scored by a recruiter before a final result is shown.</p>
      </div>

      {submitted && (
        <div className={`rounded-xl border p-4 ${isFullyReviewed ? score >= 13 ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30' : 'border-rose-300 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30' : 'border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30'}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {isFullyReviewed ? score >= 13 ? 'Qualified to proceed' : 'Below the passing threshold' : 'Recruiter review required'}
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                {isFullyReviewed ? `Final score: ${score}/20 (${Math.round(score / 20 * 100)}%)` : `Current score: ${score}/20 · ${reviewedCount} of ${writtenQuestions.length} written answers reviewed`}
              </p>
            </div>
            <button type="button" onClick={startRetake} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
              <RotateCcw className="h-3.5 w-3.5" /> Retake test
            </button>
          </div>
        </div>
      )}

      <form onSubmit={submitTest} className="space-y-5">
        {(['Computer Basics', 'Internet & Email', 'Typing, Formatting & Data Entry', 'Communication & Problem Solving'] as const).map((section, sectionIndex) => {
          const sectionQuestions = questions.slice(sectionIndex * 5, sectionIndex * 5 + 5);
          return (
            <section key={section} className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-800 dark:bg-slate-800/60">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Section {String.fromCharCode(65 + sectionIndex)} · {section}</h3>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {sectionQuestions.map(question => (
                  <div key={question.id} className="space-y-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <label htmlFor={`question-${question.id}`} className="text-xs font-semibold leading-relaxed text-slate-800 dark:text-slate-200">
                        <span className="mr-2 text-slate-400">{question.id}.</span>{question.prompt}
                      </label>
                      {submitted && !answerableQuestions.includes(question) && (
                        <span className={`shrink-0 text-[10px] font-bold ${question.id in record.subjectiveScores ? record.subjectiveScores[question.id] ? 'text-emerald-600' : 'text-rose-600' : 'text-amber-600'}`}>
                          {question.id in record.subjectiveScores ? record.subjectiveScores[question.id] ? '1 point' : '0 points' : 'Pending review'}
                        </span>
                      )}
                    </div>
                    {question.sourceText && (
                      <p className="whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
                        {question.sourceText}
                      </p>
                    )}
                    {question.kind === 'choice' ? (
                      <div className="grid gap-2 sm:grid-cols-2">
                        {question.options?.map((option, index) => (
                          <label key={option} className={`flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-2.5 text-xs ${record.responses[question.id] === option ? 'border-indigo-400 bg-indigo-50 text-indigo-900 dark:border-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-100' : 'border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300'} ${submitted ? 'cursor-default' : ''}`}>
                            <input type="radio" name={`question-${question.id}`} value={option} checked={record.responses[question.id] === option} onChange={event => updateResponse(question.id, event.target.value)} disabled={submitted} required className="mt-0.5 accent-indigo-600" />
                            <span>{String.fromCharCode(65 + index)}. {option}</span>
                          </label>
                        ))}
                      </div>
                    ) : question.kind === 'textarea' ? (
                      <textarea id={`question-${question.id}`} value={record.responses[question.id] ?? ''} onChange={event => updateResponse(question.id, event.target.value)} placeholder={question.placeholder} rows={question.id === 12 || question.id === 13 ? 4 : 3} disabled={submitted} required className="w-full resize-y rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-80 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                    ) : (
                      <input id={`question-${question.id}`} type="text" value={record.responses[question.id] ?? ''} onChange={event => updateResponse(question.id, event.target.value)} placeholder={question.placeholder} disabled={submitted} required className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-80 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                    )}
                    {submitted && question.rubric && (
                      <div className="rounded-lg bg-slate-50 p-3 text-[11px] text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">
                        <p><strong>Scoring guide:</strong> {question.rubric}</p>
                        <p className="mt-2"><strong>Candidate response:</strong> {record.responses[question.id]}</p>
                        <div className="mt-2 flex gap-2">
                          {[true, false].map(earnedPoint => (
                            <button key={String(earnedPoint)} type="button" onClick={() => setRecord(current => ({ ...current, subjectiveScores: { ...current.subjectiveScores, [question.id]: earnedPoint } }))} className={`rounded-md border px-2.5 py-1.5 font-semibold ${record.subjectiveScores[question.id] === earnedPoint ? earnedPoint ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300' : 'border-slate-300 text-slate-600 hover:bg-white dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700'}`}>
                              {earnedPoint ? 'Award 1 point' : 'Award 0 points'}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {!submitted && (
          <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500">{answeredCount} of 20 answered. Written responses will be reviewed after submission.</p>
            <button type="submit" disabled={answeredCount !== 20} className="rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50">
              Submit test for review
            </button>
          </div>
        )}
      </form>
    </div>
  );
};