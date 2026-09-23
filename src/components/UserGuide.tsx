import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  Users, 
  Briefcase, 
  Calendar, 
  BarChart3, 
  Globe, 
  FileText, 
  Sparkles, 
  Play, 
  Compass, 
  MapPin, 
  Coins, 
  RotateCcw, 
  Sliders, 
  Star, 
  Send, 
  Eye, 
  CheckSquare, 
  Square, 
  Building2, 
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Clock
} from 'lucide-react';

interface UserGuideProps {
  onNavigateTab: (tab: 'pipeline' | 'jobs' | 'interviews' | 'analytics' | 'careers' | 'about' | 'guide') => void;
  onOpenNewJobModal: () => void;
  onOpenNewCandidateModal: () => void;
  onResetData: () => void;
}

type GuideSection = 'quickstart' | 'recruiter' | 'candidate' | 'careers' | 'regional' | 'faq';

export const UserGuide: React.FC<UserGuideProps> = ({
  onNavigateTab,
  onOpenNewJobModal,
  onOpenNewCandidateModal,
  onResetData
}) => {
  const [activeSection, setActiveSection] = useState<GuideSection>('quickstart');

  // Interactive Checklist State to gamify user exploration
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    explorePipeline: true,
    viewCandidateModal: false,
    filterJobs: false,
    testPublicApplication: false,
    scheduleInterview: false,
    viewAnalytics: false
  });

  const toggleChecklistItem = (key: string) => {
    setChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const totalChecklist = Object.keys(checklist).length;
  const progressPercent = Math.round((completedCount / totalChecklist) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 text-white border border-slate-800 shadow-xl">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 rounded-full text-xs font-semibold text-indigo-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Interactive Webpage Guide &amp; User Manual</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            How to Use the Recruitment System
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Welcome to the Enugu &amp; South East Nigeria Recruitment &amp; Applicant Tracking System (ATS). 
            This comprehensive guide walks you through every feature: managing candidates across pipeline stages, 
            posting job openings with local NGN currency, scheduling interviews, analyzing hiring velocity, and testing the live public careers portal.
          </p>

          {/* Quick Metrics / Interactive Progress */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/80">
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>Explore Mode: <strong>Two Portals in One App</strong></span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/80">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Interactive Checklist: <strong>{completedCount} of {totalChecklist} explored ({progressPercent}%)</strong></span>
            </div>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Main Navigation Tabs within the Guide */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveSection('quickstart')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSection === 'quickstart'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700/60'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>5-Minute Quickstart</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('recruiter')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSection === 'recruiter'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700/60'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Recruiter &amp; ATS Pipeline</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('careers')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSection === 'careers'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700/60'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Careers Portal &amp; Applications</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('candidate')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSection === 'candidate'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700/60'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Candidate Dossier &amp; Scoring</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('regional')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSection === 'regional'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700/60'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Enugu Hub &amp; NGN Currency</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('faq')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSection === 'faq'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700/60'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>FAQ &amp; Shortcuts</span>
        </button>
      </div>

      {/* SECTION 1: QUICKSTART */}
      {activeSection === 'quickstart' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Quick Action Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Candidate Pipeline
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Manage active applicants in an interactive Kanban board or searchable table across 6 hiring stages.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  toggleChecklistItem('explorePipeline');
                  onNavigateTab('pipeline');
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
              >
                <span>Go to Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Live Public Careers Portal
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Switch to the public-facing careers view where Enugu talent views open roles and submits applications with 1-click test fill.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  toggleChecklistItem('testPublicApplication');
                  onNavigateTab('careers');
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
              >
                <span>View Careers Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Post a New Job in Enugu
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Define job requirements, specify salary bands in Nigerian Naira (₦ NGN), and target tech hubs in Independence Layout or New Haven.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenNewJobModal}
                className="w-full py-2.5 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/30 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
              >
                <span>Open New Job Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Exploration Checklist */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <CheckSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>Hands-On Interactive Walkthrough Checklist</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Click any item below to jump directly into the application and test each feature.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {progressPercent}% Complete
                </span>
                <div className="w-32 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }} 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              {/* Item 1 */}
              <div 
                onClick={() => {
                  toggleChecklistItem('explorePipeline');
                  onNavigateTab('pipeline');
                }}
                className="flex items-start space-x-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/70 hover:border-indigo-400 cursor-pointer transition-all"
              >
                <div className="mt-0.5">
                  {checklist.explorePipeline ? (
                    <CheckSquare className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    1. Explore the Candidate Pipeline
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Switch between Kanban and List views. Drag cards or click stage action chips to advance candidates.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div 
                onClick={() => {
                  toggleChecklistItem('viewCandidateModal');
                  onNavigateTab('pipeline');
                }}
                className="flex items-start space-x-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/70 hover:border-indigo-400 cursor-pointer transition-all"
              >
                <div className="mt-0.5">
                  {checklist.viewCandidateModal ? (
                    <CheckSquare className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    2. Inspect Candidate Dossier &amp; Scorecard
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Click any candidate (e.g. Chukwudi or Adaobi) to view their UNN background, add notes, and submit a 4-pillar scorecard.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div 
                onClick={() => {
                  toggleChecklistItem('filterJobs');
                  onNavigateTab('jobs');
                }}
                className="flex items-start space-x-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/70 hover:border-indigo-400 cursor-pointer transition-all"
              >
                <div className="mt-0.5">
                  {checklist.filterJobs ? (
                    <CheckSquare className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    3. Manage Job Requisitions
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    View active job requisitions, toggle statuses (Published / Paused), and inspect applicant counts per role.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div 
                onClick={() => {
                  toggleChecklistItem('testPublicApplication');
                  onNavigateTab('careers');
                }}
                className="flex items-start space-x-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/70 hover:border-indigo-400 cursor-pointer transition-all"
              >
                <div className="mt-0.5">
                  {checklist.testPublicApplication ? (
                    <CheckSquare className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    4. Test Public Career Application
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Click 'Apply Now' on the Careers Portal, use the 1-click test autofill button, and verify the application syncs instantly into the ATS.
                  </p>
                </div>
              </div>

              {/* Item 5 */}
              <div 
                onClick={() => {
                  toggleChecklistItem('scheduleInterview');
                  onNavigateTab('interviews');
                }}
                className="flex items-start space-x-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/70 hover:border-indigo-400 cursor-pointer transition-all"
              >
                <div className="mt-0.5">
                  {checklist.scheduleInterview ? (
                    <CheckSquare className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    5. Coordinate Interview Agenda
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Schedule a mock screening or technical interview with date, time, duration, and Google Meet/Zoom URL.
                  </p>
                </div>
              </div>

              {/* Item 6 */}
              <div 
                onClick={() => {
                  toggleChecklistItem('viewAnalytics');
                  onNavigateTab('analytics');
                }}
                className="flex items-start space-x-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/70 hover:border-indigo-400 cursor-pointer transition-all"
              >
                <div className="mt-0.5">
                  {checklist.viewAnalytics ? (
                    <CheckSquare className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    6. Inspect Recruitment Analytics &amp; Funnel
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Analyze recruitment pass rates, stage conversion drop-offs, and department distribution charts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: RECRUITER & ATS PIPELINE */}
      {activeSection === 'recruiter' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Recruiter &amp; ATS Pipeline Workflow
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  How to manage candidate flow from initial application through final job offer.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Step A */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    Pipeline Stages
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold">
                    6 Stages
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  The 6 Stage Lifecycle
                </h3>
                <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li><strong>Applied:</strong> Inbound submissions from Careers Portal or direct recruitment sourcing.</li>
                  <li><strong>Screening:</strong> 15-minute recruiter alignment check for experience &amp; communication.</li>
                  <li><strong>Technical Test:</strong> Real-world work sample or take-home coding evaluation.</li>
                  <li><strong>Panel Interview:</strong> Deep-dive architecture and team cultural interview.</li>
                  <li><strong>Offer Extended:</strong> Formal compensation package proposed (in NGN or USD).</li>
                  <li><strong>Hired:</strong> Candidate accepted offer and onboarded into Coal City team.</li>
                </ol>
              </div>

              {/* Step B */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    Interaction Options
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold">
                    Kanban + List
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Kanban Drag &amp; Drop vs. Table View
                </h3>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside leading-relaxed">
                  <li><strong>Drag &amp; Drop:</strong> On desktop, simply grab a candidate card and drop them onto any column.</li>
                  <li><strong>Direct Action Dropdown:</strong> Click the stage badge on any candidate card to instantly select a new stage without dragging.</li>
                  <li><strong>Table View Toggle:</strong> Click the List View button in the toolbar to see a dense tabular view with sortable columns.</li>
                  <li><strong>Filter by Job:</strong> Use the role filter dropdown to isolate candidates for a single opening.</li>
                </ul>
              </div>

              {/* Step C */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    Candidate Management
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold">
                    Profile Drawer
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Opening Candidate Details
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Click anywhere on a candidate card to open their full interactive profile. Inside you can:
                </p>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                  <li>Review university background (e.g. UNN, UNEC, IMT).</li>
                  <li>View external portfolio and GitHub repositories.</li>
                  <li>Add private recruiter notes with automated timestamping.</li>
                  <li>Submit 4-pillar interview evaluations.</li>
                  <li>Directly schedule an interview meeting.</li>
                </ul>
              </div>

              {/* Step D */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    Adding Candidates
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-semibold">
                    Quick Add
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Manual Sourcing &amp; Intake
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Have a candidate sourced directly from an Enugu tech meetup or university outreach? 
                  Click <strong>"+ Add Candidate"</strong> in the top header to enter their credentials and place them in any stage.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenNewCandidateModal}
                    className="py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold inline-flex items-center space-x-1"
                  >
                    <span>Try Manual Candidate Form</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => onNavigateTab('pipeline')}
                className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center space-x-2"
              >
                <span>Go to Candidate Pipeline</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: CAREERS PORTAL & APPLICATIONS */}
      {activeSection === 'careers' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Public Careers Portal Guide
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Experience how job seekers discover opportunities and apply in South East Nigeria.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Discovering Roles
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Applicants can search by keyword (e.g. "React", "DevOps") or filter by Department (Engineering, Product, Design) and Workplace Type (Hybrid in Independence Layout, Remote, On-site in GRA).
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  One-Click Demo Autofill
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Testing the application form? Click <strong>"Autofill Sample Applicant (Enugu)"</strong> at the top of the modal. 
                  It instantly populates a genuine candidate profile (Chukwudi Nnamani from UNN) so you can test without typing.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Instant ATS Synchronization
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Upon submitting the form, the applicant is instantly injected into your live Candidate Pipeline under the <strong>"Applied"</strong> stage, complete with resume and skills.
                </p>
              </div>
            </div>

            {/* Test Application Direct Call to Action */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Ready to test a live application submission?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Switch to the Careers Portal, pick any job, and click 'Apply Now'.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('careers')}
                className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center space-x-2 shrink-0"
              >
                <span>Launch Careers Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: CANDIDATE DOSSIER & SCORING */}
      {activeSection === 'candidate' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Candidate Dossier &amp; Evaluation Scorecard
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Standardized technical and cultural assessment rubric for reliable hiring decisions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scorecard Rubric */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>The 4-Pillar Evaluation Rubric</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Inside the candidate drawer, interviewers evaluate applicants across four standardized 1-to-5 star criteria:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">1. Technical Proficiency</span>
                    <span className="text-[11px] text-slate-500">System architecture, syntax, testing</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">2. Communication &amp; Clarity</span>
                    <span className="text-[11px] text-slate-500">Async articulation, documentation</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">3. Cultural &amp; Team Fit</span>
                    <span className="text-[11px] text-slate-500">Mentorship, ownership, curiosity</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">4. Problem Solving</span>
                    <span className="text-[11px] text-slate-500">Debugging under constraints, trade-offs</span>
                  </div>
                </div>
              </div>

              {/* Recruiter Notes & History */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span>Recruiter Notes &amp; Activity Log</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Collaborative hiring teams need clear institutional memory. The notes section allows any team member to record observations:
                </p>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
                  <li>Timestamped notes with recruiter name.</li>
                  <li>Interview debrief summaries.</li>
                  <li>Salary negotiation expectations (e.g. ₦12M/yr target + solar stipend).</li>
                  <li>Direct links to external GitHub repositories or live deployed demos.</li>
                </ul>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => onNavigateTab('pipeline')}
                    className="w-full py-2 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <span>Click any Candidate in Pipeline to Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: ENUGU HUB & CURRENCY */}
      {activeSection === 'regional' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Enugu Tech Corridor &amp; NGN Salary System
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Regional localization, verified talent nodes, and multi-currency compensation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                  <Coins className="w-4 h-4" />
                  <span>Multi-Currency Salaries</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Nigerian Naira (₦ NGN) &amp; USD ($)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Job requisitions support direct compensation in <strong>₦ NGN (Million Naira/year)</strong> as well as <strong>$ USD</strong> for international remote contracts. All salary displays automatically adapt to their respective symbols and scales.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                  <Building2 className="w-4 h-4" />
                  <span>Enugu Tech Corridors</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Prime Locations
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Roles are tied to key Enugu tech ecosystems: <strong>Independence Layout</strong> (innovation corridor), <strong>GRA</strong> (executive and venture studios), <strong>New Haven</strong> (developer hubs), and <strong>Lion Science Park UNN</strong>.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Infrastructure Stipends</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Solar &amp; Fiber Internet
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  To address regional power and broadband realities, job postings emphasize verified remote infrastructure benefits: solar inverter subsidies and high-speed fiber internet stipends.
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 text-xs">
              <span className="text-slate-500">Want to read the full technical whitepaper on Enugu talent infrastructure?</span>
              <button
                type="button"
                onClick={() => onNavigateTab('about')}
                className="py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-semibold text-slate-800 dark:text-slate-200 transition-colors"
              >
                <span>Read About &amp; Innovation</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: FAQ & SHORTCUTS */}
      {activeSection === 'faq' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Frequently Asked Questions &amp; Keyboard Tips
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Quick answers to common questions about using this recruitment system.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <details className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 group" open>
                <summary className="font-bold text-sm text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                  <span>How do I search for a specific candidate or skill across the system?</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Use the universal search input in the top header. Typing any candidate name (e.g., "Chukwudi"), job title ("DevOps"), or skill ("PostgreSQL", "Docker") instantly filters the current pipeline and tables in real-time.
                </p>
              </details>

              <details className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 group">
                <summary className="font-bold text-sm text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                  <span>Is my test data saved if I close or refresh the browser?</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Yes! All candidate updates, job creations, evaluation scores, and interview appointments are stored in your browser's local storage. Your data persists across page refreshes.
                </p>
              </details>

              <details className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 group">
                <summary className="font-bold text-sm text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                  <span>How can I reset all changes back to the original Enugu seed dataset?</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-2 space-y-2 leading-relaxed">
                  <p>
                    If you have moved candidates around or created test jobs and want to restore the clean initial database, simply click the <strong>"Reset Demo Dataset"</strong> button in either the top header banner or the page footer.
                  </p>
                  <button
                    type="button"
                    onClick={onResetData}
                    className="py-1.5 px-3 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold border border-rose-200 dark:border-rose-900/60 inline-flex items-center space-x-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Demo Dataset Now</span>
                  </button>
                </div>
              </details>

              <details className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 group">
                <summary className="font-bold text-sm text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                  <span>How does interview scheduling connect to the candidate profile?</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  When you schedule an interview in the <strong>Interviews Agenda</strong> tab, it automatically links to that candidate's record. When viewing their dossier in the pipeline, you will see their upcoming interview time, meeting link, and interviewer assignment.
                </p>
              </details>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
