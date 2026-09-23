export type PipelineStage =
  | 'applied'
  | 'screening'
  | 'technical'
  | 'interview'
  | 'offer'
  | 'hired'
  | 'rejected';

export type JobStatus = 'published' | 'draft' | 'closed' | 'paused';

export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

export type WorkplaceType = 'Remote' | 'Hybrid' | 'On-site';

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  workplaceType: WorkplaceType;
  type: EmploymentType;
  experienceLevel: 'Entry' | 'Mid-Level' | 'Senior' | 'Lead' | 'Director';
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  status: JobStatus;
  postedDate: string;
  hiringManager: string;
}

export interface CandidateNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface CandidateEvaluation {
  id: string;
  reviewer: string;
  stage: PipelineStage;
  technicalSkill: number; // 1-5
  communication: number; // 1-5
  cultureFit: number; // 1-5
  problemSolving: number; // 1-5
  recommendation: 'strong_hire' | 'hire' | 'neutral' | 'no_hire' | 'strong_no_hire';
  comments: string;
  createdAt: string;
}

export interface InterviewSchedule {
  id: string;
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  stage: PipelineStage;
  date: string;
  time: string;
  durationMinutes: number;
  interviewer: string;
  meetingType: 'video' | 'phone' | 'onsite';
  meetingLink?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface WorkHistory {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  currentRole: string;
  currentCompany: string;
  yearsExperience: number;
  appliedJobId: string;
  appliedDate: string;
  stage: PipelineStage;
  rating: number; // 1-5 overall
  status: 'active' | 'hired' | 'rejected';
  summary: string;
  resumeFileName?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  skills: string[];
  workHistory: WorkHistory[];
  education: Education[];
  notes: CandidateNote[];
  evaluations: CandidateEvaluation[];
  interviews: InterviewSchedule[];
}
