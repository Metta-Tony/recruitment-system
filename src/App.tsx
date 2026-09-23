import React, { useState, useEffect } from 'react';
import { 
  JobOpening, 
  Candidate, 
  PipelineStage, 
  JobStatus 
} from './types';
import { 
  getStoredJobs, 
  saveStoredJobs, 
  getStoredCandidates, 
  saveStoredCandidates, 
  resetDemoData 
} from './data/mockData';
import { Header } from './components/Header';
import { PipelineKanban } from './components/PipelineKanban';
import { PipelineList } from './components/PipelineList';
import { CandidateModal } from './components/CandidateModal';
import { JobsManager } from './components/JobsManager';
import { InterviewScheduler } from './components/InterviewScheduler';
import { AnalyticsView } from './components/AnalyticsView';
import { CareersPortal } from './components/CareersPortal';
import { AboutSection } from './components/AboutSection';
import { UserGuide } from './components/UserGuide';
import { Footer } from './components/Footer';
import { NewJobModal } from './components/NewJobModal';
import { NewCandidateModal } from './components/NewCandidateModal';
import { LayoutGrid, List, BookOpen } from 'lucide-react';

export default function App() {
  const [jobs, setJobs] = useState<JobOpening[]>(() => getStoredJobs());
  const [candidates, setCandidates] = useState<Candidate[]>(() => getStoredCandidates());

  const [activeTab, setActiveTab] = useState<'pipeline' | 'jobs' | 'interviews' | 'analytics' | 'careers' | 'about' | 'guide'>('pipeline');
  const [pipelineViewMode, setPipelineViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedJobId, setSelectedJobId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);
  const [isNewCandidateModalOpen, setIsNewCandidateModalOpen] = useState(false);
  const [highlightedCareerJobId, setHighlightedCareerJobId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    saveStoredJobs(jobs);
  }, [jobs]);

  useEffect(() => {
    saveStoredCandidates(candidates);
  }, [candidates]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Update candidate stage
  const handleUpdateCandidateStage = (candidateId: string, nextStage: PipelineStage) => {
    setCandidates(prev => {
      const updated = prev.map(c => {
        if (c.id === candidateId) {
          const isHired = nextStage === 'hired';
          const isRejected = nextStage === 'rejected';
          return {
            ...c,
            stage: nextStage,
            status: isHired ? ('hired' as const) : isRejected ? ('rejected' as const) : ('active' as const),
            notes: [
              {
                id: `note-${Date.now()}`,
                author: 'Recruitment System',
                text: `Moved candidate to stage "${nextStage.toUpperCase()}".`,
                createdAt: new Date().toISOString().split('T')[0]
              },
              ...c.notes
            ]
          };
        }
        return c;
      });
      return updated;
    });

    const targetCand = candidates.find(c => c.id === candidateId);
    showToast(`Updated ${targetCand?.fullName || 'Candidate'} to "${nextStage}" stage.`);
    
    // Also update selectedCandidate if open
    if (selectedCandidate && selectedCandidate.id === candidateId) {
      setSelectedCandidate(prev => prev ? {
        ...prev,
        stage: nextStage,
        status: nextStage === 'hired' ? 'hired' : nextStage === 'rejected' ? 'rejected' : 'active'
      } : null);
    }
  };

  // Update candidate complete object (rating, notes, evaluations, interviews)
  const handleUpdateCandidate = (updated: Candidate) => {
    setCandidates(prev => prev.map(c => c.id === updated.id ? updated : c));
    setSelectedCandidate(updated);
    showToast(`Candidate profile for ${updated.fullName} updated.`);
  };

  // Save new job requisition
  const handleSaveJob = (newJob: JobOpening) => {
    setJobs(prev => [newJob, ...prev]);
    showToast(`Published new requisition "${newJob.title}".`);
  };

  // Update job status
  const handleUpdateJobStatus = (jobId: string, newStatus: JobStatus) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: newStatus } : j));
    showToast(`Job status updated to "${newStatus}".`);
  };

  // Delete job
  const handleDeleteJob = (jobId: string) => {
    setJobs(prev => prev.filter(j => j.id !== jobId));
    showToast(`Job requisition deleted.`);
  };

  // Save new candidate manually
  const handleSaveCandidate = (newCand: Candidate) => {
    setCandidates(prev => [newCand, ...prev]);
    showToast(`Added ${newCand.fullName} to candidate pipeline.`);
  };

  // Applicant applies via Careers Portal
  const handleApplyForJob = (newCand: Candidate) => {
    setCandidates(prev => [newCand, ...prev]);
    showToast(`New application received for ${newCand.fullName}! Added to "Applied" queue.`);
  };

  // Update interview status
  const handleUpdateInterviewStatus = (
    candidateId: string, 
    interviewId: string, 
    status: 'scheduled' | 'completed' | 'cancelled'
  ) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        return {
          ...c,
          interviews: c.interviews.map(i => i.id === interviewId ? { ...i, status } : i)
        };
      }
      return c;
    }));
    showToast(`Interview marked as ${status}.`);
  };

  // Reset demo data
  const handleResetData = () => {
    if (confirm('Reset recruitment system with fresh demo jobs and candidates?')) {
      const reset = resetDemoData();
      setJobs(reset.jobs);
      setCandidates(reset.candidates);
      setSelectedCandidate(null);
      showToast('Recruitment database reset to sample dataset.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center space-x-2 animate-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        jobs={jobs}
        candidates={candidates}
        onOpenNewJobModal={() => setIsNewJobModalOpen(true)}
        onOpenNewCandidateModal={() => setIsNewCandidateModalOpen(true)}
        onResetData={handleResetData}
      />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'pipeline' && (
          <div className="space-y-4">
            {/* View Mode Switcher: Kanban vs List */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Candidates Recruitment Pipeline
                </h1>
                <p className="text-xs text-slate-500">
                  Track applicants across screening, technical tests, evaluations, and offers.
                </p>
              </div>

              <div className="flex items-center space-x-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                <button
                  type="button"
                  id="view-mode-kanban"
                  onClick={() => setPipelineViewMode('kanban')}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors ${
                    pipelineViewMode === 'kanban'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Kanban Board View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Kanban</span>
                </button>

                <button
                  type="button"
                  id="view-mode-list"
                  onClick={() => setPipelineViewMode('list')}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors ${
                    pipelineViewMode === 'list'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Tabular List View"
                >
                  <List className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Table List</span>
                </button>
              </div>
            </div>

            {/* Render Kanban or List */}
            {pipelineViewMode === 'kanban' ? (
              <PipelineKanban
                candidates={candidates}
                jobs={jobs}
                onSelectCandidate={(cand) => setSelectedCandidate(cand)}
                onUpdateCandidateStage={handleUpdateCandidateStage}
                selectedJobId={selectedJobId}
                setSelectedJobId={setSelectedJobId}
                searchQuery={searchQuery}
                onOpenNewCandidateModal={() => setIsNewCandidateModalOpen(true)}
              />
            ) : (
              <PipelineList
                candidates={candidates}
                jobs={jobs}
                onSelectCandidate={(cand) => setSelectedCandidate(cand)}
                onUpdateCandidateStage={handleUpdateCandidateStage}
                selectedJobId={selectedJobId}
                setSelectedJobId={setSelectedJobId}
                searchQuery={searchQuery}
              />
            )}
          </div>
        )}

        {activeTab === 'jobs' && (
          <JobsManager
            jobs={jobs}
            candidates={candidates}
            onOpenNewJobModal={() => setIsNewJobModalOpen(true)}
            onUpdateJobStatus={handleUpdateJobStatus}
            onSelectJobForPipeline={(jobId) => {
              setSelectedJobId(jobId);
              setActiveTab('pipeline');
            }}
            onViewJobInCareers={(jobId) => {
              setHighlightedCareerJobId(jobId);
              setActiveTab('careers');
            }}
            onDeleteJob={handleDeleteJob}
          />
        )}

        {activeTab === 'interviews' && (
          <InterviewScheduler
            candidates={candidates}
            onSelectCandidate={(cand) => setSelectedCandidate(cand)}
            onUpdateInterviewStatus={handleUpdateInterviewStatus}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView
            candidates={candidates}
            jobs={jobs}
          />
        )}

        {activeTab === 'careers' && (
          <CareersPortal
            jobs={jobs}
            onApplyForJob={handleApplyForJob}
            onBackToATS={() => setActiveTab('pipeline')}
            highlightedJobId={highlightedCareerJobId}
          />
        )}

        {activeTab === 'about' && (
          <AboutSection
            onNavigateToJobs={() => setActiveTab('jobs')}
            onNavigateToCareers={() => setActiveTab('careers')}
          />
        )}

        {activeTab === 'guide' && (
          <UserGuide
            onNavigateTab={setActiveTab}
            onOpenNewJobModal={() => setIsNewJobModalOpen(true)}
            onOpenNewCandidateModal={() => setIsNewCandidateModalOpen(true)}
            onResetData={handleResetData}
          />
        )}
      </main>

      {/* Floating Quick Guide Button */}
      {activeTab !== 'guide' && (
        <button
          id="floating-guide-trigger"
          type="button"
          onClick={() => setActiveTab('guide')}
          className="fixed bottom-6 right-6 z-40 bg-slate-900/95 hover:bg-slate-800 text-amber-400 hover:text-amber-300 border border-amber-500/40 shadow-xl shadow-amber-500/10 px-4 py-2.5 rounded-full flex items-center space-x-2 text-xs font-bold transition-all hover:scale-105 active:scale-95 backdrop-blur-sm group"
          title="Open interactive guide on how to use this recruitment webpage"
        >
          <BookOpen className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>How to Use (Guide)</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
        </button>
      )}

      {/* Site-wide Regional Footer */}
      <Footer
        onNavigateTab={setActiveTab}
        onResetData={handleResetData}
      />

      {/* Candidate Profile Drawer / Modal */}
      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          jobs={jobs}
          onClose={() => setSelectedCandidate(null)}
          onUpdateCandidate={handleUpdateCandidate}
          onAdvanceStage={handleUpdateCandidateStage}
        />
      )}

      {/* Post New Job Requisition Modal */}
      {isNewJobModalOpen && (
        <NewJobModal
          onClose={() => setIsNewJobModalOpen(false)}
          onSaveJob={handleSaveJob}
        />
      )}

      {/* Add New Candidate Manually Modal */}
      {isNewCandidateModalOpen && (
        <NewCandidateModal
          jobs={jobs}
          onClose={() => setIsNewCandidateModalOpen(false)}
          onSaveCandidate={handleSaveCandidate}
        />
      )}
    </div>
  );
}
