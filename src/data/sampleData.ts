import { Lead, Course, Counselor, FollowUp } from '../types';

export const sampleCounselors: Counselor[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@dmhca.edu',
    phone: '+91 9876543210',
    department: 'Admissions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Mr. Rajesh Kumar',
    email: 'rajesh.kumar@dmhca.edu',
    phone: '+91 9876543211',
    department: 'Student Affairs',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Ms. Sunita Reddy',
    email: 'sunita.reddy@dmhca.edu',
    phone: '+91 9876543212',
    department: 'Course Coordinator',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Dr. Amit Patel',
    email: 'amit.patel@dmhca.edu',
    phone: '+91 9876543213',
    department: 'Fellowship Programs',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const sampleCourses: Course[] = [
  // Fellowship Programs
  {
    id: '1',
    name: 'Fellowship in Emergency Medicine',
    category: 'Fellowship',
    price: 450000,
    duration: '2 Years',
    eligibility: 'MBBS with 1 year experience',
    description: 'Comprehensive fellowship program in emergency medicine with hands-on training',
    isActive: true
  },
  {
    id: '2',
    name: 'Fellowship in Critical Care Medicine',
    category: 'Fellowship',
    price: 500000,
    duration: '2 Years',
    eligibility: 'MD/MS or DNB',
    description: 'Advanced training in intensive care unit management and critical care protocols',
    isActive: true
  },
  {
    id: '3',
    name: 'Fellowship in Interventional Cardiology',
    category: 'Fellowship',
    price: 650000,
    duration: '1 Year',
    eligibility: 'DM Cardiology or equivalent',
    description: 'Specialized training in cardiac interventional procedures',
    isActive: true
  },
  {
    id: '4',
    name: 'Fellowship in Trauma Surgery',
    category: 'Fellowship',
    price: 480000,
    duration: '18 Months',
    eligibility: 'MS General Surgery',
    description: 'Comprehensive trauma surgery training with emergency protocols',
    isActive: true
  },
  {
    id: '5',
    name: 'Fellowship in Pediatric Surgery',
    category: 'Fellowship',
    price: 520000,
    duration: '2 Years',
    eligibility: 'MS General Surgery with pediatric experience',
    description: 'Specialized pediatric surgical procedures and patient care',
    isActive: true
  },
  // PG Diploma Programs
  {
    id: '6',
    name: 'PG Diploma in Hospital Administration',
    category: 'PG Diploma',
    price: 180000,
    duration: '1 Year',
    eligibility: 'MBBS or MBA',
    description: 'Healthcare management and hospital administration skills',
    isActive: true
  },
  {
    id: '7',
    name: 'PG Diploma in Medical Ethics',
    category: 'PG Diploma',
    price: 120000,
    duration: '6 Months',
    eligibility: 'MBBS or healthcare background',
    description: 'Ethics in medical practice and healthcare delivery',
    isActive: true
  },
  {
    id: '8',
    name: 'PG Diploma in Public Health',
    category: 'PG Diploma',
    price: 150000,
    duration: '1 Year',
    eligibility: 'MBBS or health sciences degree',
    description: 'Community health management and public health policies',
    isActive: true
  },
  {
    id: '9',
    name: 'PG Diploma in Clinical Research',
    category: 'PG Diploma',
    price: 200000,
    duration: '1 Year',
    eligibility: 'MBBS, BDS, or life sciences graduate',
    description: 'Clinical trial management and research methodologies',
    isActive: true
  },
  {
    id: '10',
    name: 'PG Diploma in Medical Education',
    category: 'PG Diploma',
    price: 160000,
    duration: '1 Year',
    eligibility: 'Medical degree with teaching interest',
    description: 'Medical teaching methodologies and curriculum development',
    isActive: true
  },
  // Certification Programs
  {
    id: '11',
    name: 'Basic Life Support (BLS) Certification',
    category: 'Certification',
    price: 5000,
    duration: '2 Days',
    eligibility: 'Healthcare professionals',
    description: 'Essential life-saving techniques and emergency response',
    isActive: true
  },
  {
    id: '12',
    name: 'Advanced Cardiac Life Support (ACLS)',
    category: 'Certification',
    price: 12000,
    duration: '3 Days',
    eligibility: 'BLS certified healthcare professionals',
    description: 'Advanced cardiovascular emergency procedures',
    isActive: true
  },
  {
    id: '13',
    name: 'Pediatric Advanced Life Support (PALS)',
    category: 'Certification',
    price: 15000,
    duration: '2 Days',
    eligibility: 'ACLS certified with pediatric experience',
    description: 'Pediatric emergency care and resuscitation techniques',
    isActive: true
  },
  {
    id: '14',
    name: 'Medical Simulation Training',
    category: 'Certification',
    price: 25000,
    duration: '5 Days',
    eligibility: 'Medical professionals',
    description: 'Hands-on simulation-based medical training',
    isActive: true
  },
  {
    id: '15',
    name: 'Infection Control Certification',
    category: 'Certification',
    price: 8000,
    duration: '2 Days',
    eligibility: 'Healthcare workers',
    description: 'Hospital infection prevention and control protocols',
    isActive: true
  }
];

export const sampleLeads: Lead[] = [
  {
    id: '1',
    name: 'Dr. Ananya Nair',
    email: 'ananya.nair@email.com',
    phone: '+91 9876543220',
    courseInterest: 'Fellowship in Emergency Medicine',
    source: 'Website',
    status: 'Hot',
    assignedCounselor: '1',
    createdAt: '2024-12-01T10:30:00Z',
    updatedAt: '2024-12-15T14:20:00Z',
    priority: 'High',
    location: 'Mumbai',
    notes: 'Very interested, has relevant experience'
  },
  {
    id: '2',
    name: 'Dr. Vikram Singh',
    email: 'vikram.singh@email.com',
    phone: '+91 9876543221',
    courseInterest: 'Fellowship in Critical Care Medicine',
    source: 'Referral',
    status: 'Warm',
    assignedCounselor: '2',
    createdAt: '2024-12-02T09:15:00Z',
    updatedAt: '2024-12-14T16:45:00Z',
    priority: 'Medium',
    location: 'Delhi',
    notes: 'Considering multiple options'
  },
  {
    id: '3',
    name: 'Dr. Meera Gupta',
    email: 'meera.gupta@email.com',
    phone: '+91 9876543222',
    courseInterest: 'PG Diploma in Hospital Administration',
    source: 'Social Media',
    status: 'Follow-Up Needed',
    assignedCounselor: '1',
    createdAt: '2024-12-03T11:20:00Z',
    updatedAt: '2024-12-13T13:30:00Z',
    priority: 'Medium',
    location: 'Bangalore',
    notes: 'Needs more information about career prospects'
  },
  {
    id: '4',
    name: 'Dr. Arjun Reddy',
    email: 'arjun.reddy@email.com',
    phone: '+91 9876543223',
    courseInterest: 'Fellowship in Interventional Cardiology',
    source: 'Conference',
    status: 'Hot',
    assignedCounselor: '4',
    createdAt: '2024-12-04T08:45:00Z',
    updatedAt: '2024-12-15T10:15:00Z',
    priority: 'High',
    location: 'Hyderabad',
    notes: 'Excellent background, ready to proceed'
  },
  {
    id: '5',
    name: 'Dr. Kavitha Menon',
    email: 'kavitha.menon@email.com',
    phone: '+91 9876543224',
    courseInterest: 'PG Diploma in Clinical Research',
    source: 'Email Campaign',
    status: 'Cold',
    assignedCounselor: '3',
    createdAt: '2024-12-05T15:30:00Z',
    updatedAt: '2024-12-12T09:20:00Z',
    priority: 'Low',
    location: 'Chennai',
    notes: 'Initial inquiry, limited engagement'
  },
  // Adding more leads to reach 50
  {
    id: '6',
    name: 'Dr. Rohit Sharma',
    email: 'rohit.sharma@email.com',
    phone: '+91 9876543225',
    courseInterest: 'Fellowship in Trauma Surgery',
    source: 'Website',
    status: 'Converted',
    assignedCounselor: '2',
    createdAt: '2024-11-20T12:00:00Z',
    updatedAt: '2024-12-10T14:30:00Z',
    priority: 'High',
    location: 'Pune',
    notes: 'Successfully enrolled, payment completed'
  },
  {
    id: '7',
    name: 'Dr. Sneha Joshi',
    email: 'sneha.joshi@email.com',
    phone: '+91 9876543226',
    courseInterest: 'ACLS Certification',
    source: 'Referral',
    status: 'Warm',
    assignedCounselor: '1',
    createdAt: '2024-12-06T10:15:00Z',
    updatedAt: '2024-12-14T11:45:00Z',
    priority: 'Medium',
    location: 'Ahmedabad',
    notes: 'Interested in group enrollment'
  },
  {
    id: '8',
    name: 'Dr. Rajesh Patel',
    email: 'rajesh.patel@email.com',
    phone: '+91 9876543227',
    courseInterest: 'PG Diploma in Medical Ethics',
    source: 'Cold Call',
    status: 'Not Interested',
    assignedCounselor: '3',
    createdAt: '2024-12-07T09:30:00Z',
    updatedAt: '2024-12-11T16:20:00Z',
    priority: 'Low',
    location: 'Surat',
    notes: 'Not currently looking for additional qualifications'
  },
  {
    id: '9',
    name: 'Dr. Priyanka Desai',
    email: 'priyanka.desai@email.com',
    phone: '+91 9876543228',
    courseInterest: 'Fellowship in Pediatric Surgery',
    source: 'Website',
    status: 'Follow-Up Needed',
    assignedCounselor: '4',
    createdAt: '2024-12-08T13:45:00Z',
    updatedAt: '2024-12-13T15:10:00Z',
    priority: 'High',
    location: 'Jaipur',
    notes: 'Excellent candidate, awaiting decision'
  },
  {
    id: '10',
    name: 'Dr. Anil Kumar',
    email: 'anil.kumar@email.com',
    phone: '+91 9876543229',
    courseInterest: 'BLS Certification',
    source: 'Social Media',
    status: 'Hot',
    assignedCounselor: '2',
    createdAt: '2024-12-09T11:20:00Z',
    updatedAt: '2024-12-15T12:30:00Z',
    priority: 'Medium',
    location: 'Lucknow',
    notes: 'Quick decision maker, ready to enroll'
  }
  // Continue with more sample leads...
];

// Add more leads to reach 50 total
for (let i = 11; i <= 50; i++) {
  const statuses: Lead['status'][] = ['Hot', 'Warm', 'Cold', 'Follow-Up Needed', 'Not Interested', 'Converted', 'Lost'];
  const sources = ['Website', 'Referral', 'Social Media', 'Conference', 'Email Campaign', 'Cold Call', 'Walk-in'];
  const priorities: Lead['priority'][] = ['High', 'Medium', 'Low'];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Ahmedabad', 'Kolkata', 'Jaipur', 'Lucknow'];
  
  sampleLeads.push({
    id: i.toString(),
    name: `Dr. Sample Lead ${i}`,
    email: `lead${i}@email.com`,
    phone: `+91 987654${3230 + i}`,
    courseInterest: sampleCourses[Math.floor(Math.random() * sampleCourses.length)].name,
    source: sources[Math.floor(Math.random() * sources.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    assignedCounselor: sampleCounselors[Math.floor(Math.random() * sampleCounselors.length)].id,
    createdAt: new Date(2024, 11, Math.floor(Math.random() * 15) + 1).toISOString(),
    updatedAt: new Date(2024, 11, Math.floor(Math.random() * 15) + 1).toISOString(),
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    location: cities[Math.floor(Math.random() * cities.length)],
    notes: `Sample notes for lead ${i}`
  });
}

export const sampleFollowUps: FollowUp[] = [
  {
    id: '1',
    leadId: '1',
    date: '2024-12-15T10:00:00Z',
    note: 'Discussed course details and career prospects. Very positive response.',
    counselor: 'Dr. Priya Sharma',
    nextReminderDate: '2024-12-20T10:00:00Z',
    completed: true,
    createdAt: '2024-12-15T10:00:00Z'
  },
  {
    id: '2',
    leadId: '2',
    date: '2024-12-14T14:30:00Z',
    note: 'Sent course brochure and fee structure. Awaiting response.',
    counselor: 'Mr. Rajesh Kumar',
    nextReminderDate: '2024-12-18T14:30:00Z',
    completed: true,
    createdAt: '2024-12-14T14:30:00Z'
  },
  {
    id: '3',
    leadId: '3',
    date: '2024-12-13T11:15:00Z',
    note: 'Scheduled call to discuss admission requirements.',
    counselor: 'Dr. Priya Sharma',
    nextReminderDate: '2024-12-17T11:15:00Z',
    completed: false,
    createdAt: '2024-12-13T11:15:00Z'
  },
  {
    id: '4',
    leadId: '4',
    date: '2024-12-15T09:45:00Z',
    note: 'Provided detailed curriculum and faculty information.',
    counselor: 'Dr. Amit Patel',
    nextReminderDate: '2024-12-19T09:45:00Z',
    completed: true,
    createdAt: '2024-12-15T09:45:00Z'
  }
];