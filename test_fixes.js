// Test script to verify fixes
// Tests: 1. Contact request with patient, 2. Moderator booking creation, 3. Study creation with admin

const API_BASE = 'http://localhost:5000/api';

// Test data
const adminToken = 'replace_with_admin_token';
const patientId = 'replace_with_patient_id';

async function testContactAndBooking() {
  console.log('\n=== Test 1: Submit contact request with patient ===');
  try {
    const contactRes = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test Patient',
        email: 'test@patient.com',
        phoneNumber: '123456789',
        subject: 'Test Booking',
        message: 'This is a test message for booking',
        requestType: 'consultation',
        patient: patientId,
      }),
    });
    const contactData = await contactRes.json();
    console.log('Contact created:', contactData.success ? '✓' : '✗');
    console.log('Contact ID:', contactData.contactRequest?._id);

    if (contactData.success) {
      const contactId = contactData.contactRequest._id;

      // Test 2: Book moderator
      console.log('\n=== Test 2: Book moderator for contact ===');
      const bookRes = await fetch(`${API_BASE}/contact/${contactId}/book-moderator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
        },
      });
      const bookData = await bookRes.json();
      console.log('Booking created:', bookData.success ? '✓' : '✗');
      console.log('Booking ID:', bookData.booking?._id);
      console.log('Booking patient:', bookData.booking?.patient);
    }
  } catch (error) {
    console.error('Test 1-2 error:', error.message);
  }
}

async function testStudyCreation() {
  console.log('\n=== Test 3: Create study as admin ===');
  try {
    const studyRes = await fetch(`${API_BASE}/studies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        title: 'Test Study Title',
        description: 'This is a test study description',
        condition: 'Test Condition',
        tags: ['tag1', 'tag2'],
      }),
    });
    const studyData = await studyRes.json();
    console.log('Study created:', studyData.success ? '✓' : '✗');
    console.log('Study ID:', studyData.study?._id);
    if (!studyData.success) {
      console.log('Error:', studyData.message);
    }
  } catch (error) {
    console.error('Test 3 error:', error.message);
  }
}

console.log('Running fix verification tests...');
console.log('Note: Replace tokens and IDs in test_fixes.js before running');
// testContactAndBooking();
// testStudyCreation();
