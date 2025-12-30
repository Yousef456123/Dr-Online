export const studyUpdates = [
  {
    id: 'cardio-care',
    title: 'Cardiovascular Lifestyle Reset',
    condition: 'Hypertension',
    role: 'Doctor',
    summary:
      'New ESC guidelines recommend pairing 30 minutes of brisk walking with Mediterranean-inspired meals to reverse early-stage hypertension.',
    recommendations: [
      'Track blood pressure at home twice daily for 14 days.',
      'Switch evening meals to high-fiber, low-sodium bowls.',
      'Schedule tele-visit after two weeks to adjust medication.',
    ],
    publishedOn: '2025-11-05',
    resources: [
      { label: 'ESC 2025 Hypertension Brief', url: '#' },
      { label: 'Heart-Healthy Recipes', url: '#' },
    ],
    tags: ['Lifestyle', 'Remote Monitoring', 'Nutrition'],
  },
  {
    id: 'respira-ai',
    title: 'Respira AI Companion',
    condition: 'Long COVID',
    role: 'Doctor',
    summary:
      'Machine learning triage flags breathing pattern changes 48 hours before symptom relapse, enabling proactive steroid tapering.',
    recommendations: [
      'Upload spirometry data twice a week inside the Respiratory Hub.',
      'Use guided breath-work sessions each morning.',
      'Escalate to pulmonary team if fatigue score exceeds 6.',
    ],
    publishedOn: '2025-10-28',
    resources: [
      { label: 'AI Monitoring Checklist', url: '#' },
      { label: 'Breath-work Audio', url: '#' },
    ],
    tags: ['AI', 'Pulmonology', 'Recovery'],
  },
  {
    id: 'gluco-loop',
    title: 'Closed Loop Glucose Coaching',
    condition: 'Type 2 Diabetes',
    role: 'Patient',
    summary:
      'Community-tested routine combines gentle strength training with closed loop sensors to reduce average glucose by 18%.',
    recommendations: [
      'Share weekly CGM exports with your assigned mentor.',
      'Complete 15-minute resistance circuits on alternate days.',
      'Log meals with protein-first approach inside the app.',
    ],
    publishedOn: '2025-10-12',
    resources: [
      { label: 'Beginner Strength Guide', url: '#' },
      { label: 'CGM Export Walkthrough', url: '#' },
    ],
    tags: ['Diabetes', 'Coaching', 'Wearables'],
  },
]

