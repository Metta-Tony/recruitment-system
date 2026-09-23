import React, { useState } from 'react';
import { 
  JobOpening, 
  Candidate, 
  JobStatus 
} from '../types';
import { formatSalaryRange } from '../utils/formatters';
import { 
  Briefcase, 
  Plus, 
  Users, 
  MapPin, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  PauseCircle, 
  XCircle, 
  ExternalLink,
  ChevronRight,
  Building,
  Trash2
} from 'lucide-react';

interface JobsManagerProps {
  jobs: JobOpening[];
  candidates: Candidate[];
  onOpenNewJobModal: () => void;
  onUpdateJobStatus: (jobId: string, newStatus: JobStatus) => void;
  onSelectJobForPipeline: (jobId: string) => void;
  onViewJobInCareers: (jobId: string) => void;
  onDeleteJob: (jobId: string) => void;
}

export const JobsManager: React.FC<JobsManagerProps> = ({
  jobs,
  candidates,
  onOpenNewJobModal,
  onUpdateJobStatus,
  onSelectJobForPipeline,
  onViewJobInCareers,
  onDeleteJob
}) => {
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const departments = Array.from(new Set(jobs.map(j => j.department)));

  const filteredJobs = jobs.filter(job => {
    if (filterDepartment !== 'all' && job.department !== filterDepartment) return false;
    if (filterStatus !== 'all' && job.status !== filterStatus) return false;
    return true;
  });

  const getCandidateCountForJob = (jobId: string) => {
    const jobCandidates = candidates.filter(c => c.appliedJobId === jobId);
    const active = jobCandidates.filter(c => c.status === 'active').length;
    const hired = jobCandidates.filter(c => c.stage === 'hired').length;
    return { total: jobCandidates.length, active, hired };
  };

  return (
    <div className="space-y-6">
      {/* Top action & filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Job Requisitions & Headcount ({jobs.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage open corporate postings, requisition parameters, and applicant volumes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Department Filter */}
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published / Active</option>
            <option value="paused">Paused</option>
            <option value="closed">Closed</option>
            <option value="draft">Draft</option>
          </select>

          <button
            type="button"
            onClick={onOpenNewJobModal}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Requisition</span>
          </button>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job) => {
          const stats = getCandidateCountForJob(job.id);

          return (
            <div
              key={job.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Title + Status */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">
                      {job.department}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      {job.title}
                    </h3>
                  </div>

                  {/* Status indicator & dropdown */}
                  <select
                    value={job.status}
                    onChange={(e) => onUpdateJobStatus(job.id, e.target.value as JobStatus)}
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none capitalize ${
                      job.status === 'published'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                        : job.status === 'paused'
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <option value="published">Active</option>
                    <option value="paused">Paused</option>
                    <option value="closed">Closed</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
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

                {/* Brief description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  {job.description}
                </p>

                {/* Requirements Pills */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {job.requirements.slice(0, 2).map((req, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded truncate max-w-[240px]"
                    >
                      {req}
                    </span>
                  ))}
                  {job.requirements.length > 2 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{job.requirements.length - 2} more
                    </span>
                  )}
                </div>

                {/* Candidates Stats Card */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-center mb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">Total Applicants</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{stats.total}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">Active Pipeline</span>
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{stats.active}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">Hires Made</span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{stats.hired}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => onViewJobInCareers(job.id)}
                    className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center space-x-1"
                    title="Preview on Public Careers Board"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Public View</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete the job requisition "${job.title}"?`)) {
                        onDeleteJob(job.id);
                      }
                    }}
                    className="text-xs text-rose-500 hover:text-rose-700 p-1 rounded"
                    title="Delete Job"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectJobForPipeline(job.id)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center space-x-1"
                >
                  <span>View Pipeline ({stats.total})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
