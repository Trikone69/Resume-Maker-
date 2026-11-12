import { ResumeData } from '../types/resume';

export const SAMPLE_PROFILES: { id: string; label: string; role: string; category: string; data: ResumeData }[] = [
  // 1. Senior Full Stack Engineer (Tech)
  {
    id: 'software-engineer',
    label: 'Senior Full Stack Engineer',
    role: 'Tech & Engineering',
    category: 'Technology',
    data: {
      personalInfo: {
        fullName: 'Alex Vance',
        jobTitle: 'Senior Full Stack Software Engineer',
        email: 'alex.vance@email.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
        website: 'https://alexvance.dev',
        linkedin: 'https://linkedin.com/in/alexvance',
        github: 'https://github.com/alexvance',
        summary: 'Results-driven Senior Full Stack Engineer with 7+ years of experience designing and scaling high-throughput web applications and cloud microservices. Proven track record of boosting system reliability to 99.99% and mentoring engineering teams. Deep expertise in React, TypeScript, Node.js, Go, AWS, and distributed database architecture.'
      },
      experiences: [
        {
          id: 'exp-1',
          jobTitle: 'Senior Full Stack Engineer',
          company: 'CloudScale Technologies',
          location: 'San Francisco, CA',
          startDate: '2022-03',
          endDate: '',
          current: true,
          bullets: [
            'Spearheaded the architectural migration of core customer portal from a legacy monolith to Next.js and Go microservices, improving PageSpeed score from 48 to 96.',
            'Architected and deployed distributed event streaming with Apache Kafka, processing 18M+ real-time telemetry events daily with sub-50ms latency.',
            'Reduced AWS infrastructure costs by $115,000 annually by right-sizing Kubernetes clusters and implementing automated spot instance scheduling.',
            'Mentored 8 mid-level and junior developers, standardizing code review guidelines and boosting team deployment frequency from bi-weekly to daily.'
          ]
        },
        {
          id: 'exp-2',
          jobTitle: 'Software Engineer II',
          company: 'Apex Digital Solutions',
          location: 'San Jose, CA',
          startDate: '2019-06',
          endDate: '2022-02',
          current: false,
          bullets: [
            'Developed and maintained high-traffic customer-facing web applications using React, Redux Toolkit, and Node.js serving over 450,000 monthly active users.',
            'Optimized PostgreSQL database queries and indexing strategies, decreasing P95 API response times by 44% across 30+ core endpoints.',
            'Engineered automated CI/CD pipelines via GitHub Actions and Docker, reducing build failures by 65% and deployment duration by 20 minutes.',
            'Partnered with UX researchers and Product Managers to implement accessible WCAG 2.1 AA compliant UI components across 4 product suites.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          institution: 'University of California, Berkeley',
          location: 'Berkeley, CA',
          startDate: '2015-08',
          endDate: '2019-05',
          current: false,
          gpa: '3.82 / 4.0',
          honors: 'Dean\'s Honor List, Magna Cum Laude'
        }
      ],
      skills: [
        {
          id: 'skill-1',
          category: 'Languages & Core',
          skills: ['TypeScript', 'JavaScript (ES6+)', 'Go (Golang)', 'Python', 'SQL', 'HTML5 / CSS3', 'GraphQL']
        },
        {
          id: 'skill-2',
          category: 'Frontend & Frameworks',
          skills: ['React', 'Next.js', 'Redux / Zustand', 'Tailwind CSS', 'Vite', 'Webpack', 'Playwright', 'Jest']
        },
        {
          id: 'skill-3',
          category: 'Backend & Cloud',
          skills: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'MongoDB', 'AWS (ECS, S3, RDS, Lambda)', 'Docker', 'Kubernetes']
        }
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'PulseTelemetry — Cloud Metric Monitor',
          subtitle: 'Distributed Monitoring Tool',
          link: 'https://pulsetelemetry.demo',
          github: 'https://github.com/alexvance/pulse-telemetry',
          startDate: '2023-01',
          endDate: '2023-08',
          bullets: [
            'Built an open-source real-time metrics collector capable of ingesting 50,000 metrics/sec with Go and TimescaleDB.',
            'Created an interactive React visualization dashboard featuring custom charting with Canvas and WebGL, starred by 1,400+ developers on GitHub.'
          ],
          techStack: ['Go', 'TimescaleDB', 'React', 'TypeScript', 'Docker']
        }
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'AWS Certified Solutions Architect – Associate',
          issuer: 'Amazon Web Services (AWS)',
          issueDate: '2023-04',
          expiryDate: '2026-04',
          credentialId: 'AWS-ASA-994821',
          url: 'https://aws.amazon.com/verification'
        }
      ],
      customSections: [],
      customization: {
        template: 'ats-classic',
        fontFamily: 'inter',
        fontSize: 'normal',
        accentColor: '#0f172a',
        marginSize: 'normal',
        lineSpacing: 'normal',
        paperSize: 'a4',
        showIcons: true,
        sectionOrder: ['personalInfo', 'summary', 'experiences', 'skills', 'projects', 'education', 'certifications', 'customSections']
      }
    }
  },

  // 2. Investment Banking / Financial Analyst
  {
    id: 'finance-analyst',
    label: 'Investment Banking & Financial Analyst',
    role: 'Finance & Banking',
    category: 'Finance',
    data: {
      personalInfo: {
        fullName: 'Julian Hayes, CFA',
        jobTitle: 'Senior Financial Analyst / Investment Banking Associate',
        email: 'julian.hayes@financecorp.com',
        phone: '+1 (212) 555-8901',
        location: 'New York, NY',
        website: '',
        linkedin: 'https://linkedin.com/in/julianhayes-cfa',
        github: '',
        summary: 'Results-driven Senior Financial Analyst and CFA Charterholder with 6+ years of experience in middle-market M&A, DCF valuation, leveraged buyout (LBO) modeling, and corporate budget forecasting. Successfully advised on 14 closed M&A transactions valued at over $1.8B. Expert in Bloomberg Terminal, CapIQ, SQL, and advanced financial modeling.'
      },
      experiences: [
        {
          id: 'exp-1',
          jobTitle: 'Investment Banking Associate',
          company: 'Morgan & Sterling Capital',
          location: 'New York, NY',
          startDate: '2021-08',
          endDate: '',
          current: true,
          bullets: [
            'Engineered dynamic 3-statement operating models, DCF valuations, and LBO sensitivity analyses for 18 pitch decks, resulting in $640M in mandate wins.',
            'Spearheaded financial due diligence for a $380M cross-border SaaS acquisition, uncovering $14M in duplicate SG&A run-rate cost synergies.',
            'Prepared confidential information memorandums (CIMs) and executive board decks delivered directly to private equity operating partners.',
            'Mentored and trained a class of 5 incoming first-year investment banking analysts in financial modeling and CapIQ data extraction.'
          ]
        },
        {
          id: 'exp-2',
          jobTitle: 'Financial Analyst — Corporate Development',
          company: 'Vanguard Global Holdings',
          location: 'Boston, MA',
          startDate: '2018-07',
          endDate: '2021-07',
          current: false,
          bullets: [
            'Conducted monthly variance analyses across $1.2B annual divisional operating budgets, identifying $6.8M in cost reduction opportunities.',
            'Automated executive revenue forecasting dashboards using SQL and Tableau, reducing weekly reporting turnaround from 12 hours to 45 minutes.',
            'Audited capital expenditure requests (CapEx) against hurdle IRR thresholds, boosting capital allocation efficiency by 18%.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Finance & Applied Economics',
          institution: 'New York University — Stern School of Business',
          location: 'New York, NY',
          startDate: '2014-08',
          endDate: '2018-05',
          current: false,
          gpa: '3.91 / 4.0',
          honors: 'Summa Cum Laude, Beta Gamma Sigma Honor Society'
        }
      ],
      skills: [
        {
          id: 'skill-1',
          category: 'Financial Modeling & Valuation',
          skills: ['DCF Modeling', 'LBO Analysis', 'M&A Due Diligence', 'Accretion / Dilution', 'Comparable Company Analysis (Comps)', 'Precedent Transactions']
        },
        {
          id: 'skill-2',
          category: 'Systems & Analytics',
          skills: ['Advanced Excel / VBA', 'Bloomberg Terminal', 'S&P Capital IQ', 'FactSet', 'SQL', 'Tableau', 'Power BI']
        },
        {
          id: 'skill-3',
          category: 'Corporate Finance',
          skills: ['Working Capital Optimization', 'Budget Forecasting', 'CapEx Allocation', 'FP&A', 'SEC Filings (10-K, 10-Q)', 'GAAP / IFRS']
        }
      ],
      projects: [],
      certifications: [
        {
          id: 'cert-1',
          name: 'Chartered Financial Analyst (CFA® Charterholder)',
          issuer: 'CFA Institute',
          issueDate: '2021-06',
          expiryDate: '',
          credentialId: 'CFA-ID-781924',
          url: 'https://cfainstitute.org'
        },
        {
          id: 'cert-2',
          name: 'Financial Modeling & Valuation Analyst (FMVA®)',
          issuer: 'Corporate Finance Institute (CFI)',
          issueDate: '2019-02',
          expiryDate: '',
          credentialId: 'FMVA-48201',
          url: 'https://corporatefinanceinstitute.com'
        }
      ],
      customSections: [
        {
          id: 'custom-1',
          title: 'Notable Transaction Experience',
          items: [
            {
              id: 'citem-1',
              title: 'Project Apex — $380M Enterprise Software Acquisition',
              subtitle: 'Lead Associate on Buy-Side M&A Due Diligence',
              date: '2023',
              description: 'Constructed detailed pro-forma financial statements and synergy realization bridge for buyer sponsor.'
            },
            {
              id: 'citem-2',
              title: 'Project Horizon — $220M Senior Debt Refinancing',
              subtitle: 'Syndicated Leveraged Finance Structure',
              date: '2022',
              description: 'Modeled cash flow debt amortization schedules across Term Loan B and Revolving Credit Facilities.'
            }
          ]
        }
      ],
      customization: {
        template: 'finance-corporate',
        fontFamily: 'garamond',
        fontSize: 'normal',
        accentColor: '#1e3a8a',
        marginSize: 'normal',
        lineSpacing: 'compact',
        paperSize: 'letter',
        showIcons: true,
        sectionOrder: ['personalInfo', 'summary', 'experiences', 'skills', 'education', 'certifications', 'customSections']
      }
    }
  },

  // 3. Registered Nurse / Healthcare Specialist
  {
    id: 'healthcare-rn',
    label: 'Registered Nurse (BSN, RN, CCRN)',
    role: 'Healthcare & Nursing',
    category: 'Healthcare',
    data: {
      personalInfo: {
        fullName: 'Elena Rostova, BSN, RN, CCRN',
        jobTitle: 'Critical Care Registered Nurse (ICU Specialist)',
        email: 'elena.rostova.rn@medmail.com',
        phone: '+1 (312) 555-7643',
        location: 'Chicago, IL',
        website: '',
        linkedin: 'https://linkedin.com/in/elena-rostova-rn',
        github: '',
        summary: 'Compassionate, Board-Certified Critical Care Registered Nurse (BSN, RN, CCRN) with 8+ years of high-acuity Intensive Care Unit (ICU) and Emergency Department experience in Level 1 Trauma Centers. Recognized for rapid clinical assessment, ventilator management, telemetry interpretation, and zero-error medication administration. Champion of evidence-based infection control.'
      },
      experiences: [
        {
          id: 'exp-1',
          jobTitle: 'Lead Critical Care Nurse (Charge RN)',
          company: 'Northwestern Memorial Hospital',
          location: 'Chicago, IL',
          startDate: '2020-04',
          endDate: '',
          current: true,
          bullets: [
            'Provided direct intensive care for 24-bed Medical Intensive Care Unit (MICU) managing septic shock, ARDS, and multi-organ failure patients with 1:1 or 1:2 nurse-to-patient acuity ratios.',
            'Spearheaded unit-wide Central Line-Associated Bloodstream Infection (CLABSI) reduction protocol, achieving 18 consecutive months with zero hospital-acquired infections.',
            'Titrated critical vasoactive intravenous infusions (Norepinephrine, Epinephrine, Vasopressin) based on invasive arterial line hemodynamics.',
            'Served as Charge Nurse supervising shift operations, bed allocation, and emergency Code Blue responses across 32 medical staff members.'
          ]
        },
        {
          id: 'exp-2',
          jobTitle: 'Registered Staff Nurse — Emergency Department',
          company: 'Rush University Medical Center',
          location: 'Chicago, IL',
          startDate: '2016-09',
          endDate: '2020-03',
          current: false,
          bullets: [
            'Triage and stabilized 40+ acute trauma, cardiac arrest, and stroke patients daily utilizing Emergency Severity Index (ESI) protocols.',
            'Administered intravenous medications, managed chest tubes, and assisted physicians with bedside endotracheal intubations and thoracentesis.',
            'Trained 12 nursing residents on electronic health records (Epic EMR), clinical documentation, and family palliative communication.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Bachelor of Science in Nursing (BSN)',
          fieldOfStudy: 'Nursing Practice & Clinical Sciences',
          institution: 'University of Illinois at Chicago',
          location: 'Chicago, IL',
          startDate: '2012-08',
          endDate: '2016-05',
          current: false,
          gpa: '3.86 / 4.0',
          honors: 'Sigma Theta Tau International Honor Society of Nursing'
        }
      ],
      skills: [
        {
          id: 'skill-1',
          category: 'Clinical Competencies & Critical Care',
          skills: ['Hemodynamic Monitoring (Arterial Lines, CVP)', 'Mechanical Ventilation & BiPAP', 'Telemetry & EKG Interpretation', 'Code Blue & ACLS Resuscitation', 'Continuous Renal Replacement Therapy (CRRT)']
        },
        {
          id: 'skill-2',
          category: 'Medication & Patient Safety',
          skills: ['Vasoactive Drips Titration', 'Blood Product Transfusion', 'Infection Control (CLABSI/CAUTI/VAP)', 'Wound Care & Sepsis Bundles', 'Post-Op Surgical Recovery']
        },
        {
          id: 'skill-3',
          category: 'Health Informatics & Standards',
          skills: ['Epic Systems EMR', 'Cerner PowerChart', 'Pyxis MedStation', 'HIPAA Compliance', 'Patient Advocacy & Education', 'Multidisciplinary Rounds']
        }
      ],
      projects: [],
      certifications: [
        {
          id: 'cert-1',
          name: 'Registered Nurse (RN) License — State of Illinois',
          issuer: 'Illinois Board of Nursing',
          issueDate: '2016-06',
          expiryDate: '2026-05',
          credentialId: 'RN-LIC-0419824',
          url: 'https://idfpr.illinois.gov'
        },
        {
          id: 'cert-2',
          name: 'Critical Care Registered Nurse (CCRN® - Adult)',
          issuer: 'American Association of Critical-Care Nurses (AACN)',
          issueDate: '2019-10',
          expiryDate: '2025-10',
          credentialId: 'CCRN-91823',
          url: 'https://aacn.org'
        },
        {
          id: 'cert-3',
          name: 'Advanced Cardiovascular Life Support (ACLS & BLS)',
          issuer: 'American Heart Association',
          issueDate: '2023-01',
          expiryDate: '2025-01',
          credentialId: 'AHA-ACLS-5521',
          url: 'https://cpr.heart.org'
        }
      ],
      customSections: [
        {
          id: 'custom-1',
          title: 'Hospital Committees & Leadership',
          items: [
            {
              id: 'citem-1',
              title: 'Co-Chair, Nursing Quality & Practice Council',
              subtitle: 'Northwestern Memorial Hospital',
              date: '2022 – Present',
              description: 'Standardized bedside nurse shift handover checklist, decreasing clinical medication discrepancies by 34%.'
            }
          ]
        }
      ],
      customization: {
        template: 'medical-clinical',
        fontFamily: 'roboto',
        fontSize: 'normal',
        accentColor: '#0284c7',
        marginSize: 'normal',
        lineSpacing: 'normal',
        paperSize: 'letter',
        showIcons: true,
        sectionOrder: ['personalInfo', 'summary', 'experiences', 'skills', 'certifications', 'education', 'customSections']
      }
    }
  },

  // 4. Digital Marketing & Growth Manager
  {
    id: 'growth-marketing',
    label: 'Digital Marketing & Growth Manager',
    role: 'Marketing & Growth',
    category: 'Marketing',
    data: {
      personalInfo: {
        fullName: 'Sophia Martinez',
        jobTitle: 'Senior Growth Marketing & Performance Lead',
        email: 'sophia.martinez@growthops.com',
        phone: '+1 (415) 555-3210',
        location: 'Austin, TX',
        website: 'https://sophiagrowth.io',
        linkedin: 'https://linkedin.com/in/sophiamartinez-growth',
        github: '',
        summary: 'Data-driven Growth Marketing Leader with 7+ years of experience scaling B2B SaaS and DTC revenue from $2M to $25M ARR. Proven expertise in multi-channel customer acquisition (Google Ads, Meta, LinkedIn, SEO), conversion rate optimization (CRO), and lifecycle retention marketing. Managed $4.5M+ in annual ad budgets with an average 4.2x ROAS.'
      },
      experiences: [
        {
          id: 'exp-1',
          jobTitle: 'Head of Growth Marketing',
          company: 'HyperGrowth Commerce',
          location: 'Austin, TX',
          startDate: '2021-11',
          endDate: '',
          current: true,
          bullets: [
            'Orchestrated multi-channel paid acquisition strategy across Google Search, Meta Ads, and YouTube, scaling monthly qualified pipeline by 140% while slashing CAC by 28%.',
            'Built and executed programmatic SEO content strategy generating 320,000 monthly organic visitors and driving $1.8M in pipeline revenue.',
            'Supervised growth marketing team of 6 including performance media buyers, copywriters, and front-end CRO developers.',
            'Conducted 45+ landing page multivariate A/B experiments using Webflow and Optimizely, increasing visitor-to-demo conversion rate from 2.1% to 4.8%.'
          ]
        },
        {
          id: 'exp-2',
          jobTitle: 'Performance Marketing Manager',
          company: 'SaaSify Solutions',
          location: 'San Francisco, CA',
          startDate: '2018-06',
          endDate: '2021-10',
          current: false,
          bullets: [
            'Managed $2.2M annual performance advertising budget across LinkedIn Ads and Google Search with a strict 3.8x payback return target.',
            'Architected automated email lifecycle nurturing sequences in HubSpot, lifting trial-to-paid subscription conversion by 19%.',
            'Partnered with Data Science team to configure Google Analytics 4 server-side tracking, capturing 22% previously unrecorded attribution conversions.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Bachelor of Arts',
          fieldOfStudy: 'Marketing & Digital Media Communications',
          institution: 'University of Texas at Austin',
          location: 'Austin, TX',
          startDate: '2014-08',
          endDate: '2018-05',
          current: false,
          gpa: '3.79 / 4.0',
          honors: 'Distinguished College Scholar'
        }
      ],
      skills: [
        {
          id: 'skill-1',
          category: 'Paid Acquisition & Media',
          skills: ['Google Ads (Search/Shopping/Display)', 'Meta Ads Manager', 'LinkedIn Campaign Manager', 'TikTok Ads', 'Programmatic Display', 'Retargeting']
        },
        {
          id: 'skill-2',
          category: 'Growth & Analytics',
          skills: ['Google Analytics 4 (GA4)', 'HubSpot CRM', 'Mixpanel', 'Attribution Modeling', 'SQL Basics', 'Tableau', 'Supermetrics']
        },
        {
          id: 'skill-3',
          category: 'SEO & Optimization',
          skills: ['Ahrefs / SEMrush', 'Technical SEO', 'Conversion Rate Optimization (CRO)', 'Optimizely / VWO', 'Landing Page UX', 'Copywriting']
        }
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Zero-to-One B2B SaaS Funnel Launch',
          subtitle: 'End-to-End Inbound Acquisition Engine',
          link: 'https://sophiagrowth.io/saas-case-study',
          github: '',
          startDate: '2022-03',
          endDate: '2022-09',
          bullets: [
            'Designed full-funnel lead generation framework acquiring 4,200 marketing qualified leads (MQLs) within 6 months of product launch.',
            'Produced viral LinkedIn thought leadership content generating 2.4M organic impressions.'
          ],
          techStack: ['HubSpot', 'Google Ads', 'Figma', 'Webflow', 'GA4']
        }
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'Google Ads Search & Measurement Certified',
          issuer: 'Google',
          issueDate: '2023-02',
          expiryDate: '2025-02',
          credentialId: 'GA-SEARCH-89102',
          url: 'https://skillshop.exceedlms.com'
        },
        {
          id: 'cert-2',
          name: 'HubSpot Inbound Marketing & RevOps Certified',
          issuer: 'HubSpot Academy',
          issueDate: '2022-05',
          expiryDate: '2024-05',
          credentialId: 'HS-REV-10928',
          url: 'https://academy.hubspot.com'
        }
      ],
      customSections: [],
      customization: {
        template: 'creative-minimal',
        fontFamily: 'lato',
        fontSize: 'normal',
        accentColor: '#7c3aed',
        marginSize: 'normal',
        lineSpacing: 'normal',
        paperSize: 'a4',
        showIcons: true,
        sectionOrder: ['personalInfo', 'summary', 'experiences', 'skills', 'projects', 'education', 'certifications']
      }
    }
  },

  // 5. Corporate Legal Counsel / Attorney
  {
    id: 'legal-counsel',
    label: 'Corporate Legal Counsel / Attorney',
    role: 'Legal & Compliance',
    category: 'Legal',
    data: {
      personalInfo: {
        fullName: 'David Sterling, Esq.',
        jobTitle: 'Senior Corporate Counsel & Compliance Officer',
        email: 'david.sterling.esq@legaladvisor.com',
        phone: '+1 (202) 555-6712',
        location: 'Washington, DC',
        website: '',
        linkedin: 'https://linkedin.com/in/davidsterling-esq',
        github: '',
        summary: 'Distinguished Senior Corporate Counsel and Bar-admitted Attorney with 9+ years of experience structuring cross-border commercial contracts, leading regulatory compliance initiatives (SEC, GDPR, CCPA), and mitigating enterprise legal risk for Fortune 500 corporations. Adept in M&A transaction governance, IP protection, and high-stakes vendor negotiations.'
      },
      experiences: [
        {
          id: 'exp-1',
          jobTitle: 'Senior Corporate Counsel',
          company: 'Aegis Global Enterprises',
          location: 'Washington, DC',
          startDate: '2020-03',
          endDate: '',
          current: true,
          bullets: [
            'Drafted, negotiated, and executed 240+ commercial SaaS and enterprise vendor agreements valued in excess of $420M with Fortune 100 enterprise clients.',
            'Advised Executive Board and General Counsel on antitrust and regulatory compliance during a $650M horizontal acquisition, securing FTC clearance.',
            'Overhauled enterprise data privacy policies for GDPR and CCPA compliance, reducing cross-border legal exposure and eliminating audit non-conformities.',
            'Managed outside litigation defense counsel, resolving commercial breach disputes and saving an estimated $3.5M in potential liabilities.'
          ]
        },
        {
          id: 'exp-2',
          jobTitle: 'Corporate Associate Attorney',
          company: 'Covington & Burling LLP',
          location: 'Washington, DC',
          startDate: '2015-09',
          endDate: '2020-02',
          current: false,
          bullets: [
            'Conducted legal due diligence and drafted definitive transaction documentation (SPAs, disclosure schedules) for 15+ private equity transactions.',
            'Prepared quarterly and annual SEC filings (Forms 10-K, 10-Q, 8-K) and proxy statements for publicly traded enterprise technology clients.',
            'Researched and drafted legal memoranda on federal securities regulations, corporate governance, and fiduciary duty litigation.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Juris Doctor (J.D.)',
          fieldOfStudy: 'Corporate Law & Securities Regulation',
          institution: 'Georgetown University Law Center',
          location: 'Washington, DC',
          startDate: '2012-08',
          endDate: '2015-05',
          current: false,
          gpa: '3.84 / 4.0',
          honors: 'Georgetown Law Journal Editor, Magna Cum Laude'
        },
        {
          id: 'edu-2',
          degree: 'Bachelor of Arts',
          fieldOfStudy: 'Political Science & Philosophy',
          institution: 'University of Virginia',
          location: 'Charlottesville, VA',
          startDate: '2008-08',
          endDate: '2012-05',
          current: false,
          gpa: '3.90 / 4.0',
          honors: 'Phi Beta Kappa'
        }
      ],
      skills: [
        {
          id: 'skill-1',
          category: 'Legal Specialties & Governance',
          skills: ['Corporate Governance', 'Commercial Contract Drafting', 'Mergers & Acquisitions (M&A)', 'Securities Law & SEC Compliance', 'Intellectual Property (IP) Licensing']
        },
        {
          id: 'skill-2',
          category: 'Regulatory & Risk Mitigation',
          skills: ['GDPR & CCPA Privacy Law', 'FCPA & Anti-Corruption', 'Antitrust Clearance', 'Internal Investigations', 'Dispute Resolution / Arbitration']
        },
        {
          id: 'skill-3',
          category: 'Legal Operations',
          skills: ['Contract Lifecycle Management (Ironclad/DocuSign)', 'Legal Research (Westlaw, LexisNexis)', 'Outside Counsel Budgeting', 'Board Advisory']
        }
      ],
      projects: [],
      certifications: [
        {
          id: 'cert-1',
          name: 'Bar Admission — District of Columbia Bar',
          issuer: 'District of Columbia Court of Appeals',
          issueDate: '2015-11',
          expiryDate: '',
          credentialId: 'DC-BAR-103982',
          url: 'https://dcbar.org'
        },
        {
          id: 'cert-2',
          name: 'Certified Information Privacy Professional / United States (CIPP/US)',
          issuer: 'International Association of Privacy Professionals (IAPP)',
          issueDate: '2021-04',
          expiryDate: '2025-04',
          credentialId: 'IAPP-CIPP-49102',
          url: 'https://iapp.org'
        }
      ],
      customSections: [
        {
          id: 'custom-1',
          title: 'Bar Admissions & Judicial Affiliations',
          items: [
            {
              id: 'citem-1',
              title: 'District of Columbia Bar (Active Member in Good Standing)',
              subtitle: 'Admitted November 2015',
              date: '2015 – Present',
              description: 'Active member of the Corporation, Finance & Securities Law Section.'
            },
            {
              id: 'citem-2',
              title: 'United States District Court for the District of Columbia',
              subtitle: 'Admitted to Practice',
              date: '2016 – Present',
              description: 'Federal trial and appellate litigation eligibility.'
            }
          ]
        }
      ],
      customization: {
        template: 'legal-consulting',
        fontFamily: 'garamond',
        fontSize: 'normal',
        accentColor: '#0f172a',
        marginSize: 'spacious',
        lineSpacing: 'normal',
        paperSize: 'letter',
        showIcons: false,
        sectionOrder: ['personalInfo', 'summary', 'experiences', 'education', 'skills', 'certifications', 'customSections']
      }
    }
  },

  // 6. Data Analyst & Business Intelligence Specialist
  {
    id: 'data-analyst',
    label: 'Senior Data Analyst / BI Specialist',
    role: 'Analytics & Business Intelligence',
    category: 'Data & Analytics',
    data: {
      personalInfo: {
        fullName: 'Rachel Sterling',
        jobTitle: 'Senior Data Analyst & BI Specialist',
        email: 'rachel.sterling@datalabs.io',
        phone: '+1 (617) 555-9082',
        location: 'Boston, MA',
        website: 'https://rachelsterling.data',
        linkedin: 'https://linkedin.com/in/rachelsterling-bi',
        github: 'https://github.com/rachelsterling',
        summary: 'Analytical and detail-oriented Senior Data Analyst with 6+ years translating complex petabyte-scale data into actionable business strategies and interactive C-suite executive dashboards. Highly skilled in advanced SQL, Python (Pandas/NumPy), Tableau, Power BI, dbt, and Snowflake data modeling. Proven record of discovering $12M+ in cost and revenue optimizations.'
      },
      experiences: [
        {
          id: 'exp-1',
          jobTitle: 'Senior Business Intelligence Analyst',
          company: 'Wayfair Global Logistics',
          location: 'Boston, MA',
          startDate: '2021-05',
          endDate: '',
          current: true,
          bullets: [
            'Engineered automated executive KPI dashboards in Tableau connected to Snowflake data warehouse, adopted by 850+ cross-functional stakeholders weekly.',
            'Authored complex analytical SQL scripts with window functions, CTEs, and dbt models, reducing daily reporting refresh runtime by 65%.',
            'Identified supply chain route fulfillment bottlenecks via exploratory cluster analysis, generating $4.6M in annual logistics shipping savings.',
            'Collaborated with Product and Engineering to design telemetry schemas and automated anomaly detection alerts across 12 product domains.'
          ]
        },
        {
          id: 'exp-2',
          jobTitle: 'Data Analyst',
          company: 'CarGurus',
          location: 'Cambridge, MA',
          startDate: '2018-06',
          endDate: '2021-04',
          current: false,
          bullets: [
            'Conducted statistical hypothesis testing and A/B test analysis across 4M monthly consumer sessions, driving an 11% increase in dealer lead submissions.',
            'Built automated customer churn prediction model in Python using logistic regression and scikit-learn, achieving 84% recall.',
            'Cleaned and integrated third-party market inventory feeds via Python ETL pipelines into AWS Redshift.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Applied Statistics & Quantitative Economics',
          institution: 'Boston University',
          location: 'Boston, MA',
          startDate: '2014-09',
          endDate: '2018-05',
          current: false,
          gpa: '3.87 / 4.0',
          honors: 'Dean\'s List with Distinction'
        }
      ],
      skills: [
        {
          id: 'skill-1',
          category: 'Data Querying & Modeling',
          skills: ['Advanced SQL (PostgreSQL, Snowflake, BigQuery)', 'dbt (data build tool)', 'Data Warehousing', 'Data Cleansing', 'Dimensional Modeling']
        },
        {
          id: 'skill-2',
          category: 'BI & Visualization',
          skills: ['Tableau Desktop / Server', 'Microsoft Power BI', 'Looker / LookML', 'Executive Dashboard Design', 'Data Storytelling']
        },
        {
          id: 'skill-3',
          category: 'Programming & Statistics',
          skills: ['Python (Pandas, NumPy, Matplotlib)', 'R Programming', 'A/B Testing & Hypothesis Testing', 'Regression Modeling', 'Git']
        }
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'SaaS Churn & Cohort Analytics Engine',
          subtitle: 'Interactive Open Source Business Metric Simulator',
          link: 'https://github.com/rachelsterling/saas-cohort-analyzer',
          github: 'https://github.com/rachelsterling/saas-cohort-analyzer',
          startDate: '2023-01',
          endDate: '2023-05',
          bullets: [
            'Developed modular Streamlit web app in Python providing automated retention heatmaps and LTV:CAC projections.',
            'Utilized synthetic transaction datasets of 200,000 customers to benchmark predictive churn models.'
          ],
          techStack: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'Docker']
        }
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'Tableau Certified Data Analyst',
          issuer: 'Salesforce / Tableau',
          issueDate: '2022-08',
          expiryDate: '2024-08',
          credentialId: 'TAB-DA-89012',
          url: 'https://tableau.com'
        },
        {
          id: 'cert-2',
          name: 'Snowflake SnowPro Core Certified',
          issuer: 'Snowflake',
          issueDate: '2023-03',
          expiryDate: '2025-03',
          credentialId: 'SNOW-CORE-44910',
          url: 'https://snowflake.com'
        }
      ],
      customSections: [],
      customization: {
        template: 'nordic-clean',
        fontFamily: 'inter',
        fontSize: 'normal',
        accentColor: '#059669',
        marginSize: 'normal',
        lineSpacing: 'normal',
        paperSize: 'a4',
        showIcons: true,
        sectionOrder: ['personalInfo', 'summary', 'experiences', 'skills', 'projects', 'education', 'certifications']
      }
    }
  },

  // 7. Human Resources & Talent Acquisition Lead
  {
    id: 'hr-talent',
    label: 'Human Resources & Talent Acquisition Lead',
    role: 'HR & People Operations',
    category: 'Human Resources',
    data: {
      personalInfo: {
        fullName: 'Marcus Vance, SHRM-SCP',
        jobTitle: 'Head of People Operations & Talent Acquisition',
        email: 'marcus.vance.hr@peopletalent.com',
        phone: '+1 (404) 555-8123',
        location: 'Atlanta, GA',
        website: '',
        linkedin: 'https://linkedin.com/in/marcusvance-shrm',
        github: '',
        summary: 'Strategic Senior People Operations Leader and SHRM-SCP certified professional with 8+ years of experience scaling high-growth technology organizations from 100 to 800+ employees. Expert in full-cycle executive recruitment, DEI program design, employee retention, compensation benchmarking, and modern HRIS management (Workday, Greenhouse, BambooHR).'
      },
      experiences: [
        {
          id: 'exp-1',
          jobTitle: 'Head of Talent Acquisition & People Ops',
          company: 'Nexis Cloud Software',
          location: 'Atlanta, GA',
          startDate: '2021-03',
          endDate: '',
          current: true,
          bullets: [
            'Scaled engineering, product, and sales workforce from 180 to 520 global team members across 14 countries while reducing average time-to-hire from 58 days to 32 days.',
            'Overhauled compensation leveling and benefits packages using Radford benchmarks, elevating employee retention rate from 78% to 92%.',
            'Implemented automated onboarding workflows in Workday and Greenhouse, resulting in 96% positive new-hire feedback rating.',
            'Spearheaded diversity and inclusion (DEI) structured interviewing framework, boosting underrepresented minority hires by 38% across leadership tiers.'
          ]
        },
        {
          id: 'exp-2',
          jobTitle: 'Senior HR Business Partner (HRBP)',
          company: 'Delta Global Services',
          location: 'Atlanta, GA',
          startDate: '2017-08',
          endDate: '2021-02',
          current: false,
          bullets: [
            'Partnered with C-suite executives to implement annual performance reviews and 360-degree feedback cycles for 1,200 enterprise employees.',
            'Mediated complex employee relations inquiries, ensuring complete compliance with EEOC, OSHA, and federal labor regulations.',
            'Conducted company-wide employee engagement surveys in Culture Amp, driving 4 key operational improvements that lowered voluntary turnover by 14%.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Human Resource Management & Organizational Psychology',
          institution: 'Georgia Institute of Technology',
          location: 'Atlanta, GA',
          startDate: '2013-08',
          endDate: '2017-05',
          current: false,
          gpa: '3.80 / 4.0',
          honors: 'Dean\'s Scholar'
        }
      ],
      skills: [
        {
          id: 'skill-1',
          category: 'People Strategy & Operations',
          skills: ['Full-Cycle Talent Acquisition', 'DEI Strategy & Inclusive Hiring', 'Performance Management', 'Succession Planning', 'Employee Retention & Relations']
        },
        {
          id: 'skill-2',
          category: 'Compensation & Compliance',
          skills: ['Radford Compensation Benchmarking', 'FLSA / EEOC / FMLA Compliance', 'Benefits Administration', 'Workforce Planning', 'Global Employment Law']
        },
        {
          id: 'skill-3',
          category: 'HRIS & Recruitment Tech',
          skills: ['Workday HCM', 'Greenhouse ATS', 'Lever', 'BambooHR', 'Culture Amp', 'LinkedIn Recruiter', 'ChartHop']
        }
      ],
      projects: [],
      certifications: [
        {
          id: 'cert-1',
          name: 'SHRM Senior Certified Professional (SHRM-SCP®)',
          issuer: 'Society for Human Resource Management (SHRM)',
          issueDate: '2020-11',
          expiryDate: '2026-11',
          credentialId: 'SHRM-SCP-98124',
          url: 'https://shrm.org'
        }
      ],
      customSections: [],
      customization: {
        template: 'modern-clean',
        fontFamily: 'inter',
        fontSize: 'normal',
        accentColor: '#0284c7',
        marginSize: 'normal',
        lineSpacing: 'normal',
        paperSize: 'letter',
        showIcons: true,
        sectionOrder: ['personalInfo', 'summary', 'experiences', 'skills', 'education', 'certifications']
      }
    }
  },

  // 8. UI/UX Product Designer
  {
    id: 'ui-ux-designer',
    label: 'Lead UI/UX Product Designer',
    role: 'Design & Creative',
    category: 'Design',
    data: {
      personalInfo: {
        fullName: 'Aria Montgomery',
        jobTitle: 'Lead Product & UX Designer',
        email: 'aria.montgomery@designstudio.io',
        phone: '+1 (415) 555-9234',
        location: 'Seattle, WA',
        website: 'https://ariadesigns.fyi',
        linkedin: 'https://linkedin.com/in/ariamontgomery-design',
        github: '',
        summary: 'Award-winning Lead Product Designer with 8+ years crafting intuitive, accessible enterprise design systems and mobile apps used by millions. Proven track record of aligning user research with strategic business goals to drive double-digit engagement and retention. Master of Figma, prototyping, usability testing, and WCAG accessibility standards.'
      },
      experiences: [
        {
          id: 'exp-1',
          jobTitle: 'Lead Product Designer',
          company: 'Canva Platforms',
          location: 'Seattle, WA',
          startDate: '2021-08',
          endDate: '',
          current: true,
          bullets: [
            'Led design of next-generation collaborative workspace experience, boosting team daily active creation by 34% across 8M users.',
            'Created and maintained enterprise design system in Figma comprising 300+ accessible components, decreasing design-to-development handoff cycle by 40%.',
            'Facilitated weekly qualitative user interviews, usability testing sessions, and synthesized actionable feedback into quarterly product roadmaps.',
            'Mentored 5 junior and mid-level product designers on typography hierarchy, interaction physics, and design token architecture.'
          ]
        },
        {
          id: 'exp-2',
          jobTitle: 'Senior UX/UI Designer',
          company: 'Zillow Group',
          location: 'Seattle, WA',
          startDate: '2018-04',
          endDate: '2021-07',
          current: false,
          bullets: [
            'Redesigned core search map filtering interface, lifting mobile property tour booking conversions by 23%.',
            'Conducted extensive user persona journey mapping, identifying critical drop-off points in mortgage pre-approval application funnel.',
            'Collaborated closely with React and iOS engineering teams to guarantee pixel-perfect design implementation.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Bachelor of Fine Arts (B.F.A.)',
          fieldOfStudy: 'Interaction Design & Human-Computer Interaction',
          institution: 'Rhode Island School of Design (RISD)',
          location: 'Providence, RI',
          startDate: '2014-08',
          endDate: '2018-05',
          current: false,
          gpa: '3.92 / 4.0',
          honors: 'Honors Graduate'
        }
      ],
      skills: [
        {
          id: 'skill-1',
          category: 'Product & Visual Design',
          skills: ['Figma & FigJam', 'Design Systems & Tokens', 'Wireframing & UI Prototyping', 'User Flows & Information Architecture', 'Typography & Visual Hierarchy']
        },
        {
          id: 'skill-2',
          category: 'User Research & Testing',
          skills: ['Usability Testing (UserTesting.com)', 'User Journey Mapping', 'A/B Testing UX', 'Persona Development', 'WCAG 2.1 AA Accessibility']
        },
        {
          id: 'skill-3',
          category: 'Tools & Front-End Basics',
          skills: ['Framer', 'Protopie', 'Adobe Creative Cloud', 'Miro', 'HTML5 / CSS3 / Tailwind Basics', 'Jira / Agile']
        }
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Aura Design System',
          subtitle: 'Open Source Multi-Brand UI Kit',
          link: 'https://figma.com/@aura-design',
          github: '',
          startDate: '2022-04',
          endDate: '2023-01',
          bullets: [
            'Built community Figma UI library utilized by 18,000+ designers with full auto-layout 5.0 and component variables support.'
          ],
          techStack: ['Figma', 'Design Tokens', 'Accessibility', 'Documentation']
        }
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'Nielsen Norman Group (NN/g) UX Master Certified',
          issuer: 'Nielsen Norman Group',
          issueDate: '2022-03',
          expiryDate: '',
          credentialId: 'NNG-UX-88910',
          url: 'https://nngroup.com'
        }
      ],
      customSections: [],
      customization: {
        template: 'creative-minimal',
        fontFamily: 'inter',
        fontSize: 'normal',
        accentColor: '#be123c',
        marginSize: 'normal',
        lineSpacing: 'normal',
        paperSize: 'a4',
        showIcons: true,
        sectionOrder: ['personalInfo', 'summary', 'experiences', 'skills', 'projects', 'education', 'certifications']
      }
    }
  },

  // 9. Lead Product Manager (Existing, enhanced)
  {
    id: 'product-manager',
    label: 'Lead Product Manager',
    role: 'Product & Strategy',
    category: 'Product',
    data: {
      personalInfo: {
        fullName: 'Maya Chen',
        jobTitle: 'Lead Technical Product Manager',
        email: 'maya.chen@email.com',
        phone: '+1 (415) 890-1234',
        location: 'New York, NY',
        website: 'https://mayachen.co',
        linkedin: 'https://linkedin.com/in/mayachen',
        github: '',
        summary: 'Data-driven Product Leader with 8+ years experience guiding B2B SaaS and consumer tech products from zero to $20M+ ARR. Proven ability to bridge engineering, design, and executive leadership to launch high-impact product roadmaps that delight customers and drive bottom-line retention.'
      },
      experiences: [
        {
          id: 'exp-1',
          jobTitle: 'Lead Product Manager',
          company: 'Vertex SaaS Platforms',
          location: 'New York, NY',
          startDate: '2021-08',
          endDate: '',
          current: true,
          bullets: [
            'Led cross-functional team of 14 software engineers, 2 UX designers, and 2 data scientists to deliver new automated reporting engine, driving $4.2M in annual recurring revenue.',
            'Increased product net retention rate (NRR) from 104% to 122% by revamping core self-serve workspace workflows based on user interview insights.',
            'Established company-wide OKRs and quantitative discovery framework, reducing average feature development time from 16 weeks to 7 weeks.',
            'Presented quarterly roadmap progress and unit economics directly to C-suite stakeholders and board members.'
          ]
        },
        {
          id: 'exp-2',
          jobTitle: 'Senior Product Manager',
          company: 'Elevate Commerce',
          location: 'Boston, MA',
          startDate: '2018-04',
          endDate: '2021-07',
          current: false,
          bullets: [
            'Spearheaded checkout conversion optimization program that lifted cart completion rates by 22%, yielding $8.5M in incremental annual GMV.',
            'Launched seamless 1-click checkout with Apple Pay and Google Pay across mobile apps and web platforms.',
            'Conducted over 120 customer discovery interviews and analyzed Amplitude behavioral telemetry to prioritize product backlog items.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Master of Business Administration (MBA)',
          fieldOfStudy: 'Product Management & Technology Strategy',
          institution: 'Columbia Business School',
          location: 'New York, NY',
          startDate: '2016-09',
          endDate: '2018-05',
          current: false,
          gpa: '3.90 / 4.0',
          honors: 'Dean\'s Scholar'
        }
      ],
      skills: [
        {
          id: 'skill-1',
          category: 'Product Strategy & Vision',
          skills: ['Product Roadmapping', 'User Discovery', 'Go-To-Market (GTM)', 'A/B Testing', 'Customer Interviews', 'Competitive Analysis']
        },
        {
          id: 'skill-2',
          category: 'Analytics & Technical',
          skills: ['SQL (Postgres/Snowflake)', 'Amplitude', 'Mixpanel', 'Google Analytics 4', 'Tableau', 'Jira / Confluence', 'Figma']
        }
      ],
      projects: [],
      certifications: [
        {
          id: 'cert-1',
          name: 'Pragmatic Institute Certified (PMC-III)',
          issuer: 'Pragmatic Institute',
          issueDate: '2020-06',
          expiryDate: '',
          credentialId: 'PI-98124',
          url: 'https://pragmaticinstitute.com'
        }
      ],
      customSections: [],
      customization: {
        template: 'executive',
        fontFamily: 'merriweather',
        fontSize: 'normal',
        accentColor: '#1e3a8a',
        marginSize: 'normal',
        lineSpacing: 'normal',
        paperSize: 'letter',
        showIcons: true,
        sectionOrder: ['personalInfo', 'summary', 'experiences', 'skills', 'education', 'certifications']
      }
    }
  },

  // 10. Staff Machine Learning Engineer (Existing, enhanced)
  {
    id: 'data-scientist',
    label: 'Staff Machine Learning / AI Engineer',
    role: 'AI & Machine Learning',
    category: 'Technology',
    data: {
      personalInfo: {
        fullName: 'Marcus Thorne, Ph.D.',
        jobTitle: 'Staff Machine Learning Engineer',
        email: 'marcus.thorne@email.com',
        phone: '+1 (206) 555-7890',
        location: 'Seattle, WA',
        website: 'https://marcusthorne.ai',
        linkedin: 'https://linkedin.com/in/marcusthorne',
        github: 'https://github.com/marcusthorne',
        summary: 'Staff Machine Learning Engineer and Researcher with 6+ years specializing in Deep Learning, Large Language Models (LLMs), and predictive modeling at scale. Published author in NeurIPS and ICML. Proven ability to translate cutting-edge ML research into high-throughput production inference systems serving tens of millions of users.'
      },
      experiences: [
        {
          id: 'exp-1',
          jobTitle: 'Staff Machine Learning Engineer',
          company: 'Hyperion AI Labs',
          location: 'Seattle, WA',
          startDate: '2022-01',
          endDate: '',
          current: true,
          bullets: [
            'Spearheaded the development and fine-tuning of domain-specific 13B and 70B parameter LLMs using LoRA, QLoRA, and FlashAttention-2, achieving 94% task accuracy on financial compliance benchmark.',
            'Architected GPU-accelerated inference cluster utilizing vLLM and TensorRT-LLM, reducing latency by 3.8x and cutting hardware expenditure by $280,000/year.',
            'Implemented retrieval-augmented generation (RAG) pipelines over 40M enterprise documents with vector databases (Pinecone & Milvus).'
          ]
        },
        {
          id: 'exp-2',
          jobTitle: 'Senior Data Scientist',
          company: 'Predictive Dynamics Inc.',
          location: 'San Francisco, CA',
          startDate: '2018-09',
          endDate: '2021-12',
          current: false,
          bullets: [
            'Engineered fraud detection gradient boosted decision tree (LightGBM) models analyzing $1.2B in credit card transactions with 99.4% precision and 0.02% false positive rate.',
            'Built real-time streaming feature store using Feast and Apache Flink, reducing data drift latency from 24 hours to under 2 seconds.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Ph.D. in Computer Science',
          fieldOfStudy: 'Machine Learning & Statistical Inference',
          institution: 'University of Washington',
          location: 'Seattle, WA',
          startDate: '2014-09',
          endDate: '2018-06',
          current: false,
          gpa: '3.95 / 4.0',
          honors: 'NSF Graduate Research Fellow'
        }
      ],
      skills: [
        {
          id: 'skill-1',
          category: 'Machine Learning & AI',
          skills: ['PyTorch', 'TensorFlow', 'Transformers (HuggingFace)', 'vLLM', 'TensorRT', 'LangChain', 'LlamaIndex', 'scikit-learn']
        },
        {
          id: 'skill-2',
          category: 'Data & Cloud Infrastructure',
          skills: ['Python', 'SQL', 'C++', 'Spark / PySpark', 'Ray', 'Kubernetes', 'Docker', 'AWS SageMaker', 'Milvus / Pinecone']
        }
      ],
      projects: [],
      certifications: [],
      customSections: [],
      customization: {
        template: 'technical-grid',
        fontFamily: 'mono',
        fontSize: 'compact',
        accentColor: '#059669',
        marginSize: 'compact',
        lineSpacing: 'compact',
        paperSize: 'a4',
        showIcons: true,
        sectionOrder: ['personalInfo', 'summary', 'experiences', 'skills', 'education']
      }
    }
  },

  // 11. Entry Level / Recent CS Graduate
  {
    id: 'recent-grad',
    label: 'Entry Level / Recent Graduate',
    role: 'Graduate & Student',
    category: 'Technology',
    data: {
      personalInfo: {
        fullName: 'Samantha Rivera',
        jobTitle: 'Junior Software Engineer',
        email: 'samantha.rivera@email.com',
        phone: '+1 (312) 555-4321',
        location: 'Chicago, IL',
        website: 'https://samantharivera.me',
        linkedin: 'https://linkedin.com/in/samantharivera',
        github: 'https://github.com/samantharivera',
        summary: 'Enthusiastic Computer Science graduate with hands-on internship experience in full stack web development and cloud deployments. Strong foundation in data structures, algorithms, and modern JavaScript/TypeScript ecosystems. Passionate about building accessible, performant software solutions in collaborative agile environments.'
      },
      experiences: [
        {
          id: 'exp-1',
          jobTitle: 'Software Engineering Intern',
          company: 'Acme Cloud Systems',
          location: 'Chicago, IL',
          startDate: '2023-06',
          endDate: '2023-08',
          current: false,
          bullets: [
            'Collaborated with senior engineers to implement user notification microservice with Node.js and AWS SQS, handling 250,000+ alerts daily.',
            'Refactored frontend settings dashboard in React and Tailwind CSS, improving accessibility score to 100 on Google Lighthouse.',
            'Authored 45+ unit tests using Jest and React Testing Library, raising team component test coverage by 15%.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science (Major), Mathematics (Minor)',
          institution: 'University of Illinois Urbana-Champaign',
          location: 'Urbana, IL',
          startDate: '2020-08',
          endDate: '2024-05',
          current: false,
          gpa: '3.88 / 4.0',
          honors: 'Dean\'s List (All Semesters), Grace Hopper Conference Scholar'
        }
      ],
      skills: [
        {
          id: 'skill-1',
          category: 'Programming Languages',
          skills: ['Java', 'Python', 'C/C++', 'TypeScript', 'JavaScript', 'SQL', 'HTML/CSS']
        },
        {
          id: 'skill-2',
          category: 'Frameworks & Libraries',
          skills: ['React', 'Node.js', 'Express', 'Next.js', 'Tailwind CSS']
        }
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'EcoTrack — Carbon Footprint Calculator',
          subtitle: 'Full Stack Web App with Real-Time Emissions Analytics',
          link: 'https://ecotrack-demo.vercel.app',
          github: 'https://github.com/samantharivera/ecotrack',
          startDate: '2023-09',
          endDate: '2023-12',
          bullets: [
            'Developed full stack application tracking daily commute and electricity emissions with interactive progress charts.',
            'Integrated EPA emissions API and implemented JWT-authenticated REST endpoints with PostgreSQL and Prisma ORM.'
          ],
          techStack: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Prisma', 'Tailwind']
        }
      ],
      certifications: [],
      customSections: [],
      customization: {
        template: 'modern-clean',
        fontFamily: 'roboto',
        fontSize: 'normal',
        accentColor: '#0284c7',
        marginSize: 'normal',
        lineSpacing: 'normal',
        paperSize: 'a4',
        showIcons: true,
        sectionOrder: ['personalInfo', 'summary', 'education', 'skills', 'projects', 'experiences']
      }
    }
  }
];

export const EMPTY_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: ''
  },
  experiences: [],
  education: [],
  skills: [
    {
      id: 'skill-1',
      category: 'Core Skills',
      skills: []
    }
  ],
  projects: [],
  certifications: [],
  customSections: [],
  customization: {
    template: 'ats-classic',
    fontFamily: 'inter',
    fontSize: 'normal',
    accentColor: '#0f172a',
    marginSize: 'normal',
    lineSpacing: 'normal',
    paperSize: 'a4',
    showIcons: true,
    sectionOrder: ['personalInfo', 'summary', 'experiences', 'education', 'skills', 'projects', 'certifications', 'customSections']
  }
};
