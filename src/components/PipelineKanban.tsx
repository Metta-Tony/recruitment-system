import React, { useState } from 'react';
import { 
  Candidate, 
  JobOpening, 
  PipelineStage 
} from '../types';
import { 
  ChevronRight, 
  Star, 
  Briefcase, 
  MapPin, 
  Calendar, 
  UserX, 
  CheckCircle,
  Clock,
  Filter,
  Eye,
  ArrowRight
} from 'lucide-react';

interface PipelineKanbanProps {
  candidates: Candidate[];
  jobs: JobOpening[];
  onSelectCandidate: (candidate: Candidate) => void;
  onUpdateCandidateStage: (candidateId: string, nextStage: PipelineStage) => void;
  selectedJobId: string;
  setSelectedJobId: (id: string) => void;
  searchQuery: string;
  onOpenNewCandidateModal: () => void;
}

const STAGES: { id: PipelineStage; label: string; color: string; bg: string; border: string }[] = [
  { id: 'applied', label: 'Applied', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  { id: 'screening', label: 'Screening', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  { id: 'technical', label: 'Technical', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  { id: 'interview', label: 'Cultural / Final', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
  { id: 'offer', label: 'Offer Stage', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  { id: 'hired', label: 'Hired', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/30' }
];

export const PipelineKanban: React.FC<PipelineKanbanProps> = ({
  candidates,
  jobs,
  onSelectCandidate,
  onUpdateCandidateStage,
  selectedJobId,
  setSelectedJobId,
  searchQuery,
  onOpenNewCandidateModal
}) => {
  const [showRejected, setShowRejected] = useState(false);
  const [draggedCandidateId, setDraggedCandidateId] = useState<string | null>(null);

  // Filter candidates based on selected job and search query
  const filteredCandidates = candidates.filter(candidate => {
    // Job filter
    if (selectedJobId !== 'all' && candidate.appliedJobId !== selectedJobId) {
      return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const job = jobs.find(j => j.id === candidate.appliedJobId);
      const matchesName = candidate.fullName.toLowerCase().includes(q);
      const matchesEmail = candidate.email.toLowerCase().includes(q);
      const matchesRole = candidate.currentRole.toLowerCase().includes(q);
      const matchesJob = job?.title.toLowerCase().includes(q);
      const matchesSkill = candidate.skills.some(s => s.toLowerCase().includes(q));
      if (!matchesName && !matchesEmail && !matchesRole && !matchesJob && !matchesSkill) {
        return false;
      }
    }

    return true;
  });

  const rejectedCandidates = filteredCandidates.filter(c => c.stage === 'rejected' || c.status === 'rejected');

  const getJobTitle = (jobId: string) => {
    return jobs.find(j => j.id === jobId)?.title || 'General Application';
  };

  const getNextStage = (current: PipelineStage): PipelineStage | null => {
    switch (current) {
      case 'applied': return 'screening';
      case 'screening': return 'technical';
      case 'technical': return 'interview';
      case 'interview': return 'offer';
      case 'offer': return 'hired';
      default: return null;
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggedCandidateId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: PipelineStage) => {
    e.preventDefault();
    const candidateId = e.dataTransfer.getData('text/plain') || draggedCandidateId;
    if (candidateId) {
      onUpdateCandidateStage(candidateId, targetStage);
    }
    setDraggedCandidateId(null);
  };

  return (
    <div className="space-y-4">
      {/* Kanban Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Job Requisition:</span>
          </div>

          <select
            id="kanban-job-filter"
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="all">All Jobs ({jobs.length} Openings)</option>
            {jobs.map(job => (
              <option key={job.id} value={job.id}>
                {job.title} ({job.department})
              </option>
            ))}
          </select>

          <span className="text-xs text-slate-400 hidden md:inline">|</span>

          <span className="text-xs text-slate-500 dark:text-slate-400">
            Showing <strong className="text-slate-900 dark:text-white">{filteredCandidates.length}</strong> candidates
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            id="toggle-rejected-candidates-btn"
            type="button"
            onClick={() => setShowRejected(!showRejected)}
            className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors flex items-center space-x-1.5 ${
              showRejected
                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <UserX className="w-3.5 h-3.5" />
            <span>Rejected Pool ({rejectedCandidates.length})</span>
          </button>
        </div>
      </div>

      {/* Rejected candidates section if toggled */}
      {showRejected && (
        <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-xl p-4 transition-all">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 flex items-center space-x-2">
              <UserX className="w-4 h-4" />
              <span>Archived / Rejected Candidates ({rejectedCandidates.length})</span>
            </h3>
            <span className="text-xs text-rose-600 dark:text-rose-400">
              Candidates can be restored by dragging to any active stage or using the candidate profile.
            </span>
          </div>
          {rejectedCandidates.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 italic">No candidates in the rejected pool.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {rejectedCandidates.map(c => (
                <div
                  key={c.id}
                  onClick={() => onSelectCandidate(c)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 cursor-pointer hover:border-slate-400 dark:hover:border-slate-600 transition-shadow shadow-xs flex items-start justify-between"
                >
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">{c.fullName}</h4>
                    <p className="text-[11px] text-slate-500">{getJobTitle(c.appliedJobId)}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Applied: {c.appliedDate}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateCandidateStage(c.id, 'screening');
                    }}
                    className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
                  >
                    Restore to Screen
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 items-start">
        {STAGES.map((stage) => {
          const stageCandidates = filteredCandidates.filter(
            c => c.stage === stage.id && c.status !== 'rejected'
          );

          return (
            <div
              key={stage.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
              className="bg-slate-100 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col min-h-[540px] max-h-[calc(100vh-250px)]"
            >
              {/* Column Header */}
              <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/90 rounded-t-xl sticky top-0 z-10">
                <div className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${stage.bg} ${stage.border} border`} />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {stage.label}
                  </span>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${stage.bg} ${stage.color} border ${stage.border}`}>
                  {stageCandidates.length}
                </span>
              </div>

              {/* Column Body / Candidate Cards */}
              <div className="p-2 space-y-2.5 overflow-y-auto flex-1">
                {stageCandidates.length === 0 ? (
                  <div className="text-center py-10 px-2">
                    <p className="text-xs text-slate-400 dark:text-slate-500">Drop candidate here</p>
                  </div>
                ) : (
                  stageCandidates.map((candidate) => {
                    const nextStage = getNextStage(candidate.stage);
                    const jobTitle = getJobTitle(candidate.appliedJobId);
                    const initials = candidate.fullName
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2);

                    const hasScheduledInterview = (candidate.interviews || []).some(
                      i => i.status === 'scheduled'
                    );

                    return (
                      <div
                        key={candidate.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, candidate.id)}
                        onClick={() => onSelectCandidate(candidate)}
                        id={`candidate-card-${candidate.id}`}
                        className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-800/90 shadow-xs hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500 transition-all cursor-pointer group relative"
                      >
                        {/* Header: Name + Rating */}
                        <div className="flex items-start justify-between gap-1 mb-1.5">
                          <div className="flex items-center space-x-2 min-w-0">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-slate-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                              {initials}
                            </div>
                            <div className="truncate">
                              <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                                {candidate.fullName}
                              </h4>
                              <p className="text-[10px] text-slate-500 truncate">{candidate.currentRole}</p>
                            </div>
                          </div>

                          {/* Rating Stars */}
                          <div className="flex items-center space-x-0.5 shrink-0">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                              {candidate.rating}
                            </span>
                          </div>
                        </div>

                        {/* Applied Job Badge */}
                        <div className="mt-2 mb-2">
                          <span className="inline-flex items-center text-[10px] font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md truncate max-w-full">
                            <Briefcase className="w-2.5 h-2.5 mr-1 text-slate-400 shrink-0" />
                            <span className="truncate">{jobTitle}</span>
                          </span>
                        </div>

                        {/* Skills Chips */}
                        <div className="flex flex-wrap gap-1 mb-2.5">
                          {candidate.skills.slice(0, 3).map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                          {candidate.skills.length > 3 && (
                            <span className="text-[9px] text-slate-400 self-center">
                              +{candidate.skills.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Interview notice badge */}
                        {hasScheduledInterview && (
                          <div className="mb-2 flex items-center text-[10px] text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 px-2 py-0.5 rounded">
                            <Clock className="w-2.5 h-2.5 mr-1" />
                            <span>Interview Scheduled</span>
                          </div>
                        )}

                        {/* Footer & Quick Stage Advance Action */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                          <span className="flex items-center">
                            <Calendar className="w-2.5 h-2.5 mr-1 text-slate-400" />
                            {candidate.appliedDate}
                          </span>

                          <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                            {nextStage && (
                              <button
                                type="button"
                                title={`Advance to ${nextStage}`}
                                onClick={() => onUpdateCandidateStage(candidate.id, nextStage)}
                                className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-medium flex items-center space-x-0.5 border border-indigo-200 dark:border-indigo-800 transition-colors"
                              >
                                <span>Advance</span>
                                <ChevronRight className="w-2.5 h-2.5" />
                              </button>
                            )}

                            {candidate.stage === 'offer' && (
                              <button
                                type="button"
                                title="Mark as Hired"
                                onClick={() => onUpdateCandidateStage(candidate.id, 'hired')}
                                className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-600 dark:text-emerald-400 font-medium flex items-center border border-emerald-200 dark:border-emerald-800 transition-colors"
                              >
                                <CheckCircle className="w-2.5 h-2.5 mr-0.5" />
                                <span>Hire</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
