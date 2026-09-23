import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Building2, 
  GraduationCap, 
  Zap, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Award,
  Globe2,
  CheckCircle2,
  ArrowRight,
  Briefcase
} from 'lucide-react';

interface AboutSectionProps {
  onNavigateToJobs: () => void;
  onNavigateToCareers: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onNavigateToJobs,
  onNavigateToCareers
}) => {
  const [activeTab, setActiveTab] = useState<'innovation' | 'ecosystem' | 'pillars' | 'locations'>('innovation');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero / Vision Statement */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 border border-indigo-900/40 p-8 sm:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/20 border border-indigo-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-300">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Enugu • South East Nigeria Tech Capital</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            The Innovation Driving the Coal City Talent Revolution
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Born out of Enugu, our recruitment system pioneers an end-to-end talent verification and pipeline engine designed specifically for South East Nigeria. We bridge the region&apos;s exceptional engineering, product, and leadership talent with high-impact domestic enterprises and global remote employers.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onNavigateToCareers}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore Open Positions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onNavigateToJobs}
              className="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all"
            >
              <span>Manage Hiring Requisitions</span>
            </button>
          </div>
        </div>

        {/* Quick Regional Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-800/80 text-left">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-400">15,000+</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Annual STEM Graduates in South East</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">7 Premier</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Tertiary Tech Hubs & Universities</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">99.4%</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Vetted Skill Verification Standard</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-purple-400">WAT (UTC+1)</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Prime Alignment for Global Work</div>
          </div>
        </div>
      </div>

      {/* Navigation Pills for Innovation Sub-Topics */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('innovation')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            activeTab === 'innovation'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>The Core Innovation</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ecosystem')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            activeTab === 'ecosystem'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Enugu Academic & Tech Corridor</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pillars')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            activeTab === 'pillars'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>4-Pillar Evaluation Standard</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('locations')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            activeTab === 'locations'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Key Hubs in Enugu</span>
        </button>
      </div>

      {/* Tab 1: The Core Innovation */}
      {activeTab === 'innovation' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  1. Reverse Brain-Drain Model
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  For decades, brilliant engineers and creators in Enugu were forced to migrate to Lagos or overseas. Our recruitment platform enables top developers in Independence Layout, GRA, and New Haven to secure competitive salaries (₦8M–₦25M+ or USD index) and work remotely or hybrid while living in the Coal City.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Lower cost of living, higher net quality of life</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  2. Merit-First Skill Verification
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Instead of static resume keywords, our integrated scorecard evaluates candidates across live architectural challenges, asynchronous code reviews, and low-bandwidth resilience. Employers get trustworthy competency ratings validated by regional engineering leaders.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero guesswork in hiring technical staff</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  3. Unified Currency & Infrastructure
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Recruiters seamlessly manage compensation in both Nigerian Naira (NGN) and foreign currencies. Every role includes verified remote work prerequisites: dedicated solar inverter power grants and redundant 4G/fiber connectivity.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-purple-600 dark:text-purple-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Uninterrupted 99.9% remote work uptime</span>
              </div>
            </div>
          </div>

          {/* Deep Dive Box */}
          <div className="bg-slate-100 dark:bg-slate-900/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Why Enugu? The South East Tech Advantage</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Enugu is uniquely positioned as the historic intellectual capital of Eastern Nigeria. With tranquil residential layouts like Independence Layout and GRA, serene climate, absence of debilitating traffic, and close proximity to major commercial cities like Onitsha and Aba, tech professionals in Enugu enjoy deep focus, intellectual community, and creative stamina. Our recruitment platform turns this regional advantage into measurable hiring success.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Ecosystem & Universities */}
      {activeTab === 'ecosystem' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              The Academic Pipeline Powering Our Talent Pool
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Our candidates graduate from premier institutions across Enugu State and neighboring South East hubs, combining rigorous theoretical grounding in mathematics and computer engineering with practical software craftsmanship:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <div className="font-bold text-slate-900 dark:text-white text-xs mb-1">
                  University of Nigeria, Nsukka (UNN)
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Home to Lion Science Park, Roar Nigeria Incubator, and Nigeria&apos;s pioneering Computer Science departments.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <div className="font-bold text-slate-900 dark:text-white text-xs mb-1">
                  UNEC (UNN Enugu Campus)
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Faculty of Business Administration, Law, and Medical Sciences fueling fintech, healthtech, and legal tech leadership.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <div className="font-bold text-slate-900 dark:text-white text-xs mb-1">
                  Institute of Management & Tech (IMT)
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Legendary polytechnic along Ogui Road nurturing practical software developers, UI designers, and systems architects.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <div className="font-bold text-slate-900 dark:text-white text-xs mb-1">
                  ESUT (Enugu State Univ of Sci & Tech)
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Agi-Nwene engineering faculties producing cloud engineers, network architects, and cybersecurity specialists.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <div className="font-bold text-slate-900 dark:text-white text-xs mb-1">
                  Godfrey Okoye University (GOUNI)
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Thinkers Corner tech innovators and DNA learning centers driving bioinformatics and modern web technologies.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <div className="font-bold text-slate-900 dark:text-white text-xs mb-1">
                  Caritas University, Amorji-Nike
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Emerging computer science cohort specializing in full stack web development, databases, and responsive design.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: The 4-Pillar Evaluation Standard */}
      {activeTab === 'pillars' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Standardized 4-Pillar Candidate Scorecard
            </h3>
            <p className="text-xs text-slate-500">
              Every applicant in our system is systematically evaluated on a 1–5 rubric across four objective dimensions:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20">
              <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs mb-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</span>
                <span>Technical Architecture & Code Craft</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                Code readability, modularity, defensive error handling, test coverage, and mastery of modern stacks (TypeScript, React, Node, Go, Kubernetes).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20">
              <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs mb-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">2</span>
                <span>Real-World Systems Problem Solving</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                Ability to diagnose edge cases, design offline-tolerant microservices, optimize database queries, and architect systems for low-bandwidth environments.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/20">
              <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-400 font-bold text-xs mb-1.5">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">3</span>
                <span>Asynchronous Cross-Border Communication</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                Clear documentation, articulate sprint communications, structured pull request descriptions, and proactive stakeholder coordination across timezones.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20">
              <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-bold text-xs mb-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">4</span>
                <span>Work Ethic & Culture Fit</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                Intellectual humility, receptiveness to constructive code feedback, drive for mentorship, and commitment to collective team outcomes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Locations in Enugu */}
      {activeTab === 'locations' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Our Primary Operational Hubs & Neighborhoods in Enugu
            </h3>
            <p className="text-xs text-slate-500">
              All our hiring requisitions and candidate pods are mapped to key technology and residential nodes in the Coal City:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>Independence Layout</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                The executive and diplomatic core of Enugu, home to state ministries, modern coworking hubs, and fiber-connected tech spaces.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>Government Reserved Area (GRA)</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Quiet, leafy neighborhood housing prominent technology labs, regional corporate headquarters, and high-speed broadband.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>New Haven</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Lively commercial district with coffee shops, creative agencies, design studios, and vibrant young engineer communities.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>Lion Science Park, UNN / Nsukka</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                The research and innovation engine of the University of Nigeria, producing breakthrough deep-tech and hardware experiments.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>IMT / Ogui Road Tech Hub</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                High-density digital skill hub adjacent to the Institute of Management and Technology and commercial markets.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>Trans-Ekulu & Abakpa Nike</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Expansive residential hubs housing thousands of junior and mid-level software engineers working remotely for global teams.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
