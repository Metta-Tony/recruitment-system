import React, { useState } from 'react';
import { 
  Candidate, 
  JobOpening, 
  PipelineStage, 
  CandidateEvaluation, 
  CandidateNote, 
  InterviewSchedule 
} from '../types';
import { 
  X, 
  Star, 
  Briefcase, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Linkedin, 
  Github, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Award, 
  Plus, 
  Send,
  UserCheck,
  ChevronRight
} from 'lucide-react';

interface CandidateModalProps {
  candidate: Candidate;
  jobs: JobOpening[];
  onClose: () => void;
  onUpdateCandidate: (updated: Candidate) => void;
  onAdvanceStage: (candidateId: string, nextStage: PipelineStage) => void;
}

const STAGE_STEPS: { id: PipelineStage; label: string }[] = [
  { id: 'applied', label: 'Applied' },
  { id: 'screening', label: 'Screening' },
  { id: 'technical', label: 'Technical' },
  { id: 'interview', label: 'Final Interview' },
  { id: 'offer', label: 'Offer' },
  { id: 'hired', label: 'Hired' }
];

export const CandidateModal: React.FC<CandidateModalProps> = ({
  candidate,
  jobs,
  onClose,
  onUpdateCandidate,
  onAdvanceStage
}) => {
  const [activeTab, setActiveTab] = useState<'resume' | 'scorecard' | 'interviews' | 'notes'>('resume');
  
  // Note form state
  const [newNoteText, setNewNoteText] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('Elena Rostova (HR)');

  // Scorecard form state
  const [showAddEvaluation, setShowAddEvaluation] = useState(false);
  const [evalTech, setEvalTech] = useState(4);
  const [evalComm, setEvalComm] = useState(4);
  const [evalCulture, setEvalCulture] = useState(4);
  const [evalProblem, setEvalProblem] = useState(4);
  const [evalRec, setEvalRec] = useState<CandidateEvaluation['recommendation']>('hire');
  const [evalReviewer, setEvalReviewer] = useState('Elena Rostova');
  const [evalComments, setEvalComments] = useState('');

  // Interview schedule quick form state
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [intDate, setIntDate] = useState('2026-09-21');
  const [intTime, setIntTime] = useState('11:00');
  const [intDuration, setIntDuration] = useState(45);
  const [intInterviewer, setIntInterviewer] = useState('Technical Panel');
  const [intType, setIntType] = useState<'video' | 'phone' | 'onsite'>('video');
  const [intNotes, setIntNotes] = useState('');

  const job = jobs.find(j => j.id === candidate.appliedJobId);

  // Helper to get stage index
  const currentStageIndex = STAGE_STEPS.findIndex(s => s.id === candidate.stage);

  // Add Note
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote: CandidateNote = {
      id: `note-${Date.now()}`,
      author: noteAuthor.trim() || 'Recruiter',
      text: newNoteText.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated: Candidate = {
      ...candidate,
      notes: [newNote, ...candidate.notes]
    };

    onUpdateCandidate(updated);
    setNewNoteText('');
  };

  // Add Evaluation Scorecard
  const handleAddEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    const newEval: CandidateEvaluation = {
      id: `eval-${Date.now()}`,
      reviewer: evalReviewer.trim() || 'Hiring Manager',
      stage: candidate.stage,
      technicalSkill: evalTech,
      communication: evalComm,
      cultureFit: evalCulture,
      problemSolving: evalProblem,
      recommendation: evalRec,
      comments: evalComments.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Calculate updated candidate overall rating
    const allEvals = [...candidate.evaluations, newEval];
    const avgScore = Math.round(
      allEvals.reduce((acc, curr) => {
        const itemAvg = (curr.technicalSkill + curr.communication + curr.cultureFit + curr.problemSolving) / 4;
        return acc + itemAvg;
      }, 0) / allEvals.length
    );

    const updated: Candidate = {
      ...candidate,
      rating: Math.max(1, Math.min(5, avgScore || candidate.rating)),
      evaluations: allEvals
    };

    onUpdateCandidate(updated);
    setShowAddEvaluation(false);
    setEvalComments('');
  };

  // Schedule Interview
  const handleScheduleInterview = (e: React.FormEvent) => {
    e.preventDefault();
    const newInterview: InterviewSchedule = {
      id: `int-${Date.now()}`,
      candidateId: candidate.id,
      candidateName: candidate.fullName,
      jobId: candidate.appliedJobId,
      jobTitle: job?.title || 'Role',
      stage: candidate.stage,
      date: intDate,
      time: intTime,
      durationMinutes: Number(intDuration),
      interviewer: intInterviewer,
      meetingType: intType,
      meetingLink: intType === 'video' ? `https://meet.google.com/rec-${Math.random().toString(36).substring(7)}` : undefined,
      status: 'scheduled',
      notes: intNotes
    };

    const updated: Candidate = {
      ...candidate,
      interviews: [...candidate.interviews, newInterview]
    };

    onUpdateCandidate(updated);
    setShowScheduleForm(false);
    setIntNotes('');
  };

  const handleUpdateRating = (newRating: number) => {
    onUpdateCandidate({
      ...candidate,
      rating: newRating
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
      <div 
        id="candidate-modal-container"
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100"
      >
        {/* Header Section */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-indigo-500/20 shrink-0">
                {candidate.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {candidate.fullName}
                  </h2>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold capitalize border ${
                    candidate.status === 'hired'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                      : candidate.status === 'rejected'
                      ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800'
                      : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-800'
                  }`}>
                    {candidate.status === 'hired' ? 'Hired' : candidate.status === 'rejected' ? 'Archived / Rejected' : `Stage: ${candidate.stage}`}
                  </span>
                </div>

                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-0.5 flex items-center space-x-2">
                  <span>{candidate.currentRole} at {candidate.currentCompany}</span>
                  <span className="text-slate-400">•</span>
                  <span>{candidate.yearsExperience} yrs exp</span>
                </p>

                {/* Contact items */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
                  <span className="flex items-center">
                    <Mail className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {candidate.email}
                  </span>
                  <span className="flex items-center">
                    <Phone className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {candidate.phone}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {candidate.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Close Button & Star Rating */}
            <div className="flex flex-col items-end space-y-2">
              <button
                id="close-candidate-modal-btn"
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Star Rating selector */}
              <div className="flex items-center space-x-1 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
                <span className="text-[11px] font-medium text-slate-500 mr-1">Score:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleUpdateRating(star)}
                    className="hover:scale-110 transition-transform focus:outline-none"
                    title={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        star <= candidate.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Pipeline Stage Tracker Bar */}
          <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Recruitment Progression Stepper
              </span>

              <div className="flex items-center space-x-2">
                {candidate.stage !== 'hired' && candidate.status !== 'rejected' && (
                  <button
                    type="button"
                    onClick={() => {
                      const stages: PipelineStage[] = ['applied', 'screening', 'technical', 'interview', 'offer', 'hired'];
                      const curIdx = stages.indexOf(candidate.stage);
                      if (curIdx < stages.length - 1) {
                        onAdvanceStage(candidate.id, stages[curIdx + 1]);
                      }
                    }}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center space-x-1 transition-colors"
                  >
                    <span>Advance Stage</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {candidate.status !== 'rejected' && (
                  <button
                    type="button"
                    onClick={() => onAdvanceStage(candidate.id, 'rejected')}
                    className="px-3 py-1 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject Candidate</span>
                  </button>
                )}

                {candidate.status === 'rejected' && (
                  <button
                    type="button"
                    onClick={() => onAdvanceStage(candidate.id, 'screening')}
                    className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Restore Candidate
                  </button>
                )}
              </div>
            </div>

            {/* Stages Visual Stepper */}
            <div className="grid grid-cols-6 gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-xl">
              {STAGE_STEPS.map((step, idx) => {
                const isCurrent = candidate.stage === step.id;
                const isPast = currentStageIndex > idx;
                
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => onAdvanceStage(candidate.id, step.id)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center ${
                      isCurrent
                        ? 'bg-indigo-600 text-white font-bold shadow-xs'
                        : isPast
                        ? 'bg-white dark:bg-slate-700/60 text-slate-700 dark:text-slate-300'
                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-1">
                      {isPast && <CheckCircle2 className="w-3 h-3 text-emerald-500 inline shrink-0" />}
                      <span className="truncate">{step.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-5 bg-white dark:bg-slate-900 space-x-6 text-sm font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('resume')}
            className={`py-3.5 border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'resume'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Resume & CV Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('scorecard')}
            className={`py-3.5 border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'scorecard'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Evaluation Scorecard</span>
            <span className="px-1.5 py-0.2 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {candidate.evaluations.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('interviews')}
            className={`py-3.5 border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'interviews'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Interviews</span>
            <span className="px-1.5 py-0.2 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {candidate.interviews.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`py-3.5 border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'notes'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Recruiter Notes</span>
            <span className="px-1.5 py-0.2 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {candidate.notes.length}
            </span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: RESUME & OVERVIEW */}
          {activeTab === 'resume' && (
            <div className="space-y-6">
              {/* Job Applied Banner */}
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Applied Position</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {job?.title || 'Open Application'}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Department: {job?.department} • {job?.workplaceType} • Applied on {candidate.appliedDate}
                    </p>
                  </div>
                </div>

                {/* External links */}
                <div className="flex items-center space-x-2">
                  {candidate.portfolioUrl && (
                    <a
                      href={candidate.portfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 flex items-center space-x-1"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Portfolio</span>
                    </a>
                  )}
                  {candidate.linkedinUrl && (
                    <a
                      href={candidate.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 flex items-center space-x-1"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-blue-500" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {candidate.githubUrl && (
                    <a
                      href={candidate.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 flex items-center space-x-1"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Summary Bio */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Executive Summary & Profile
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  {candidate.summary}
                </p>
              </div>

              {/* Skills Tags */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Technical & Domain Competencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Work Experience */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Work Experience Timeline
                </h3>
                <div className="space-y-3">
                  {candidate.workHistory.map((work, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 relative pl-6 before:absolute before:left-2.5 before:top-5 before:bottom-0 before:w-0.5 before:bg-indigo-200 dark:before:bg-indigo-900"
                    >
                      <div className="absolute left-1.5 top-5 w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-indigo-100 dark:ring-indigo-950" />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{work.role}</h4>
                        <span className="text-xs font-medium text-slate-500">{work.duration}</span>
                      </div>
                      <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{work.company}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">{work.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              {candidate.education && candidate.education.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Education & Credentials
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {candidate.education.map((edu, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                      >
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{edu.institution} • {edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SCORECARD & EVALUATIONS */}
          {activeTab === 'scorecard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Interview Panel Scorecards ({candidate.evaluations.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Comprehensive rubric evaluations from technical and cultural interviewers.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddEvaluation(!showAddEvaluation)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Submit Scorecard</span>
                </button>
              </div>

              {/* Scorecard Form */}
              {showAddEvaluation && (
                <form
                  onSubmit={handleAddEvaluation}
                  className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-indigo-200 dark:border-indigo-900/50 space-y-4"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Add Candidate Rubric Evaluation
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Reviewer Name
                      </label>
                      <input
                        type="text"
                        value={evalReviewer}
                        onChange={(e) => setEvalReviewer(e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Final Recommendation
                      </label>
                      <select
                        value={evalRec}
                        onChange={(e) => setEvalRec(e.target.value as any)}
                        className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      >
                        <option value="strong_hire">Strong Hire</option>
                        <option value="hire">Hire</option>
                        <option value="neutral">Neutral / Undecided</option>
                        <option value="no_hire">No Hire</option>
                        <option value="strong_no_hire">Strong No Hire</option>
                      </select>
                    </div>
                  </div>

                  {/* 4 Core Dimensions */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                      <span className="text-[11px] font-semibold block text-slate-600 dark:text-slate-300 mb-1">
                        Technical Skill
                      </span>
                      <select
                        value={evalTech}
                        onChange={(e) => setEvalTech(Number(e.target.value))}
                        className="text-xs font-bold p-1 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      >
                        {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} / 5</option>)}
                      </select>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                      <span className="text-[11px] font-semibold block text-slate-600 dark:text-slate-300 mb-1">
                        Communication
                      </span>
                      <select
                        value={evalComm}
                        onChange={(e) => setEvalComm(Number(e.target.value))}
                        className="text-xs font-bold p-1 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      >
                        {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} / 5</option>)}
                      </select>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                      <span className="text-[11px] font-semibold block text-slate-600 dark:text-slate-300 mb-1">
                        Problem Solving
                      </span>
                      <select
                        value={evalProblem}
                        onChange={(e) => setEvalProblem(Number(e.target.value))}
                        className="text-xs font-bold p-1 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      >
                        {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} / 5</option>)}
                      </select>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                      <span className="text-[11px] font-semibold block text-slate-600 dark:text-slate-300 mb-1">
                        Culture Fit
                      </span>
                      <select
                        value={evalCulture}
                        onChange={(e) => setEvalCulture(Number(e.target.value))}
                        className="text-xs font-bold p-1 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      >
                        {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} / 5</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Detailed Interview Feedback & Observations
                    </label>
                    <textarea
                      rows={3}
                      value={evalComments}
                      onChange={(e) => setEvalComments(e.target.value)}
                      placeholder="Outline key strengths, architectural choices, and areas of hesitation..."
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddEvaluation(false)}
                      className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                    >
                      Save Scorecard
                    </button>
                  </div>
                </form>
              )}

              {/* Evaluations List */}
              {candidate.evaluations.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl">
                  <Award className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">No evaluations submitted yet.</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Click "Submit Scorecard" to add interviewer feedback.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {candidate.evaluations.map((ev) => (
                    <div
                      key={ev.id}
                      className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">{ev.reviewer}</h4>
                          <p className="text-[11px] text-slate-400">Stage: <span className="capitalize">{ev.stage}</span> • {ev.createdAt}</p>
                        </div>

                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                          ev.recommendation === 'strong_hire' || ev.recommendation === 'hire'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                            : ev.recommendation === 'neutral'
                            ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                            : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                        }`}>
                          {ev.recommendation.replace('_', ' ')}
                        </span>
                      </div>

                      {/* Dimension scores */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                          <span className="text-slate-400 block text-[10px]">Technical</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{ev.technicalSkill}/5 ★</span>
                        </div>
                        <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                          <span className="text-slate-400 block text-[10px]">Communication</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{ev.communication}/5 ★</span>
                        </div>
                        <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                          <span className="text-slate-400 block text-[10px]">Problem Solving</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{ev.problemSolving}/5 ★</span>
                        </div>
                        <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                          <span className="text-slate-400 block text-[10px]">Culture Fit</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{ev.cultureFit}/5 ★</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic bg-slate-50/50 dark:bg-slate-800/30 p-3 rounded-lg">
                        "{ev.comments}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: INTERVIEWS */}
          {activeTab === 'interviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Scheduled & Completed Interviews ({candidate.interviews.length})
                  </h3>
                  <p className="text-xs text-slate-500">Manage meeting links, dates, and interviewer assignments.</p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowScheduleForm(!showScheduleForm)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Schedule Interview</span>
                </button>
              </div>

              {/* Schedule form */}
              {showScheduleForm && (
                <form
                  onSubmit={handleScheduleInterview}
                  className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-indigo-200 dark:border-indigo-900/50 space-y-4"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Schedule New Interview Session
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={intDate}
                        onChange={(e) => setIntDate(e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        value={intTime}
                        onChange={(e) => setIntTime(e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Duration (Minutes)
                      </label>
                      <select
                        value={intDuration}
                        onChange={(e) => setIntDuration(Number(e.target.value))}
                        className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      >
                        <option value={30}>30 mins</option>
                        <option value={45}>45 mins</option>
                        <option value={60}>60 mins</option>
                        <option value={90}>90 mins</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Interviewer(s)
                      </label>
                      <input
                        type="text"
                        value={intInterviewer}
                        onChange={(e) => setIntInterviewer(e.target.value)}
                        placeholder="e.g. Alexandre Dubois, Elena Rostova"
                        className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Format
                      </label>
                      <select
                        value={intType}
                        onChange={(e) => setIntType(e.target.value as any)}
                        className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      >
                        <option value="video">Google Meet / Video Conference</option>
                        <option value="phone">Phone Screening</option>
                        <option value="onsite">On-Site Office Visit</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Agenda & Candidate Prep Notes
                    </label>
                    <input
                      type="text"
                      value={intNotes}
                      onChange={(e) => setIntNotes(e.target.value)}
                      placeholder="e.g. System design discussion + live coding exercise"
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowScheduleForm(false)}
                      className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                    >
                      Confirm Schedule
                    </button>
                  </div>
                </form>
              )}

              {/* Interviews list */}
              {candidate.interviews.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl">
                  <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">No interviews scheduled yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {candidate.interviews.map((int) => (
                    <div
                      key={int.id}
                      className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {int.date} at {int.time} ({int.durationMinutes}m)
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-semibold capitalize ${
                            int.status === 'scheduled'
                              ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800'
                              : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                          }`}>
                            {int.status}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          Interviewer: <strong className="text-slate-800 dark:text-slate-200">{int.interviewer}</strong> • Format: <span className="capitalize">{int.meetingType}</span>
                        </p>

                        {int.notes && (
                          <p className="text-[11px] text-slate-500 mt-1 italic">Note: {int.notes}</p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {int.meetingLink && (
                          <a
                            href={int.meetingLink}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-lg hover:bg-indigo-100 transition-colors"
                          >
                            Join Meeting Link
                          </a>
                        )}

                        {int.status === 'scheduled' && (
                          <button
                            type="button"
                            onClick={() => {
                              const updatedInterviews = candidate.interviews.map(i =>
                                i.id === int.id ? { ...i, status: 'completed' as const } : i
                              );
                              onUpdateCandidate({ ...candidate, interviews: updatedInterviews });
                            }}
                            className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold rounded-lg hover:bg-emerald-100 transition-colors"
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: RECRUITER NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Add Team Log / Recruiter Note
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[11px] text-slate-400">Author:</span>
                    <input
                      type="text"
                      value={noteAuthor}
                      onChange={(e) => setNoteAuthor(e.target.value)}
                      className="text-xs px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
                    />
                  </div>
                </div>

                <textarea
                  rows={2}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Record recruiter insights, candidate compensation expectations, availability..."
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-1 focus:ring-indigo-500"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!newNoteText.trim()}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post Note</span>
                  </button>
                </div>
              </form>

              {/* Notes Timeline */}
              <div className="space-y-3">
                {candidate.notes.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No recruiter notes recorded yet.</p>
                ) : (
                  candidate.notes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-indigo-600" />
                          <span>{note.author}</span>
                        </span>
                        <span className="text-[10px] text-slate-400">{note.createdAt}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-3.5">
                        {note.text}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
          <span className="text-xs text-slate-400">Candidate ID: {candidate.id}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
