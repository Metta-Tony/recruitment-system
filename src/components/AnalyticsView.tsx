import React from 'react';
import { Candidate, JobOpening, PipelineStage } from '../types';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock, 
  Briefcase, 
  Award, 
  Star 
} from 'lucide-react';

interface AnalyticsViewProps {
  candidates: Candidate[];
  jobs: JobOpening[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  candidates,
  jobs
}) => {
  const totalApplicants = candidates.length;
  const hiredCount = candidates.filter(c => c.stage === 'hired' || c.status === 'hired').length;
  const activePipeline = candidates.filter(c => c.status === 'active' && c.stage !== 'hired').length;
  const rejectedCount = candidates.filter(c => c.status === 'rejected' || c.stage === 'rejected').length;

  // Funnel counts
  const stageCounts: { stage: PipelineStage; label: string; count: number }[] = [
    { stage: 'applied', label: '1. Applied (Inbox)', count: candidates.filter(c => ['applied', 'screening', 'technical', 'interview', 'offer', 'hired'].includes(c.stage)).length },
    { stage: 'screening', label: '2. Screening Passed', count: candidates.filter(c => ['screening', 'technical', 'interview', 'offer', 'hired'].includes(c.stage)).length },
    { stage: 'technical', label: '3. Technical Round', count: candidates.filter(c => ['technical', 'interview', 'offer', 'hired'].includes(c.stage)).length },
    { stage: 'interview', label: '4. Cultural / Final', count: candidates.filter(c => ['interview', 'offer', 'hired'].includes(c.stage)).length },
    { stage: 'offer', label: '5. Offer Extended', count: candidates.filter(c => ['offer', 'hired'].includes(c.stage)).length },
    { stage: 'hired', label: '6. Offers Accepted & Hired', count: hiredCount }
  ];

  // Department distribution
  const deptMap: { [key: string]: number } = {};
  jobs.forEach(j => {
    deptMap[j.department] = (deptMap[j.department] || 0) + 1;
  });

  // Calculate average rating
  const avgRating = totalApplicants > 0
    ? (candidates.reduce((acc, c) => acc + c.rating, 0) / totalApplicants).toFixed(1)
    : '0';

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase text-slate-500">Total Pipeline Volume</span>
            <Users className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {totalApplicants}
          </div>
          <p className="text-xs text-slate-500 mt-1">Across {jobs.length} active requisitions</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase text-slate-500">Offer Acceptance Rate</span>
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            94.2%
          </div>
          <p className="text-xs text-slate-500 mt-1">{hiredCount} confirmed hires this cycle</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase text-slate-500">Avg Time-to-Hire</span>
            <Clock className="w-5 h-5 text-sky-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            18.5 Days
          </div>
          <p className="text-xs text-slate-500 mt-1">-3 days compared to industry benchmark</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase text-slate-500">Candidate Quality Score</span>
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-1">
            <span>{avgRating}</span>
            <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Based on rubric scorecard evaluations</p>
        </div>
      </div>

      {/* Recruitment Funnel Visual */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            <span>Recruitment Conversion Funnel</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Step-by-step conversion from application submission to signed offer.
          </p>
        </div>

        <div className="space-y-3">
          {stageCounts.map((st, idx) => {
            const max = totalApplicants || 1;
            const percentage = Math.round((st.count / max) * 100);

            return (
              <div key={st.stage} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{st.label}</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {st.count} candidates ({percentage}%)
                  </span>
                </div>
                
                {/* Visual Bar */}
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      idx === stageCounts.length - 1
                        ? 'bg-emerald-500'
                        : idx === stageCounts.length - 2
                        ? 'bg-teal-500'
                        : 'bg-indigo-600'
                    }`}
                    style={{ width: `${Math.max(percentage, 5)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Department & Channel Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-indigo-500" />
            <span>Openings by Department</span>
          </h3>

          <div className="space-y-3">
            {Object.entries(deptMap).map(([dept, count]) => (
              <div key={dept} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{dept}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400">
                  {count} role{count > 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Top Candidate Competencies</span>
          </h3>

          <div className="flex flex-wrap gap-2">
            {['TypeScript', 'React 19', 'Figma', 'Kubernetes', 'Python', 'Node.js', 'AWS', 'Design Systems', 'SQL', 'GraphQL'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            <p>
              Candidate data is stored locally in your browser session. Requisitions and applicant evaluations update these funnel statistics in real time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
