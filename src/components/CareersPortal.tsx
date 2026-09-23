import React, { useState } from 'react';
import { 
  JobOpening, 
  Candidate 
} from '../types';
import { formatSalaryRange } from '../utils/formatters';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Search, 
  Filter, 
  ArrowRight, 
  Sparkles, 
  UploadCloud, 
  FileText, 
  X,
  Building,
  HeartHandshake,
  Coffee,
  Globe
} from 'lucide-react';

interface CareersPortalProps {
  jobs: JobOpening[];
  onApplyForJob: (candidate: Candidate) => void;
  onBackToATS: () => void;
  highlightedJobId?: string | null;
}

export const CareersPortal: React.FC<CareersPortalProps> = ({
  jobs,
  onApplyForJob,
  onBackToATS,
  highlightedJobId
}) => {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(
    highlightedJobId ? jobs.find(j => j.id === highlightedJobId) || null : null
  );
  const [applyingJob, setApplyingJob] = useState<JobOpening | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [workplaceFilter, setWorkplaceFilter] = useState('all');

  // Application form fields
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formExp, setFormExp] = useState(3);
  const [formPortfolio, setFormPortfolio] = useState('');
  const [formLinkedin, setFormLinkedin] = useState('');
  const [formGithub, setFormGithub] = useState('');
  const [formSkills, setFormSkills] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [resumeFileName, setResumeFileName] = useState('resume_document.pdf');
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  const activeJobs = jobs.filter(j => j.status === 'published');
  const departments = Array.from(new Set(activeJobs.map(j => j.department)));

  const filteredJobs = activeJobs.filter(job => {
    if (departmentFilter !== 'all' && job.department !== departmentFilter) return false;
    if (workplaceFilter !== 'all' && job.workplaceType !== workplaceFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchDept = job.department.toLowerCase().includes(q);
      const matchDesc = job.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDept && !matchDesc) return false;
    }
    return true;
  });

  // Rapid sample filler for applicant testing
  const handleAutofillApplicant = () => {
    setFormName('Chukwudi Nnamani');
    setFormEmail('chukwudi.nnamani@enugutech.ng');
    setFormPhone('+234 803 712 9044');
    setFormLocation('Independence Layout, Enugu');
    setFormRole('Full Stack Software Engineer');
    setFormCompany('Lion Valley Labs, Enugu');
    setFormExp(4);
    setFormPortfolio('https://chukwudinnamani.dev');
    setFormLinkedin('https://linkedin.com/in/chukwudi-nnamani');
    setFormGithub('https://github.com/chukwudi-enugu');
    setFormSkills('TypeScript, React, Node.js, Tailwind CSS, PostgreSQL, Docker');
    setFormSummary('Passionate software engineer resident in Independence Layout, Enugu. Graduate of UNN. Built reliable web applications, low-latency microservices, and responsive web portals with deep focus on accessibility.');
    setResumeFileName('chukwudi_nnamani_cv_enugu.pdf');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob || !formName.trim() || !formEmail.trim()) return;

    const parsedSkills = formSkills
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const newCandidate: Candidate = {
      id: `cand-${Date.now()}`,
      fullName: formName.trim(),
      email: formEmail.trim(),
      phone: formPhone.trim() || '+1 (555) 012-3456',
      location: formLocation.trim() || 'Remote',
      currentRole: formRole.trim() || 'Software Engineer',
      currentCompany: formCompany.trim() || 'Self-Employed / Independent',
      yearsExperience: Number(formExp) || 3,
      appliedJobId: applyingJob.id,
      appliedDate: new Date().toISOString().split('T')[0],
      stage: 'applied',
      rating: 4,
      status: 'active',
      summary: formSummary.trim() || 'Driven professional seeking to bring deep technical knowledge and team collaboration to the role.',
      resumeFileName: resumeFileName,
      portfolioUrl: formPortfolio.trim() || undefined,
      linkedinUrl: formLinkedin.trim() || undefined,
      githubUrl: formGithub.trim() || undefined,
      skills: parsedSkills.length > 0 ? parsedSkills : ['Communication', 'Teamwork', 'Problem Solving'],
      workHistory: [
        {
          role: formRole.trim() || 'Professional Experience',
          company: formCompany.trim() || 'Previous Company',
          duration: '2023 - Present',
          description: 'Contributed to cross-functional initiatives, led feature deliveries, and improved team workflows.'
        }
      ],
      education: [
        {
          degree: 'B.S. in Relevant Discipline',
          institution: 'Accredited University',
          year: '2022'
        }
      ],
      notes: [
        {
          id: `note-${Date.now()}`,
          author: 'System (Portal)',
          text: `Application submitted via Public Careers Portal for "${applyingJob.title}".`,
          createdAt: new Date().toISOString().split('T')[0]
        }
      ],
      evaluations: [],
      interviews: []
    };

    onApplyForJob(newCandidate);
    setSubmissionSuccess(applyingJob.title);
    setApplyingJob(null);

    // Reset form
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormLocation('');
    setFormRole('');
    setFormCompany('');
    setFormSummary('');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Return to ATS banner */}
      <div className="bg-indigo-900/40 border border-indigo-700/50 rounded-xl p-3 flex items-center justify-between text-xs text-indigo-200">
        <span className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-indigo-400" />
          <span>You are viewing the <strong>Public Careers Portal</strong> preview. Candidates who submit here appear instantly in the recruiter pipeline.</span>
        </span>
        <button
          type="button"
          onClick={onBackToATS}
          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold shadow-xs transition-colors"
        >
          Return to Recruiter ATS
        </button>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-12 text-white border border-slate-800 shadow-xl">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 rounded-full text-xs font-semibold text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enugu &bull; South East Nigeria Tech Talent Network</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Build high-impact software from the Coal City and beyond.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Join premier technology teams operating out of Enugu (Independence Layout, GRA, New Haven, Lion Science Park UNN) and the wider South East corridor. We offer top-tier compensation, solar power backup stipends, flexible remote/hybrid models, and rapid career progression.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Competitive NGN &amp; USD Benchmarks</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Enugu Hybrid &amp; Global Remote Work</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Solar Backup &amp; High-Speed Fiber Stipends</span>
            </span>
          </div>
        </div>
      </div>

      {/* Submission Success Dialog */}
      {submissionSuccess && (
        <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-2xl p-6 text-center space-y-3 animate-in fade-in duration-200">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-200">
            Application Received Successfully!
          </h3>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
            Thank you for applying for <strong>{submissionSuccess}</strong>. Your profile has been submitted to the recruitment team and is now in the screening queue.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setSubmissionSuccess(null);
                onBackToATS();
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm"
            >
              View in Recruiter Pipeline →
            </button>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search open positions..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">All Departments</option>
            {departments.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Workplace type filter */}
          <select
            value={workplaceFilter}
            onChange={(e) => setWorkplaceFilter(e.target.value)}
            className="text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">All Locations (Remote/Hybrid)</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>
      </div>

      {/* Jobs Listings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Available Positions ({filteredJobs.length})
          </h2>
          <span className="text-xs text-slate-500">
            Updated daily • Direct hiring team review
          </span>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-500">No open positions match your selected filter criteria.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-md">
                      {job.department}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 font-medium">
                      {job.experienceLevel} Level
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {job.location} ({job.workplaceType})
                    </span>
                    <span>•</span>
                    <span>{job.type}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {formatSalaryRange(job.salaryRange.min, job.salaryRange.max, job.salaryRange.currency)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 self-end md:self-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(job)}
                    className="px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    View Details
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setApplyingJob(job);
                      setSelectedJob(null);
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-colors"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* JOB DETAILS MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-md">
                  {selectedJob.department}
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
                  {selectedJob.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                  <span>{selectedJob.location} ({selectedJob.workplaceType})</span>
                  <span>•</span>
                  <span>{selectedJob.type}</span>
                  <span>•</span>
                  <span>{formatSalaryRange(selectedJob.salaryRange.min, selectedJob.salaryRange.max, selectedJob.salaryRange.currency)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Role Overview</h3>
                <p className="text-sm">{selectedJob.description}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Key Responsibilities</h3>
                <ul className="space-y-1.5 list-disc list-inside">
                  {selectedJob.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Candidate Requirements</h3>
                <ul className="space-y-1.5 list-disc list-inside">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Benefits & Perks</h3>
                <ul className="space-y-1.5 list-disc list-inside">
                  {selectedJob.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  setApplyingJob(selectedJob);
                  setSelectedJob(null);
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center space-x-1.5"
              >
                <span>Apply for this Position</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* APPLICATION FORM MODAL */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100">
            {/* Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                  Application Submission
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  Apply for {applyingJob.title}
                </h2>
                <p className="text-xs text-slate-500">
                  {applyingJob.department} • {applyingJob.location}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleAutofillApplicant}
                  className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 font-medium"
                  title="Fill in sample test candidate details"
                >
                  ⚡ Auto-Fill Sample Data
                </button>
                <button
                  type="button"
                  onClick={() => setApplyingJob(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Jane Doe"
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
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="jane.doe@example.com"
                    required
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Current Location
                  </label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="City, State / Country"
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
                    max={30}
                    value={formExp}
                    onChange={(e) => setFormExp(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Current / Most Recent Role
                  </label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="e.g. Senior Frontend Developer"
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Current Company
                  </label>
                  <input
                    type="text"
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Portfolio / Website
                  </label>
                  <input
                    type="url"
                    value={formPortfolio}
                    onChange={(e) => setFormPortfolio(e.target.value)}
                    placeholder="https://yourportfolio.com"
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={formLinkedin}
                    onChange={(e) => setFormLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    GitHub / Code Repo
                  </label>
                  <input
                    type="url"
                    value={formGithub}
                    onChange={(e) => setFormGithub(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Skills input */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Core Skills & Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={formSkills}
                  onChange={(e) => setFormSkills(e.target.value)}
                  placeholder="e.g. React, TypeScript, Node.js, Cloud, Figma"
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              {/* Resume File Attachment */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Resume / CV Document
                </label>
                <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-indigo-500" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{resumeFileName}</p>
                      <p className="text-[10px] text-slate-400">PDF or DOCX document attached</p>
                    </div>
                  </div>
                  <label className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg text-xs font-semibold cursor-pointer">
                    <span>Browse File</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setResumeFileName(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Cover Note */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Summary / Why are you interested in this role?
                </label>
                <textarea
                  rows={3}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Tell us about your background, relevant projects, and goals..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setApplyingJob(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
