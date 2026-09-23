import React, { useState } from 'react';
import { Candidate, JobOpening, PipelineStage } from '../types';
import { X, UserPlus, FileText } from 'lucide-react';

interface NewCandidateModalProps {
  jobs: JobOpening[];
  onClose: () => void;
  onSaveCandidate: (candidate: Candidate) => void;
}

export const NewCandidateModal: React.FC<NewCandidateModalProps> = ({
  jobs,
  onClose,
  onSaveCandidate
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Independence Layout, Enugu');
  const [currentRole, setCurrentRole] = useState('Software Engineer');
  const [currentCompany, setCurrentCompany] = useState('CoalCity Softworks');
  const [yearsExperience, setYearsExperience] = useState(4);
  const [appliedJobId, setAppliedJobId] = useState(jobs[0]?.id || '');
  const [initialStage, setInitialStage] = useState<PipelineStage>('screening');
  const [skillsText, setSkillsText] = useState('TypeScript, React, Node.js, PostgreSQL, Tailwind CSS');
  const [summary, setSummary] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [initialNote, setInitialNote] = useState('Sourced via Enugu Tech Hub network.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    const parsedSkills = skillsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const newCandidate: Candidate = {
      id: `cand-${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || '+234 803 000 0000',
      location: location.trim() || 'Enugu, Nigeria',
      currentRole: currentRole.trim(),
      currentCompany: currentCompany.trim(),
      yearsExperience: Number(yearsExperience) || 2,
      appliedJobId: appliedJobId,
      appliedDate: new Date().toISOString().split('T')[0],
      stage: initialStage,
      rating: 4,
      status: 'active',
      summary: summary.trim() || `${fullName} has ${yearsExperience} years of experience in ${currentRole}. Based in ${location}.`,
      resumeFileName: 'candidate_resume.pdf',
      portfolioUrl: portfolioUrl.trim() || undefined,
      linkedinUrl: linkedinUrl.trim() || undefined,
      skills: parsedSkills.length > 0 ? parsedSkills : ['Problem Solving', 'Team Collaboration'],
      workHistory: [
        {
          role: currentRole.trim(),
          company: currentCompany.trim(),
          duration: '2023 - Present',
          description: 'Delivering feature enhancements and participating in architectural planning.'
        }
      ],
      education: [
        {
          degree: 'B.Sc. in Computer Science',
          institution: 'University of Nigeria, Nsukka (UNN)',
          year: '2021'
        }
      ],
      notes: initialNote.trim() ? [
        {
          id: `note-${Date.now()}`,
          author: 'Nnamdi Eze (Recruiter, Enugu Hub)',
          text: initialNote.trim(),
          createdAt: new Date().toISOString().split('T')[0]
        }
      ] : [],
      evaluations: [],
      interviews: []
    };

    onSaveCandidate(newCandidate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Add Candidate Manually
              </h2>
              <p className="text-xs text-slate-500">Add an externally sourced candidate or referral into the pipeline.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Marcus Aurelius"
                required
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="marcus@example.com"
                required
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Assign to Job Requisition *
              </label>
              <select
                value={appliedJobId}
                onChange={(e) => setAppliedJobId(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>
                    {job.title} ({job.department})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Initial Pipeline Stage
              </label>
              <select
                value={initialStage}
                onChange={(e) => setInitialStage(e.target.value as PipelineStage)}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                <option value="applied">Applied (Inbox)</option>
                <option value="screening">Screening</option>
                <option value="technical">Technical Round</option>
                <option value="interview">Final Interview</option>
                <option value="offer">Offer</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Current Role
              </label>
              <input
                type="text"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Current Company
              </label>
              <input
                type="text"
                value={currentCompany}
                onChange={(e) => setCurrentCompany(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Years Experience
              </label>
              <input
                type="number"
                min={0}
                max={35}
                value={yearsExperience}
                onChange={(e) => setYearsExperience(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Portfolio / GitHub
              </label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
              Skills & Tags (comma separated)
            </label>
            <input
              type="text"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
              Summary / Profile Bio
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Candidate background, notable achievements..."
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
              Initial Recruiter Note
            </label>
            <input
              type="text"
              value={initialNote}
              onChange={(e) => setInitialNote(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center space-x-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add to Pipeline</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
