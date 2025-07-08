
export interface Company {
  id: string;
  name: string;
  industry: string;
  employees: string;
  website: string;
  revenue: string;
  description: string;
  keyTechnologies: string[];
  recentNews: string[];
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  department: string;
  lastContact: string;
  conversationHistory: Array<{
    date: string;
    type: string;
    summary: string;
  }>;
  activeDeals: Array<{
    name: string;
    value: string;
    stage: string;
  }>;
  notes: string[];
}

export const mockCompanies: Company[] = [
  { 
    id: "001XX000003DHPqYAO", 
    name: "TechCorp Industries", 
    industry: "Technology", 
    employees: "1000-5000", 
    website: "techcorp.com",
    revenue: "$50M-100M",
    description: "Leading technology company specializing in enterprise software solutions and cloud infrastructure. Known for innovative approaches to digital transformation.",
    keyTechnologies: ["Cloud Computing", "AI/ML", "Cybersecurity", "Data Analytics"],
    recentNews: [
      "Announced new partnership with major cloud provider",
      "Launched AI-powered analytics platform",
      "Expanded into European markets"
    ]
  },
  { 
    id: "001XX000003DHPrYAO", 
    name: "InnovateTech Solutions", 
    industry: "Software", 
    employees: "500-1000", 
    website: "innovatetech.com",
    revenue: "$25M-50M",
    description: "Software development company focusing on custom enterprise applications and mobile solutions. Strong presence in fintech and healthcare sectors.",
    keyTechnologies: ["Mobile Development", "Blockchain", "API Integration", "DevOps"],
    recentNews: [
      "Raised Series B funding round",
      "Acquired mobile development startup",
      "Launched new fintech platform"
    ]
  },
  { 
    id: "001XX000003DHPsYAO", 
    name: "GlobalTech Enterprises", 
    industry: "IT Services", 
    employees: "5000+", 
    website: "globaltech.com",
    revenue: "$100M+",
    description: "Global IT services provider with expertise in digital transformation and enterprise solutions.",
    keyTechnologies: ["Enterprise Software", "Cloud Migration", "IT Consulting", "Digital Transformation"],
    recentNews: [
      "Opened new development center in Asia",
      "Launched enterprise AI platform",
      "Acquired cloud consulting firm"
    ]
  },
  { 
    id: "001XX000003DHPtYAO", 
    name: "FutureTech Inc", 
    industry: "AI/ML", 
    employees: "100-500", 
    website: "futuretech.com",
    revenue: "$10M-25M",
    description: "AI and machine learning startup focused on enterprise automation and intelligent analytics.",
    keyTechnologies: ["Machine Learning", "Natural Language Processing", "Computer Vision", "Automation"],
    recentNews: [
      "Secured Series A funding",
      "Partnership with major tech company",
      "Launched AI automation platform"
    ]
  },
  { 
    id: "001XX000003DHPuYAO", 
    name: "Smart Solutions LLC", 
    industry: "Consulting", 
    employees: "50-100", 
    website: "smartsolutions.com",
    revenue: "$5M-10M",
    description: "Technology consulting firm specializing in digital transformation and business process optimization.",
    keyTechnologies: ["Business Intelligence", "Process Automation", "Data Analytics", "Digital Strategy"],
    recentNews: [
      "Expanded consulting services",
      "New partnership with software vendor",
      "Launched digital transformation practice"
    ]
  }
];

export const mockContacts: Record<string, Contact[]> = {
  "001XX000003DHPqYAO": [
    {
      id: "003XX000004TmiQYAS",
      name: "John Smith",
      email: "john.smith@techcorp.com",
      phone: "+1 (555) 123-4567",
      title: "IT Director",
      department: "Information Technology",
      lastContact: "2024-01-15",
      conversationHistory: [
        {
          date: "2024-01-15",
          type: "Email",
          summary: "Discussed cloud migration strategy and security concerns"
        },
        {
          date: "2024-01-10",
          type: "Phone Call",
          summary: "Initial discovery call about IT infrastructure needs"
        },
        {
          date: "2023-12-20",
          type: "Meeting",
          summary: "Attended demo of our cybersecurity platform"
        }
      ],
      activeDeals: [
        {
          name: "TechCorp Cloud Migration",
          value: "$150,000",
          stage: "Proposal"
        },
        {
          name: "Security Assessment",
          value: "$25,000",
          stage: "Negotiation"
        }
      ],
      notes: [
        "Primary decision maker for IT purchases",
        "Concerned about data security and compliance",
        "Budget approved for Q2 2024",
        "Prefers detailed technical documentation"
      ]
    }
  ],
  "001XX000003DHPrYAO": [
    {
      id: "003XX000004TmiRYAS",
      name: "Sarah Johnson",
      email: "sarah.j@innovatetech.com",
      phone: "+1 (555) 987-6543",
      title: "CTO",
      department: "Technology",
      lastContact: "2024-01-12",
      conversationHistory: [
        {
          date: "2024-01-12",
          type: "Video Call",
          summary: "Technical deep-dive on API integration capabilities"
        },
        {
          date: "2024-01-08",
          type: "Email",
          summary: "Shared technical specifications and requirements"
        }
      ],
      activeDeals: [
        {
          name: "API Platform License",
          value: "$75,000",
          stage: "Closed Won"
        }
      ],
      notes: [
        "Highly technical, appreciates detailed demos",
        "Previous customer with positive experience",
        "Interested in enterprise-level solutions"
      ]
    }
  ]
};

export const getCompanyById = (id: string): Company | undefined => {
  return mockCompanies.find(company => company.id === id);
};

export const getContactsByCompanyId = (companyId: string): Contact[] => {
  return mockContacts[companyId] || [];
};

export const getContactById = (contactId: string): Contact | undefined => {
  for (const contacts of Object.values(mockContacts)) {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) return contact;
  }
  return undefined;
};
