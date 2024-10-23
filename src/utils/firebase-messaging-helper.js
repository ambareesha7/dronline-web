import router from '@/router';

export const generateActionUrl = (action, data = {}) => {
  let url = window.location.origin;
  switch (action) {
    case 'new_notification':
      url += router.resolve({
        name: 'notifications'
      }).location.path;
      break;
    case 'doctor_category_invitation':
      url += router.resolve({
        name: 'dashboard'
      }).location.path;
      break;
    case 'visit_has_been_scheduled':
    case 'visit_has_been_confirmed':
      url += router.resolve({
        name: 'availability'
      }).location.path;
      break;
    case 'visit_reminder_for_specialist':
      url += router.resolve({
        name: 'patient-record',
        params: {
          patientId: data.patient_id,
          id: data.record_id
        }
      }).location.path;
      break;
    default:
      break;
  }
  return url;
};
