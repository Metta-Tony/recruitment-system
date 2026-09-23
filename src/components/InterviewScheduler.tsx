import React, { useState } from 'react';
import { Candidate, InterviewSchedule } from '../types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  User, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface InterviewSchedulerProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
  onUpdateInterviewStatus: (candidateId: string, interviewId: string, status: 'scheduled' | 'completed' | 'cancelled') => void;
}

export const InterviewScheduler: React.FC<InterviewSchedulerProps> = ({
  candidates,
  onSelectCandidate,
  onUpdateInterviewStatus
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Flatten all interviews across all candidates
  const allInterviews: (InterviewSchedule & { candidate: Candidate })[] = candidates.flatMap(c => 
    (c.interviews || []).map(int => ({
      ...int,
      candidate: c
    }))
  );

  // Sort by date/time ascending
  const sortedInterviews = [...allInterviews].sort((a, b) => {
    return new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime();
  });

  const filtered = sortedInterviews.filter(i => {
    if (filterStatus !== 'all' && i.status !== filterStatus) return false;
    return true;
  });

  const scheduledCount = allInterviews.filter(i => i.status === 'scheduled').length;
  const completedCount = allInterviews.filter(i => i.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Interview Coordination & Agenda ({allInterviews.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time schedule of technical rounds, panel reviews, and hiring manager syncs.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="all">All ({allInterviews.length})</option>
            <option value="scheduled">Upcoming Scheduled ({scheduledCount})</option>
            <option value="completed">Completed ({completedCount})</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Agenda List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <CalendarIcon className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">No interviews match current filters</h3>
          <p className="text-xs text-slate-500 mt-1">Select a candidate in the pipeline to schedule an interview.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const isUpcoming = item.status === 'scheduled';

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Date / Time + Candidate details */}
                <div className="flex items-start space-x-4">
                  {/* Date Badge */}
                  <div className="w-14 h-14 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex flex-col items-center justify-center text-center shrink-0">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                      {new Date(item.date).toLocaleString('default', { month: 'short' })}
                    </span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                      {new Date(item.date).getDate()}
                    </span>
                  </div>

                  {/* Details */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 
                        onClick={() => onSelectCandidate(item.candidate)}
                        className="text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-600 cursor-pointer flex items-center space-x-1"
                      >
                        <span>{item.candidateName}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </h4>

                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold capitalize ${
                        item.status === 'scheduled'
                          ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800'
                          : item.status === 'completed'
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-0.5">
                      Role: <strong className="text-slate-700 dark:text-slate-300">{item.jobTitle}</strong> • Stage: <span className="capitalize">{item.stage}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {item.time} ({item.durationMinutes} mins)
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <User className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        Interviewer: {item.interviewer}
                      </span>
                      <span>•</span>
                      <span className="flex items-center capitalize">
                        {item.meetingType === 'video' ? <Video className="w-3.5 h-3.5 mr-1 text-indigo-500" /> : <Phone className="w-3.5 h-3.5 mr-1 text-amber-500" />}
                        {item.meetingType}
                      </span>
                    </div>

                    {item.notes && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg italic">
                        {item.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center space-x-2 self-end md:self-auto">
                  {item.meetingLink && (
                    <a
                      href={item.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center space-x-1 transition-colors"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Call</span>
                    </a>
                  )}

                  {isUpcoming && (
                    <button
                      type="button"
                      onClick={() => onUpdateInterviewStatus(item.candidateId, item.id, 'completed')}
                      className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Done</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onSelectCandidate(item.candidate)}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Scorecard & CV
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
