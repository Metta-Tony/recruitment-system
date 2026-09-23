import React from 'react';
import { 
  Briefcase, 
  Users, 
  Calendar, 
  BarChart3, 
  Plus, 
  Search, 
  RotateCcw, 
  Globe, 
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  BookOpen
} from 'lucide-react';
import { JobOpening, Candidate } from '../types';

interface HeaderProps {
  activeTab: 'pipeline' | 'jobs' | 'interviews' | 'analytics' | 'careers' | 'about' | 'guide';
  setActiveTab: (tab: 'pipeline' | 'jobs' | 'interviews' | 'analytics' | 'careers' | 'about' | 'guide') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  jobs: JobOpening[];
  candidates: Candidate[];
  onOpenNewJobModal: () => void;
  onOpenNewCandidateModal: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  jobs,
  candidates,
  onOpenNewJobModal,
  onOpenNewCandidateModal,
  onResetData
}) => {
  const activeJobsCount = jobs.filter(j => j.status === 'published').length;
  const inPipelineCount = candidates.filter(c => c.status === 'active' && c.stage !== 'hired' && c.stage !== 'rejected').length;
  const hiredCount = candidates.filter(c => c.stage === 'hired' || c.status === 'hired').length;
  
  // Count upcoming interviews
  const upcomingInterviewsCount = candidates.flatMap(c => c.interviews || []).filter(i => i.status === 'scheduled').length;

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-30 shadow-md">
      {/* Top Banner with Quick Metrics & Action Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 border-b border-slate-800/80 gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-600 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white font-bold text-lg">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold tracking-tight text-white">Recruitment System</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30 flex items-center space-x-1">
                    <MapPin className="w-2.5 h-2.5" />
                    <span>Enugu &bull; South East</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400">Coal City Regional Tech Talent &amp; Applicant Tracking</p>
              </div>
            </div>

            {/* View Switcher: Recruiter ATS vs Public Careers Portal */}
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'careers' ? 'pipeline' : 'careers')}
                className="flex items-center space-x-1 text-xs px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>{activeTab === 'careers' ? 'Go to ATS' : 'Careers'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hidden lg:flex items-center space-x-6 text-xs text-slate-300">
            <div className="flex items-center space-x-2 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span className="text-slate-400">Published Jobs:</span>
              <span className="font-semibold text-white">{activeJobsCount}</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
              <Users className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400">Active Pipeline:</span>
              <span className="font-semibold text-white">{inPipelineCount}</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
              <Clock className="w-4 h-4 text-sky-400" />
              <span className="text-slate-400">Scheduled Interviews:</span>
              <span className="font-semibold text-white">{upcomingInterviewsCount}</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400">Hires Made:</span>
              <span className="font-semibold text-emerald-300">{hiredCount}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2 self-end md:self-auto">
            <button
              id="reset-demo-data-btn"
              type="button"
              onClick={onResetData}
              title="Reset to initial sample candidates and jobs"
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              id="header-user-guide-btn"
              type="button"
              onClick={() => setActiveTab('guide')}
              className={`flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all border ${
                activeTab === 'guide'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
              title="How to use the recruitment system"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>How to Use</span>
            </button>

            <button
              id="open-careers-portal-btn"
              type="button"
              onClick={() => setActiveTab(activeTab === 'careers' ? 'pipeline' : 'careers')}
              className={`hidden md:flex items-center space-x-1.5 text-xs font-medium px-3 py-2 rounded-lg transition-all border ${
                activeTab === 'careers'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Globe className="w-4 h-4 text-indigo-400" />
              <span>{activeTab === 'careers' ? 'Back to Recruiter ATS' : 'Candidate Careers Portal'}</span>
            </button>

            {activeTab !== 'careers' && (
              <>
                <button
                  id="add-candidate-btn"
                  type="button"
                  onClick={onOpenNewCandidateModal}
                  className="flex items-center space-x-1 text-xs font-medium px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Add Candidate</span>
                </button>

                <button
                  id="post-job-btn"
                  type="button"
                  onClick={onOpenNewJobModal}
                  className="flex items-center space-x-1 text-xs font-medium px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Post Job</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Bottom Navigation & Universal Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 gap-2">
          {/* Main Navigation Tabs */}
          <nav className="flex space-x-1 overflow-x-auto no-scrollbar">
            <button
              id="nav-pipeline"
              type="button"
              onClick={() => setActiveTab('pipeline')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                activeTab === 'pipeline'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Candidates Pipeline</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300">
                {candidates.length}
              </span>
            </button>

            <button
              id="nav-jobs"
              type="button"
              onClick={() => setActiveTab('jobs')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                activeTab === 'jobs'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Job Openings</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300">
                {jobs.length}
              </span>
            </button>

            <button
              id="nav-interviews"
              type="button"
              onClick={() => setActiveTab('interviews')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                activeTab === 'interviews'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Interviews Agenda</span>
              {upcomingInterviewsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  {upcomingInterviewsCount}
                </span>
              )}
            </button>

            <button
              id="nav-analytics"
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Recruitment Funnel & Analytics</span>
            </button>

            <button
              id="nav-careers"
              type="button"
              onClick={() => setActiveTab('careers')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                activeTab === 'careers'
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Live Careers Portal</span>
            </button>

            <button
              id="nav-about"
              type="button"
              onClick={() => setActiveTab('about')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                activeTab === 'about'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>About &amp; Innovation</span>
            </button>

            <button
              id="nav-guide"
              type="button"
              onClick={() => setActiveTab('guide')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'guide'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-amber-400/90 hover:text-amber-200 hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>How to Use (Guide)</span>
            </button>
          </nav>

          {/* Quick Search */}
          <div className="relative min-w-[240px] max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
            <input
              id="universal-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate, job, skill..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-200 text-xs"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
