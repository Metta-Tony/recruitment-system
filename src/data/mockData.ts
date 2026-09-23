import { JobOpening, Candidate } from '../types';

export const INITIAL_JOBS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'Enugu, Nigeria (Independence Layout)',
    workplaceType: 'Hybrid',
    type: 'Full-time',
    experienceLevel: 'Senior',
    salaryRange: { min: 14000000, max: 18500000, currency: 'NGN' },
    description: 'Lead web architecture, scalable APIs, and distributed systems from our Enugu innovation center at Independence Layout, powering fintech and logistics solutions across South East Nigeria and global markets.',
    responsibilities: [
      'Architect and build high-performance microservices using TypeScript, Node.js, and PostgreSQL.',
      'Develop reactive, responsive client portals with React and Tailwind CSS optimized for diverse mobile connectivity across West Africa.',
      'Mentor early-career and mid-level software developers from tertiary hubs including UNN, UNEC, and IMT.',
      'Collaborate with regional product leads and remote international engineering pods.'
    ],
    requirements: [
      '5+ years of production full-stack software development experience.',
      'Strong proficiency in TypeScript, React, Node.js, REST/GraphQL APIs, and SQL databases.',
      'Demonstrated experience building offline-first or low-bandwidth tolerant web applications.',
      'Based in or willing to work hybrid in Enugu (Independence Layout hub).'
    ],
    benefits: [
      'Competitive compensation benchmarked to regional and remote tech standards (₦14M - ₦18.5M/yr)',
      'Solar-backed workstation setup and high-speed fiber internet stipend in Enugu',
      'HMO health coverage with leading hospitals across Enugu and South East',
      'Quarterly tech innovation stipend and conference sponsorships'
    ],
    status: 'published',
    postedDate: '2026-09-02',
    hiringManager: 'Nnamdi Eze (VP of Engineering, CoalCity Tech)'
  },
  {
    id: 'job-2',
    title: 'Senior Product Designer (UI/UX)',
    department: 'Design',
    location: 'Enugu, Nigeria (New Haven)',
    workplaceType: 'Remote',
    type: 'Full-time',
    experienceLevel: 'Senior',
    salaryRange: { min: 10500000, max: 15000000, currency: 'NGN' },
    description: 'Spearhead digital experiences, localized design tokens, and user research tailored for commerce, banking, and civic platforms in Enugu and the wider South East economic corridor.',
    responsibilities: [
      'Design accessible, high-conversion mobile and web interfaces in Figma for merchant and consumer platforms.',
      'Conduct field user research and usability testing across markets in Enugu, Onitsha, and Aba.',
      'Establish a unified design system that honors local linguistic clarity and user ergonomics.',
      'Partner closely with frontend engineers to ensure pixel-perfect responsive implementation.'
    ],
    requirements: [
      '4+ years designing high-impact web and mobile products.',
      'Strong portfolio demonstrating system design, micro-interactions, and field research in African markets.',
      'Mastery of Figma, component libraries, and interactive prototyping.',
      'Resident in South East Nigeria (Enugu, Awka, Owerri) or open to remote work within WAT timezone.'
    ],
    benefits: [
      'Flexible remote arrangement with access to our New Haven coworking space',
      'Apple MacBook Pro workstation setup',
      'Comprehensive medical insurance & wellness stipend',
      'Annual team retreat at Nike Lake Resort, Enugu'
    ],
    status: 'published',
    postedDate: '2026-09-05',
    hiringManager: 'Chidera Obi (Head of Product Design)'
  },
  {
    id: 'job-3',
    title: 'DevOps & Cloud Systems Architect',
    department: 'Infrastructure',
    location: 'Enugu, Nigeria (Lion Science Park, UNN/Nsukka)',
    workplaceType: 'Hybrid',
    type: 'Full-time',
    experienceLevel: 'Lead',
    salaryRange: { min: 16000000, max: 22000000, currency: 'NGN' },
    description: 'Drive cloud reliability, Kubernetes clusters, continuous integration, and edge infrastructure connecting enterprise clients across Nigeria and sub-Saharan Africa.',
    responsibilities: [
      'Orchestrate Kubernetes clusters, Docker containers, and automated Terraform infrastructure across AWS and local edge points.',
      'Maintain 99.98% system SLA uptime, zero-trust network boundaries, and automated failover protocols.',
      'Deploy CI/CD pipelines, automated security audits, and canary deployment stages.',
      'Collaborate with tech researchers and university developers at Lion Science Park.'
    ],
    requirements: [
      '6+ years in DevOps, Cloud Engineering, or Site Reliability Engineering (SRE).',
      'Deep hands-on experience with Kubernetes, Docker, Terraform, Prometheus, and AWS/GCP.',
      'Proficiency in Go, Python, or Bash scripting for automated incident response and backups.',
      'Ability to coordinate with our technical operations base at Lion Science Park, Nsukka / Enugu.'
    ],
    benefits: [
      'Top-of-market compensation (₦16M - ₦22M/yr) + equity pool',
      'Uninterrupted solar power backup grant for home office',
      'Comprehensive family HMO coverage in Enugu State',
      'Annual cloud certification sponsorship (AWS/GCP/CKA)'
    ],
    status: 'published',
    postedDate: '2026-09-08',
    hiringManager: 'Dr. Ikenna Mbah (Director of Infrastructure)'
  },
  {
    id: 'job-4',
    title: 'Growth Marketing & Ecosystem Lead',
    department: 'Marketing',
    location: 'Enugu, Nigeria (GRA / Opara Avenue)',
    workplaceType: 'On-site',
    type: 'Full-time',
    experienceLevel: 'Lead',
    salaryRange: { min: 9000000, max: 13500000, currency: 'NGN' },
    description: 'Lead digital acquisition, partner alliances, and brand storytelling across the South East business ecosystems (Enugu, Awka, Onitsha, Nnewi, Aba) to drive merchant and developer adoption.',
    responsibilities: [
      'Drive performance marketing, SEO, paid social, and community activations across South East Nigeria.',
      'Build strategic partnerships with university incubators, chamber of commerce, and youth technology collectives.',
      'Analyze growth funnels, customer acquisition costs (CAC), and merchant lifetime value with SQL and Google Analytics.',
      'Host quarterly tech meetups and hackathons at our GRA Enugu office.'
    ],
    requirements: [
      '5+ years leading measurable growth marketing campaigns in Nigeria or West Africa.',
      'Deep fluency with digital acquisition channels, marketing automation, and local trade dynamics.',
      'Exceptional communication, narrative copywriting, and community organizing capabilities.'
    ],
    benefits: [
      'Performance-based quarterly bonuses and transport allowance',
      'Full health insurance and life coverage',
      'Official device allowance & unlimited data bundle'
    ],
    status: 'published',
    postedDate: '2026-09-10',
    hiringManager: 'Adaeze Okoli (VP of Growth & Alliances)'
  },
  {
    id: 'job-5',
    title: 'Junior Front-End Developer',
    department: 'Engineering',
    location: 'Enugu, Nigeria (IMT Tech Corridor / Ogui Road)',
    workplaceType: 'On-site',
    type: 'Full-time',
    experienceLevel: 'Entry',
    salaryRange: { min: 4800000, max: 7200000, currency: 'NGN' },
    description: 'An accelerated opportunity for high-potential graduates from South East tertiary institutions (IMT, UNEC, UNN, ESUT) to build modern web interfaces under the mentorship of senior engineers.',
    responsibilities: [
      'Translate design wireframes into clean, accessible React and Tailwind CSS components.',
      'Write modular TypeScript code and participate in peer code reviews.',
      'Test web features across diverse mobile browsers and network speeds typical in regional Nigeria.'
    ],
    requirements: [
      'Demonstrated competence in HTML5, CSS3, modern JavaScript, and React.',
      'Strong passion for clean design, responsive UI, and continuous learning.',
      'Degree or certificate from a regional institution or recognized bootcamp in South East Nigeria.'
    ],
    benefits: [
      'Structured 1-on-1 mentorship from senior software architects',
      'Fully equipped workstation at our Ogui Road creative tech hub',
      'Catered daily lunch and transit subsidy',
      'Fast-track promotion pathway to Mid-Level engineer'
    ],
    status: 'published',
    postedDate: '2026-09-12',
    hiringManager: 'Nnamdi Eze (VP of Engineering, CoalCity Tech)'
  }
];

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    fullName: 'Chidimma Okonkwo',
    email: 'chidimma.okonkwo@coalcitydev.ng',
    phone: '+234 803 555 1920',
    location: 'Independence Layout, Enugu',
    currentRole: 'Senior React & Node Engineer',
    currentCompany: 'CoalCity Softworks, Enugu',
    yearsExperience: 6,
    appliedJobId: 'job-1',
    appliedDate: '2026-09-12',
    stage: 'technical',
    rating: 5,
    status: 'active',
    summary: 'Senior full-stack engineer based in Independence Layout, Enugu. First-class graduate in Computer Science from UNN. Built high-traffic fintech transaction gateways processing over ₦800M monthly with 99.9% uptime. Specialist in TypeScript, React, and PostgreSQL.',
    resumeFileName: 'chidimma_okonkwo_cv_enugu.pdf',
    portfolioUrl: 'https://chidimma.dev.ng',
    linkedinUrl: 'https://linkedin.com/in/chidimma-okonkwo',
    githubUrl: 'https://github.com/chidimma-enugu',
    skills: ['TypeScript', 'React 19', 'Node.js', 'PostgreSQL', 'GraphQL', 'Tailwind CSS', 'Docker', 'AWS'],
    workHistory: [
      {
        role: 'Senior Software Engineer',
        company: 'CoalCity Softworks, Enugu',
        duration: '2023 - Present',
        description: 'Engineered payment reconciliation microservices and customer portal. Refactored architecture to slash load times by 45% on low-bandwidth 3G connections across Eastern Nigeria.'
      },
      {
        role: 'Full Stack Developer',
        company: 'Eastern Horizon Technologies, Awka / Enugu',
        duration: '2020 - 2023',
        description: 'Developed supply chain dashboards connecting agro-merchants in Enugu with wholesale buyers in Onitsha and Aba.'
      }
    ],
    education: [
      {
        degree: 'B.Sc. in Computer Science (First Class)',
        institution: 'University of Nigeria, Nsukka (UNN)',
        year: '2020'
      }
    ],
    notes: [
      {
        id: 'note-1',
        author: 'Nnamdi Eze (VP of Eng)',
        text: 'Screening went exceptionally well. Strong understanding of distributed state management and offline synchronization. Ready for live coding session.',
        createdAt: '2026-09-13'
      }
    ],
    evaluations: [
      {
        id: 'eval-1',
        reviewer: 'Nnamdi Eze',
        stage: 'screening',
        technicalSkill: 5,
        communication: 5,
        cultureFit: 5,
        problemSolving: 5,
        recommendation: 'strong_hire',
        comments: 'Chidimma represents the top tier of engineering talent in Enugu. Clear communicator with solid architectural depth.',
        createdAt: '2026-09-13'
      }
    ],
    interviews: [
      {
        id: 'int-1',
        candidateId: 'cand-1',
        candidateName: 'Chidimma Okonkwo',
        jobId: 'job-1',
        jobTitle: 'Senior Full Stack Engineer',
        stage: 'technical',
        date: '2026-09-20',
        time: '14:00',
        durationMinutes: 60,
        interviewer: 'Alexandre Dubois & Nnamdi Eze',
        meetingType: 'video',
        meetingLink: 'https://meet.google.com/enugu-rec-tech-01',
        status: 'scheduled',
        notes: 'Live system design and API architecture round.'
      }
    ]
  },
  {
    id: 'cand-2',
    fullName: 'Emeka Nwosu',
    email: 'emeka.design@easternfintech.ng',
    phone: '+234 812 444 3821',
    location: 'New Haven, Enugu',
    currentRole: 'Lead UI/UX Designer',
    currentCompany: 'Eastern Pay Systems, Enugu',
    yearsExperience: 7,
    appliedJobId: 'job-2',
    appliedDate: '2026-09-09',
    stage: 'interview',
    rating: 5,
    status: 'active',
    summary: 'Lead UI/UX Designer operating out of New Haven, Enugu. Deep experience creating design systems, financial interfaces, and merchant POS software used across retail businesses in Enugu, Onitsha, and Aba.',
    resumeFileName: 'emeka_nwosu_portfolio_enugu.pdf',
    portfolioUrl: 'https://emekanwosu.design',
    linkedinUrl: 'https://linkedin.com/in/emeka-nwosu-ux',
    skills: ['Figma', 'Design Systems', 'User Research', 'Mobile UX', 'Design Tokens', 'Accessibility', 'Prototyping'],
    workHistory: [
      {
        role: 'Lead UI/UX Designer',
        company: 'Eastern Pay Systems, Enugu',
        duration: '2022 - Present',
        description: 'Led end-to-end design for regional agency banking app with over 80,000 active kiosks in South East Nigeria. Standardized component libraries.'
      },
      {
        role: 'Product Designer',
        company: 'Zikora Creative Studio, GRA Enugu',
        duration: '2019 - 2022',
        description: 'Designed e-commerce and logistics applications for emerging regional brands.'
      }
    ],
    education: [
      {
        degree: 'Higher National Diploma (HND) in Graphic Design & Digital Media',
        institution: 'Institute of Management and Technology (IMT), Enugu',
        year: '2019'
      }
    ],
    notes: [
      {
        id: 'note-2',
        author: 'Chidera Obi (Head of Design)',
        text: 'Emeka demonstrated fantastic contextual understanding of local market users and design accessibility.',
        createdAt: '2026-09-11'
      }
    ],
    evaluations: [
      {
        id: 'eval-2',
        reviewer: 'Chidera Obi',
        stage: 'technical',
        technicalSkill: 5,
        communication: 5,
        cultureFit: 5,
        problemSolving: 5,
        recommendation: 'strong_hire',
        comments: 'Outstanding design presentation. Emeka understands both visual polish and commercial conversion metrics.',
        createdAt: '2026-09-14'
      }
    ],
    interviews: [
      {
        id: 'int-2',
        candidateId: 'cand-2',
        candidateName: 'Emeka Nwosu',
        jobId: 'job-2',
        jobTitle: 'Senior Product Designer (UI/UX)',
        stage: 'interview',
        date: '2026-09-21',
        time: '11:00',
        durationMinutes: 45,
        interviewer: 'Chidera Obi (Head of Product Design)',
        meetingType: 'video',
        meetingLink: 'https://meet.google.com/enugu-design-final',
        status: 'scheduled',
        notes: 'Final presentation on cross-platform design token architecture.'
      }
    ]
  },
  {
    id: 'cand-3',
    fullName: 'Ifeoma Adeleke',
    email: 'ifeoma.adeleke@lioncloud.ng',
    phone: '+234 806 777 9102',
    location: 'GRA, Enugu',
    currentRole: 'Staff Cloud Infrastructure Architect',
    currentCompany: 'Lion Cloud Networks, Enugu',
    yearsExperience: 8,
    appliedJobId: 'job-3',
    appliedDate: '2026-09-07',
    stage: 'offer',
    rating: 5,
    status: 'active',
    summary: 'Staff Cloud Architect resident in GRA Enugu. Graduate of ESUT. AWS Certified Solutions Architect Professional and CKA with 8 years architecting resilient multi-cloud infrastructures, Terraform pipelines, and Kubernetes clusters.',
    resumeFileName: 'ifeoma_adeleke_cloud_cv.pdf',
    linkedinUrl: 'https://linkedin.com/in/ifeoma-adeleke-devops',
    githubUrl: 'https://github.com/ifeoma-cloud',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'Prometheus', 'Go', 'ArgoCD', 'CI/CD'],
    workHistory: [
      {
        role: 'Staff Infrastructure Architect',
        company: 'Lion Cloud Networks, Enugu',
        duration: '2021 - Present',
        description: 'Maintained zero-downtime infrastructure for enterprise healthcare and banking clients. Reduced cloud infrastructure spend by 35% through spot automation.'
      }
    ],
    education: [
      {
        degree: 'B.Eng. in Computer Engineering',
        institution: 'Enugu State University of Science and Technology (ESUT)',
        year: '2018'
      }
    ],
    notes: [
      {
        id: 'note-3',
        author: 'Dr. Ikenna Mbah',
        text: 'Offer package extended at ₦20,500,000 annual compensation + solar backup stipend. Candidate reviewing agreement.',
        createdAt: '2026-09-15'
      }
    ],
    evaluations: [
      {
        id: 'eval-3',
        reviewer: 'Dr. Ikenna Mbah',
        stage: 'interview',
        technicalSkill: 5,
        communication: 5,
        cultureFit: 5,
        problemSolving: 5,
        recommendation: 'strong_hire',
        comments: 'Unanimous recommendation. Ifeoma is one of the premier cloud engineers in the South East region.',
        createdAt: '2026-09-13'
      }
    ],
    interviews: []
  },
  {
    id: 'cand-4',
    fullName: 'Kenechukwu Ani',
    email: 'kene.ani@zikoramedia.com',
    phone: '+234 814 333 8901',
    location: 'Opara Avenue, Enugu',
    currentRole: 'Growth Marketing Lead',
    currentCompany: 'Zikora Media Labs, Enugu',
    yearsExperience: 5,
    appliedJobId: 'job-4',
    appliedDate: '2026-09-10',
    stage: 'screening',
    rating: 4,
    status: 'active',
    summary: 'Data-driven growth marketer based around Opara Avenue, Enugu. Graduate of UNEC. Scaled regional digital marketing campaigns across Enugu, Anambra, and Imo states, generating over 120,000 qualified commercial leads.',
    resumeFileName: 'kene_ani_growth_enugu.pdf',
    linkedinUrl: 'https://linkedin.com/in/kene-ani-growth',
    skills: ['Performance Marketing', 'SEO', 'SQL', 'Mixpanel', 'Google Ads', 'Content Strategy', 'Partnership Building'],
    workHistory: [
      {
        role: 'Growth Marketing Manager',
        company: 'Zikora Media Labs, Enugu',
        duration: '2022 - Present',
        description: 'Led multi-channel campaigns for financial apps and merchant collectives across South East Nigeria.'
      }
    ],
    education: [
      {
        degree: 'B.Sc. in Economics',
        institution: 'University of Nigeria, Enugu Campus (UNEC)',
        year: '2021'
      }
    ],
    notes: [],
    evaluations: [],
    interviews: [
      {
        id: 'int-3',
        candidateId: 'cand-4',
        candidateName: 'Kenechukwu Ani',
        jobId: 'job-4',
        jobTitle: 'Growth Marketing & Ecosystem Lead',
        stage: 'screening',
        date: '2026-09-22',
        time: '15:30',
        durationMinutes: 30,
        interviewer: 'Adaeze Okoli (VP of Growth)',
        meetingType: 'video',
        meetingLink: 'https://meet.google.com/enugu-growth-screen',
        status: 'scheduled',
        notes: 'Discussion on commercial ecosystem partnerships in South East Nigeria.'
      }
    ]
  },
  {
    id: 'cand-5',
    fullName: 'Amara Okafor',
    email: 'amara.okafor@trans-ekulu.dev',
    phone: '+234 802 111 6543',
    location: 'Trans-Ekulu, Enugu',
    currentRole: 'Junior Frontend Developer',
    currentCompany: 'Coal City Tech Hub Academy',
    yearsExperience: 2,
    appliedJobId: 'job-5',
    appliedDate: '2026-09-13',
    stage: 'applied',
    rating: 4,
    status: 'active',
    summary: 'High-potential junior developer based in Trans-Ekulu, Enugu. Graduate of Caritas University, Amorji-Nike. Passionate about accessible UI, React, modern JavaScript, and responsive mobile interfaces.',
    resumeFileName: 'amara_okafor_cv_enugu.pdf',
    portfolioUrl: 'https://amaraokafor.me',
    githubUrl: 'https://github.com/amara-okafor-enugu',
    skills: ['React', 'JavaScript', 'HTML5', 'Tailwind CSS', 'Vite', 'Git'],
    workHistory: [
      {
        role: 'Frontend Engineering Intern',
        company: 'Coal City Tech Hub Academy, Enugu',
        duration: '2025 - 2026',
        description: 'Built interactive educational web modules and converted responsive designs into clean Tailwind components.'
      }
    ],
    education: [
      {
        degree: 'B.Sc. in Computer Science',
        institution: 'Caritas University, Amorji-Nike, Enugu',
        year: '2025'
      }
    ],
    notes: [
      {
        id: 'note-4',
        author: 'Nnamdi Eze',
        text: 'Very impressive GitHub activity and tidy component breakdown. High potential for the junior cohort.',
        createdAt: '2026-09-14'
      }
    ],
    evaluations: [],
    interviews: []
  },
  {
    id: 'cand-6',
    fullName: 'Somtochukwu Ugwu',
    email: 'somto.ugwu@unnec.ng',
    phone: '+234 803 999 4432',
    location: 'Abakpa Nike, Enugu',
    currentRole: 'Senior Software Engineer',
    currentCompany: 'Quantum Data West Africa',
    yearsExperience: 6,
    appliedJobId: 'job-1',
    appliedDate: '2026-08-29',
    stage: 'hired',
    rating: 5,
    status: 'hired',
    summary: 'Full-stack engineer residing in Abakpa Nike, Enugu. Graduate of UNN Nsukka. Accepted offer for Senior Full Stack Engineer role and joining our Independence Layout team.',
    resumeFileName: 'somto_ugwu_cv_fullstack.pdf',
    linkedinUrl: 'https://linkedin.com/in/somto-ugwu',
    skills: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Redis', 'Docker'],
    workHistory: [
      {
        role: 'Senior Software Engineer',
        company: 'Quantum Data West Africa',
        duration: '2021 - 2026',
        description: 'Engineered event-driven message brokers handling thousands of transactions per minute.'
      }
    ],
    education: [
      {
        degree: 'B.Eng. in Electronic Engineering',
        institution: 'University of Nigeria, Nsukka (UNN)',
        year: '2020'
      }
    ],
    notes: [
      {
        id: 'note-5',
        author: 'Nnamdi Eze',
        text: 'Offer signed! Laptop and solar backup setup dispatched to his Abakpa Nike residence. Starting next month.',
        createdAt: '2026-09-10'
      }
    ],
    evaluations: [
      {
        id: 'eval-4',
        reviewer: 'Nnamdi Eze',
        stage: 'offer',
        technicalSkill: 5,
        communication: 5,
        cultureFit: 5,
        problemSolving: 5,
        recommendation: 'strong_hire',
        comments: 'Excellent hire. Somtochukwu brings deep electronic engineering and backend resilience to our team.',
        createdAt: '2026-09-06'
      }
    ],
    interviews: []
  },
  {
    id: 'cand-7',
    fullName: 'Ngozi Ezeh',
    email: 'ngozi.ezeh@easterncreatives.ng',
    phone: '+234 816 222 7890',
    location: 'Awka / Enugu Corridor',
    currentRole: 'Product Designer',
    currentCompany: 'Awka Digital Hub',
    yearsExperience: 4,
    appliedJobId: 'job-2',
    appliedDate: '2026-09-11',
    stage: 'applied',
    rating: 4,
    status: 'active',
    summary: 'Product designer focusing on accessible mobile web apps for rural traders across Anambra and Enugu states. Graduate of Nnamdi Azikiwe University (UNIZIK).',
    resumeFileName: 'ngozi_ezeh_portfolio.pdf',
    portfolioUrl: 'https://ngoziezeh.design',
    skills: ['Figma', 'Mobile UX', 'User Research', 'Wireframing', 'Igbo Language Localization'],
    workHistory: [
      {
        role: 'UI Designer',
        company: 'Awka Digital Hub',
        duration: '2022 - Present',
        description: 'Designed localized agritech and marketplace mobile web tools.'
      }
    ],
    education: [
      {
        degree: 'B.Sc. in Fine & Applied Arts',
        institution: 'Nnamdi Azikiwe University, Awka',
        year: '2022'
      }
    ],
    notes: [],
    evaluations: [],
    interviews: []
  },
  {
    id: 'cand-8',
    fullName: 'Obinna Nwachukwu',
    email: 'obinna.nwachukwu@systems.ng',
    phone: '+234 809 333 1245',
    location: 'Coal Camp / Uwani, Enugu',
    currentRole: 'Backend Developer',
    currentCompany: 'Midwest Financial Labs',
    yearsExperience: 3,
    appliedJobId: 'job-1',
    appliedDate: '2026-09-04',
    stage: 'rejected',
    rating: 2,
    status: 'rejected',
    summary: 'Java developer based in Uwani, Enugu. Solid knowledge of Spring Boot, but lacked hands-on React and TypeScript capabilities needed for the Senior Full Stack role.',
    resumeFileName: 'obinna_nwachukwu_cv.pdf',
    skills: ['Java', 'Spring Boot', 'SQL', 'PostgreSQL'],
    workHistory: [
      {
        role: 'Junior Java Developer',
        company: 'Midwest Financial Labs',
        duration: '2023 - Present',
        description: 'Maintained batch processing microservices.'
      }
    ],
    education: [
      {
        degree: 'HND in Computer Science',
        institution: 'Institute of Management and Technology (IMT), Enugu',
        year: '2023'
      }
    ],
    notes: [
      {
        id: 'note-6',
        author: 'Nnamdi Eze',
        text: 'Candidate has good foundation in Java backend, but role requires deep modern TypeScript and React. Added to talent pool for upcoming pure Java backend openings.',
        createdAt: '2026-09-07'
      }
    ],
    evaluations: [
      {
        id: 'eval-5',
        reviewer: 'Nnamdi Eze',
        stage: 'screening',
        technicalSkill: 2,
        communication: 4,
        cultureFit: 4,
        problemSolving: 3,
        recommendation: 'no_hire',
        comments: 'Skills gap in required frontend stack for Senior role.',
        createdAt: '2026-09-07'
      }
    ],
    interviews: []
  }
];

const JOBS_STORAGE_KEY = 'recruitment_system_jobs_enugu_v2';
const CANDIDATES_STORAGE_KEY = 'recruitment_system_candidates_enugu_v2';

export function getStoredJobs(): JobOpening[] {
  try {
    const raw = localStorage.getItem(JOBS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading stored jobs', e);
  }
  saveStoredJobs(INITIAL_JOBS);
  return INITIAL_JOBS;
}

export function saveStoredJobs(jobs: JobOpening[]): void {
  try {
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
  } catch (e) {
    console.error('Error saving jobs', e);
  }
}

export function getStoredCandidates(): Candidate[] {
  try {
    const raw = localStorage.getItem(CANDIDATES_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading stored candidates', e);
  }
  saveStoredCandidates(INITIAL_CANDIDATES);
  return INITIAL_CANDIDATES;
}

export function saveStoredCandidates(candidates: Candidate[]): void {
  try {
    localStorage.setItem(CANDIDATES_STORAGE_KEY, JSON.stringify(candidates));
  } catch (e) {
    console.error('Error saving candidates', e);
  }
}

export function resetDemoData(): { jobs: JobOpening[]; candidates: Candidate[] } {
  saveStoredJobs(INITIAL_JOBS);
  saveStoredCandidates(INITIAL_CANDIDATES);
  return { jobs: INITIAL_JOBS, candidates: INITIAL_CANDIDATES };
}
