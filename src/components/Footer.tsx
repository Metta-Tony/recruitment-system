import React from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Briefcase, 
  Users, 
  Layers,
  ArrowUp,
  BookOpen
} from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: 'pipeline' | 'jobs' | 'interviews' | 'analytics' | 'careers' | 'about' | 'guide') => void;
  onResetData: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onResetData }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Section: Brand + Regional Overview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/80">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                RS
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight block">
                  Recruitment System
                </span>
                <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider block">
                  Enugu &amp; South East Nigeria Talent Hub
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Empowering technology organizations and high-growth startups to discover, evaluate, and hire vetted engineering and product talent from the Coal City and across the South East economic region.
            </p>

            <div className="flex items-center space-x-2 text-[11px] text-slate-300">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Coal City Tech Corridor: <strong>Enugu • Nsukka • Awka • Onitsha</strong></span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              ATS Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab('pipeline')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Candidate Pipeline
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab('jobs')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Job Requisitions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab('interviews')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Interview Agenda
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab('analytics')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Funnel &amp; Analytics
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab('careers')}
                  className="hover:text-indigo-400 text-indigo-400 font-semibold transition-colors flex items-center space-x-1"
                >
                  <span>Public Careers Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab('about')}
                  className="hover:text-indigo-400 text-emerald-400 font-semibold transition-colors flex items-center space-x-1"
                >
                  <span>About &amp; Innovation</span>
                  <Sparkles className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab('guide')}
                  className="hover:text-amber-300 text-amber-400 font-semibold transition-colors flex items-center space-x-1"
                >
                  <span>How to Use (Guide)</span>
                  <BookOpen className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Hubs & Academic Corridor */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Enugu Talent Hubs
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>• Independence Layout</li>
              <li>• GRA (Govt Reserved Area)</li>
              <li>• New Haven Tech District</li>
              <li>• Lion Science Park, UNN</li>
              <li>• IMT Ogui Road Campus</li>
              <li>• ESUT Agi-Nwene Corridor</li>
              <li>• Trans-Ekulu &amp; Abakpa</li>
            </ul>
          </div>

          {/* Contact & Physical Office */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Enugu Operational Base
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>
                  Innovation Tower, Plot 14 Independence Layout, Enugu State, Nigeria
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>talent@enugu-ats.ng</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>+234 (0) 42 255 190 / +234 803 555 0192</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Mon – Fri: 8:00 AM – 6:00 PM WAT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Demo Reset, Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            <span>© 2026 <strong>Recruitment System</strong> — South East Nigeria Regional Tech Talent Network.</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={onResetData}
              className="text-slate-400 hover:text-rose-400 transition-colors"
              title="Reset system to fresh Enugu seed data"
            >
              Reset Demo Dataset
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigateTab('guide')}
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              How to Use (Guide)
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigateTab('about')}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Innovation Whitepaper
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-1 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white flex items-center space-x-1"
              title="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
