import React, { useState } from 'react';
import { Candidate, JobOpening, PipelineStage } from '../types';
import { 
  Star, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar,
  ArrowUpDown
} from 'lucide-react';

interface PipelineListProps {
  candidates: Candidate[];
  jobs: JobOpening[];
  onSelectCandidate: (candidate: Candidate) => void;
  onUpdateCandidateStage: (candidateId: string, nextStage: PipelineStage) => void;
  selectedJobId: string;
  setSelectedJobId: (id: string) => void;
  searchQuery: string;
}

export const PipelineList: React.FC<PipelineListProps> = ({
  candidates,
  jobs,
  onSelectCandidate,
  onUpdateCandidateStage,
  selectedJobId,
  setSelectedJobId,
  searchQuery
}) => {
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'name' | 'exp'>('date');
  const [sortAsc, setSortAsc] = useState(false);

  const filteredCandidates = candidates.filter(candidate => {
    if (selectedJobId !== 'all' && candidate.appliedJobId !== selectedJobId) {
      return false;
    }
    if (stageFilter !== 'all' && candidate.stage !== stageFilter) {
      return false;
    }
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

  // Sorting
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    let comp = 0;
    if (sortBy === 'date') comp = new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
    else if (sortBy === 'rating') comp = b.rating - a.rating;
    else if (sortBy === 'name') comp = a.fullName.localeCompare(b.fullName);
    else if (sortBy === 'exp') comp = b.yearsExperience - a.yearsExperience;
    return sortAsc ? -comp : comp;
  });

  const getJobTitle = (jobId: string) => {
    return jobs.find(j => j.id === jobId)?.title || 'General';
  };

  const toggleSort = (field: 'date' | 'rating' | 'name' | 'exp') => {
    if (sortBy === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg px-3 py-1.5 focus:outline-none"
          >
            <option value="all">All Jobs ({jobs.length} Openings)</option>
            {jobs.map(job => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg px-3 py-1.5 focus:outline-none"
          >
            <option value="all">All Stages</option>
            <option value="applied">Applied</option>
            <option value="screening">Screening</option>
            <option value="technical">Technical</option>
            <option value="interview">Final Interview</option>
            <option value="offer">Offer</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
          </select>

          <span className="text-xs text-slate-500">
            {sortedCandidates.length} candidate{sortedCandidates.length !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-[11px] uppercase tracking-wider font-bold text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th 
                  className="px-4 py-3 cursor-pointer hover:text-indigo-600"
                  onClick={() => toggleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Candidate Name</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3">Applied Requisition</th>
                <th className="px-4 py-3">Stage</th>
                <th 
                  className="px-4 py-3 cursor-pointer hover:text-indigo-600"
                  onClick={() => toggleSort('rating')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Rating</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 cursor-pointer hover:text-indigo-600"
                  onClick={() => toggleSort('exp')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Experience</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 cursor-pointer hover:text-indigo-600"
                  onClick={() => toggleSort('date')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Applied Date</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {sortedCandidates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    No candidates found for selected criteria.
                  </td>
                </tr>
              ) : (
                sortedCandidates.map((c) => {
                  const initials = c.fullName.split(' ').map(n => n[0]).join('').slice(0, 2);

                  return (
                    <tr
                      key={c.id}
                      onClick={() => onSelectCandidate(c)}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-slate-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                            {initials}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white hover:text-indigo-600">
                              {c.fullName}
                            </div>
                            <div className="text-[11px] text-slate-500 font-normal">
                              {c.email} • {c.location}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {getJobTitle(c.appliedJobId)}
                        </span>
                        <span className="block text-[10px] text-slate-400">
                          Current: {c.currentRole}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider capitalize border ${
                          c.stage === 'hired'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                            : c.stage === 'rejected'
                            ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800'
                            : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-800'
                        }`}>
                          {c.stage}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-slate-900 dark:text-white">{c.rating}</span>
                          <span className="text-[10px] text-slate-400">/5</span>
                        </div>
                      </td>

                      <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">
                        {c.yearsExperience} yrs
                      </td>

                      <td className="px-4 py-3 text-slate-500">
                        {c.appliedDate}
                      </td>

                      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => onSelectCandidate(c)}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition-colors"
                        >
                          Profile & CV
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
