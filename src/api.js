import axios from 'axios';
import constPaths from '@/constants/constant-paths';
import Vue from 'vue';

const buildPath = path => `${constPaths.API_URL}/${path}`;

const prepareHeaders = method => {
  const headers = {};
  headers.Accept = 'application/x-protobuf';
  if (method !== 'get') headers['Content-type'] = 'application/x-protobuf';
  const authorization = Vue.cookie.get('auth_token');
  if (authorization) headers['x-auth-token'] = authorization;
  return headers;
};

const api = {
  proxy(data) {
    return axios.post(buildPath('proxy'), data)
      .then(response => response.data);
  },

  signIn(data) {
    const headers = prepareHeaders();
    return axios.post(buildPath('panel_api/login'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  signUp(data, signUpType) {
    const headers = prepareHeaders();
    return axios.post(buildPath(`panel_api/signup?type=${signUpType}`), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  verifySignUp(data) {
    const headers = prepareHeaders();
    return axios.post(buildPath('panel_api/verify'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  checkProfileStatus() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/profile/status'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  passwordRecoveryRequest(data) {
    const headers = prepareHeaders();
    return axios.post(buildPath('panel_api/send_password_recovery'), data, {headers})
      .then(response => response.data);
  },

  recoverPassword(data) {
    const headers = prepareHeaders();
    return axios.post(buildPath('panel_api/recover_password'), data, {headers})
      .then(response => response.data);
  },

  changePassword(data) {
    const headers = prepareHeaders();
    return axios.post(buildPath('panel_api/change_password'), data, {headers})
      .then(response => response.data);
  },

  confirmPasswordChange(data) {
    const headers = prepareHeaders();
    return axios.post(buildPath('panel_api/change_password/confirm'), data, {headers})
      .then(response => response.data);
  },

  getChannelsToken() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/channels_token'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchPatientsQueue() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/calls/patients_queue'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchNursesQueue() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/calls/pending_nurse_to_gp_calls'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchToDoctorQueue(id) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath(`panel_api/calls/doctor_category_invitations/${id}`), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchPatientTimeline(id) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath(`panel_api/timelines/${id}`), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchPatientBasicInfo(id) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath(`panel_api/patients/${id}/basic_info`), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  updatePatientBasicInfo(data, id) {
    const headers = prepareHeaders();
    return axios.put(buildPath(`panel_api/patients/${id}/basic_info`), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchPatientRecords(id, next_token) {
    const headers = prepareHeaders('get');
    return axios.get(
      buildPath(`panel_api/emr/patients/${id}/records`),
      {
        params: {
          next_token
        },
        headers,
        responseType: 'arraybuffer'
      }
    ).then(response => response.data);
  },


  fetchPatientRecord({ patient_id, record_id }) {
    const headers = prepareHeaders('get');
    return axios.get(
      buildPath(`panel_api/emr/patients/${patient_id}/records/${record_id}`),
      {
        headers,
        responseType: 'arraybuffer'
      }
    ).then(response => response.data);
  },

  fetchPatientUploadedDocuments(record_id) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath(`panel_api/visits/${record_id}/uploaded_documents`),{ headers, responseType: 'arraybuffer' })
      .then(response => response.data);
  },

  invitePatient(data) {
    const headers = prepareHeaders();
    return axios.post(buildPath('panel_api/emr/patients/invite'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  createPatient(data) {
    const headers = prepareHeaders();
    return axios.post(buildPath('/panel_api/emr/patients'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  addMedicalSummary({ patient_id, record_id, data }) {
    const headers = prepareHeaders();
    return axios.post(buildPath(`panel_api/emr/patients/${patient_id}/records/${record_id}/medical_summaries`), data, {headers})
      .then(response => response.data);
  },

  skipMedicalSummary({ patient_id, record_id }) {
    const headers = prepareHeaders();
    return axios.post(buildPath(`panel_api/emr/patients/${patient_id}/records/${record_id}/medical_summaries/skip`), {}, {headers})
      .then(response => response.data);
  },

  fetchMedicalSummary({ patient_id, record_id }) {
    const headers = prepareHeaders('get');
    return axios.get(
      buildPath(`panel_api/emr/patients/${patient_id}/records/${record_id}/medical_summaries`),
      {
        headers,
        responseType: 'arraybuffer'
      }
    ).then(response => response.data);
  },

  fetchLatestMedicalSummary({ patient_id, record_id }) {
    const headers = prepareHeaders('get');
    return axios.get(
      buildPath(`panel_api/emr/patients/${patient_id}/records/${record_id}/medical_summaries/latest_for_specialist`),
      {
        headers,
        responseType: 'arraybuffer'
      }
    ).then(response => response.data);
  },

  fetchMedicalConditions({ filter }) {
    const headers = prepareHeaders('get');
    const url = 'panel_api/emr/medical_library/conditions';
    return axios.get(
      buildPath(url),
      {
        params: {
          filter
        },
        headers,
        responseType: 'arraybuffer'
      }
    ).then(response => response.data);
  },

  fetchMedicalProcedures({ filter }) {
    const headers = prepareHeaders('get');
    const url = 'panel_api/emr/medical_library/procedures';
    return axios.get(
      buildPath(url),
      {
        params: {
          filter
        },
        headers,
        responseType: 'arraybuffer'
      }
    ).then(response => response.data);
  },

  fetchMedicalMedications({ filter }) {
    const headers = prepareHeaders('get');
    const url = 'panel_api/emr/medical_library/medications';
    return axios.get(
      buildPath(url),
      {
        params: {
          filter
        },
        headers,
        responseType: 'arraybuffer'
      }
    ).then(response => response.data);
  },

  fetchMedicalTestsByCategories() {
    const headers = prepareHeaders('get');
    const url = 'panel_api/emr/medical_library/tests_by_categories';
    return axios.get(buildPath(url), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  closePatientRecord({ patient_id, record_id }) {
    const headers = prepareHeaders();
    return axios.post(buildPath(`panel_api/emr/patients/${patient_id}/records/${record_id}/close`), {}, {headers})
      .then(response => response.data);
  },

  fetchPatientLocation(recordId) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath(`panel_api/calls/${recordId}/patient_location_coordinates`), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchPatientAddress(id) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath(`panel_api/patients/${id}/address`), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchPatientInsurance(id) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath(`panel_api/patients/${id}/insurance`), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  updatePatientAddress(data, id) {
    const headers = prepareHeaders();
    return axios.put(buildPath(`panel_api/patients/${id}/address`), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchPatientHistory(id) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath(`panel_api/patients/${id}/history`), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  updatePatientHistory(id, data) {
    const headers = prepareHeaders();
    return axios.put(buildPath(`panel_api/patients/${id}/history`), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  updatePatientHistories(id, data) {
    const headers = prepareHeaders();
    return axios.put(buildPath(`panel_api/patients/${id}/history/all`), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchLatestVitals(id) {
    const headers = prepareHeaders();
    return axios.get(buildPath(`panel_api/emr/patients/${id}/vitals`), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchVitalsHistory(patientId, params) {
    const headers = prepareHeaders('get');
    return axios.get(
      buildPath(`panel_api/emr/patients/${patientId}/vitals/history`),
      { params, headers, responseType: 'arraybuffer' }
    ).then(response => response.data);
  },

  fetchPatientHPI({ patient_id, record_id }) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath(`panel_api/emr/patients/${patient_id}/records/${record_id}/hpi`), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  updatePatientHPI({ patient_id, record_id, data }) {
    const headers = prepareHeaders();
    return axios.put(buildPath(`panel_api/emr/patients/${patient_id}/records/${record_id}/hpi`), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchHpiHistory({ patient_id, record_id }) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath(`panel_api/emr/patients/${patient_id}/records/${record_id}/hpi/history`), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  provideVitals(patientId, recordId, data) {
    const headers = prepareHeaders();
    return axios.post(buildPath(`panel_api/emr/patients/${patientId}/records/${recordId}/vitals`), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  orderTests(patientId, recordId, data) {
    const headers = prepareHeaders();
    return axios.post(buildPath(`panel_api/emr/patients/${patientId}/records/${recordId}/ordered_tests`), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  assignMedications(patientId, recordId, data) {
    const headers = prepareHeaders();
    return axios.post(buildPath(`panel_api/emr/patients/${patientId}/records/${recordId}/medications`), data, {headers})
      .then(response => response.data);
  },

  dispatchTriageUnit(data) {
    const headers = prepareHeaders();
    return axios.post(buildPath('panel_api/dispatches'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  requestDispatchToPatient(data) {
    const headers = prepareHeaders();
    return axios.post(buildPath('panel_api/dispatches/request_dispatch_to_patient'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchDispatches() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/dispatches/pending_dispatches'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchDispatch(id) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath(`panel_api/dispatches/${id}/details`), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchOngoingDispatch() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/dispatches/ongoing_dispatch'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchCurrentDispatches() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/dispatches/current_dispatches'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchEndedDispatches(params) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/dispatches/ended_dispatches'), {params, headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  acceptDispatch(id) {
    const headers = prepareHeaders();
    return axios.post(buildPath(`panel_api/dispatches/${id}/take_pending_dispatch`), null, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  endDispatch(id) {
    const headers = prepareHeaders();
    return axios.post(buildPath(`panel_api/dispatches/${id}/end_dispatch`), null, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  nurseCallToPatient(data) {
    const headers = prepareHeaders();
    return axios.post(buildPath('panel_api/calls/nurse_patient_calls'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  specialistCallToPatient(data) {
    const headers = prepareHeaders();
    return axios.post(buildPath('panel_api/calls/specialist_patient_calls'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchFamilyMemberCallInvitation(invitationId) {
    const headers = prepareHeaders();
    return axios.get(buildPath(`public_api/calls/family_member_invitations/${invitationId}`), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchTimeslots(params) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/visits/my_calendar'), {params, headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  createTimeslots(data) {
    const headers = prepareHeaders();
    return axios.post(buildPath('panel_api/visits/my_calendar/create_timeslots'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  removeTimeslots(data) {
    const headers = prepareHeaders();
    return axios.delete(buildPath('panel_api/visits/my_calendar/remove_timeslots'), {data, headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  scheduleTeamMemberVisit(specialistId, data) {
    const headers = prepareHeaders();
    return axios.post(buildPath(`panel_api/visits/specialist_calendar/${specialistId}/create_visit`), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  createTeamMemberTimeslots(specialistId, data) {
    const headers = prepareHeaders();
    return axios.post(buildPath(`panel_api/visits/specialist_calendar/${specialistId}/create_timeslots`), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  removeTeamMemberTimeslots(specialistId, data) {
    const headers = prepareHeaders();
    return axios.delete(buildPath(`panel_api/visits/specialist_calendar/${specialistId}/remove_timeslots`), {data, headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },


  fetchBasicInfo() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/profile/v2/basic_info'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  updateBasicInfo(data) {
    const headers = prepareHeaders();
    return axios.put(buildPath('panel_api/profile/v2/basic_info'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchDescription() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/profile/v2/description'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  updateDescription(data) {
    const headers = prepareHeaders();
    return axios.put(buildPath('panel_api/profile/v2/description'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchEducation() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/profile/v2/education'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  updateEducation(data) {
    const headers = prepareHeaders();
    return axios.put(buildPath('panel_api/profile/v2/education'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchWorkExperience() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/profile/v2/work_experience'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  updateWorkExperience(data) {
    const headers = prepareHeaders();
    return axios.put(buildPath('panel_api/profile/v2/work_experience'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchMedicalInfo() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/profile/v2/medical_info'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  updateMedicalInfo(data) {
    const headers = prepareHeaders();
    return axios.put(buildPath('panel_api/profile/v2/medical_info'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchBio() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/profile/bio'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  updateBio(data) {
    const headers = prepareHeaders();
    return axios.put(buildPath('panel_api/profile/bio'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchPrices() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/profile/prices'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  updatePrices(data) {
    const headers = prepareHeaders();
    return axios.put(buildPath('panel_api/profile/prices'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchAvailableInsuranceProviders(params) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('api/insurance_providers'), { params, headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchInsuranceProviders() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/profile/v2/insurance_providers'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  updateInsuranceProviders(data) {
    const headers = prepareHeaders();
    return axios.put(buildPath('panel_api/profile/v2/insurance_providers'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchAllMedicalCategories() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/medical_categories'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchMedicalCategories(params = {}) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/profile/medical_categories'), {params, headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  updateMedicalCategories(data) {
    const headers = prepareHeaders();
    return axios.put(buildPath('panel_api/profile/medical_categories'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchLocation() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/profile/location'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  updateLocation(data) {
    const headers = prepareHeaders();
    return axios.put(buildPath('panel_api/profile/location'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchMedicalCredentials() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/profile/medical_credentials'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  updateMedicalCredentials(data) {
    const headers = prepareHeaders();
    return axios.put(buildPath('panel_api/profile/medical_credentials'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchCredentials() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/profile/credentials'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchPackages() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/membership/packages'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchCurrentPackage() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/membership'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchSubscriptionStatus() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/membership/pending_subscription'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  membershipSubscribe(data) {
    const headers = prepareHeaders();
    return axios.post(buildPath('panel_api/membership/subscribe'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  membershipVerify(data) {
    const headers = prepareHeaders();
    return axios.post(buildPath('panel_api/membership/verify'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  addNewVisit(patient_id, data) {
    const headers = prepareHeaders();
    return axios.post(buildPath(`panel_api/emr/patients/${patient_id}/records`), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  cancelVisit(visit_id) {
    const headers = prepareHeaders();
    return axios.post(buildPath(`/panel_api/visits/${visit_id}/move_to_canceled`), null, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchVisit(visit_id) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath(`panel_api/visits/${visit_id}`), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  getProfileImageUrls({file_name, content_type}) {
    const headers = prepareHeaders('get');
    return axios.get(
      buildPath('panel_api/upload/profile_image_url'),
      {
        params: {
          file_name,
          content_type
        },
        headers,
        responseType: 'arraybuffer'
      }
    ).then(response => response.data);
  },

  uploadProfileImage({upload_url, content_type, file}) {
    return axios.put(
      upload_url,
      file,
      {
        headers: {
          'Content-Type': content_type,
          'x-goog-acl': 'public-read',
          'cache-control': 'public,max-age=31536000'
        }
      }
    ).then(response => response.data);
  },

  fetchPatients({ next_token, external, filter }) {
    const headers = prepareHeaders('get');
    let url = 'panel_api/emr/patients';
    if (external) url += '/connected';
    return axios.get(
      buildPath(url),
      {
        params: {
          next_token,
          filter
        },
        headers,
        responseType: 'arraybuffer'
      }
    ).then(response => response.data);
  },

  fetchTeamMemberConnectedPatients(teamMemberId) {
    const headers = prepareHeaders('get');
    const url = `panel_api/emr/patients/connected_to_team_member/${teamMemberId}`;
    return axios.get(
      buildPath(url),
      {
        params: {
          next_token: null,
          limit: 1000,
          filter: null
        },
        headers,
        responseType: 'arraybuffer'
      }
    ).then(response => response.data);
  },

  checkPendingMedicalSummary() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/emr/pending_medical_summary'), { headers, responseType: 'arraybuffer' })
      .then(response => response.data);
  },

  fetchScheduledVisits(params, type, isGP) {
    let typeParam = type;
    if (type === 'pending') {
      typeParam = isGP ? 'pending' : 'pending_for_specialist';
    }
    const headers = prepareHeaders('get');
    return axios.get(buildPath(`panel_api/visits/${typeParam}`), { params, headers, responseType: 'arraybuffer' })
      .then(response => response.data);
  },

  fetchSpecialistEncounters(params) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/emr/encounters'), { params, headers, responseType: 'arraybuffer' })
      .then(response => response.data);
  },

  fetchSpecialistEncountersStats(params) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/emr/encounters/stats'), { params, headers, responseType: 'arraybuffer' })
      .then(response => response.data);
  },

  fetchTests(params) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/emr/tests'), { params, headers, responseType: 'arraybuffer' })
      .then(response => response.data);
  },

  fetchMedications(params) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/emr/medications'), { params, headers, responseType: 'arraybuffer' })
      .then(response => response.data);
  },

  fetchProcedures(params) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/emr/procedures'), { params, headers, responseType: 'arraybuffer' })
      .then(response => response.data);
  },

  pendingVisitCall(data) {
    const headers = prepareHeaders();
    return axios.post(buildPath('panel_api/calls/pending_visit_call'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  doctorPendingVisitCall(data) {
    const headers = prepareHeaders();
    return axios.post(buildPath('panel_api/calls/doctor_pending_visit_call'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchSpecialists(online, params) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath(`panel_api/specialists${online ? '/online' : ''}`), { params, headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchSpecialistsInCategory(id) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath(`panel_api/specialists/category/${id}`), { headers, responseType: 'arraybuffer' })
      .then(response => response.data);
  },

  fetchTimelineEntityComments({ patientId, recordId, entityId }, params) {
    const headers = prepareHeaders('get');
    return axios.get(
      buildPath(`panel_api/emr/patients/${patientId}/records/${recordId}/timeline_items/${entityId}/comments`),
      { params, headers, responseType: 'arraybuffer' }
    ).then(response => response.data);
  },

  addTimelineEntityComment({ patientId, recordId, entityId, data }) {
    const headers = prepareHeaders();
    return axios.post(
      buildPath(`panel_api/emr/patients/${patientId}/records/${recordId}/timeline_items/${entityId}/comments`),
      data,
      { headers, responseType: 'arraybuffer' }
    ).then(response => response.data);
  },

  fetchPatientRelationships(patientId) {
    const headers = prepareHeaders('get');
    return axios.get(
      buildPath(`panel_api/patients/${patientId}/relationship`),
      { headers, responseType: 'arraybuffer' }
    ).then(response => response.data);
  },

  fetchPatientReviewOfSystem(patientId) {
    const headers = prepareHeaders('get');
    return axios.get(
      buildPath(`panel_api/patients/${patientId}/review_of_system`),
      { headers, responseType: 'arraybuffer' }
    ).then(response => response.data);
  },

  fetchReviewOfSystemHistory(patientId, params) {
    const headers = prepareHeaders('get');
    return axios.get(
      buildPath(`panel_api/patients/${patientId}/review_of_system/history`),
      { params, headers, responseType: 'arraybuffer' }
    ).then(response => response.data);
  },

  updateReviewOfSystems(patientId, data) {
    const headers = prepareHeaders();
    return axios.put(buildPath(`panel_api/patients/${patientId}/review_of_system`), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  generateRecordPdf({ patient_id, record_id }) {
    const headers = {
      'x-auth-token': Vue.cookie.get('auth_token'),
      Accept: 'application/pdf'
    };
    return axios.get(buildPath(`panel_api/emr/patients/${patient_id}/records/${record_id}/pdf`), { headers, responseType: 'arraybuffer' })
      .then(response => response);
  },

  fetchNotifications(params) {
    const headers = prepareHeaders('get');
    return axios.get(
      buildPath('panel_api/notifications'),
      { params, headers, responseType: 'arraybuffer' }
    ).then(response => response.data);
  },

  markNotificationAsRead(id) {
    const headers = prepareHeaders();
    return axios.post(
      buildPath(`panel_api/notifications/${id}/mark_as_read`),
      {},
      { headers, responseType: 'arraybuffer' }
    ).then(response => response.data);
  },

  markAllNotificationsAsRead() {
    const headers = prepareHeaders();
    return axios.post(
      buildPath('panel_api/notifications/mark_all_as_read'),
      {},
      { headers, responseType: 'arraybuffer' }
    ).then(response => response.data);
  },

  registerDevice(data) {
    const headers = prepareHeaders();
    return axios.put(buildPath('panel_api/devices'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  unregisterDevice(data) {
    const headers = prepareHeaders();
    return axios.put(buildPath('panel_api/devices/unregister'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  getTeamDetails() {
    const headers = prepareHeaders();
    return axios.get(buildPath('panel_api/my_team'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  getTeamInvitations() {
    const headers = prepareHeaders();
    return axios.get(buildPath('panel_api/team_invitations'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  acceptTeamInvitation(teamId) {
    const headers = prepareHeaders();
    return axios.put(buildPath(`panel_api/team_invitations/${teamId}/accept`), {}, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  declineTeamInvitation(teamId) {
    const headers = prepareHeaders();
    return axios.put(buildPath(`panel_api/team_invitations/${teamId}/decline`), {}, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  createTeam() {
    const headers = prepareHeaders();
    return axios.post(buildPath('panel_api/my_team'), {}, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  setTeamLocation(data) {
    const headers = prepareHeaders();
    return axios.put(buildPath('panel_api/my_team/location'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  setTeamBranding(data) {
    const headers = prepareHeaders();
    return axios.put(buildPath('panel_api/my_team/branding'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  getTeamMembers() {
    const headers = prepareHeaders();
    return axios.get(buildPath('panel_api/my_team/members'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  setTeamMemberRole(memberId, data) {
    const headers = prepareHeaders();
    return axios.put(buildPath(`panel_api/my_team/members/${memberId}/role`), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  getTeamStats() {
    const headers = prepareHeaders();
    return axios.get(buildPath('panel_api/my_team/stats'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  getTeamUrgentCareStats() {
    const headers = prepareHeaders();
    return axios.get(buildPath('panel_api/my_team/urgent_care_stats'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  removeTeamMember(memberId) {
    const headers = prepareHeaders();
    return axios.delete(buildPath(`panel_api/my_team/members/${memberId}`), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  addTeamMember(data) {
    const headers = prepareHeaders();
    return axios.post(buildPath('panel_api/my_team/members'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  getCountries() {
    const headers = prepareHeaders();
    return axios.get(buildPath('public_api/countries'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  checkIfMembershipPaymentEnabled() {
    const headers = prepareHeaders();
    return axios.get(buildPath('public_api/feature_flags/verify/specialist_membership_payments'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  checkIfPayoutsTabEnabled() {
    const headers = prepareHeaders();
    return axios.get(buildPath('public_api/feature_flags/verify/payouts'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchPayoutsCredentials() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/payouts/credentials'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  updatePayoutsCredentials(data) {
    const headers = prepareHeaders();
    return axios.put(buildPath('panel_api/payouts/credentials'), data, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchPendingWithdrawals() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/payouts/pending_withdrawals'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchWithdrawalsSummary() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/payouts/withdrawals_summary'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchUSBoard2ndOpinions() {
    const headers = prepareHeaders('get');
    return axios.get(buildPath('panel_api/us_board_2nd_opinion'), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchUSBoard2ndOpinionDetails(request_id) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath(`panel_api/us_board_2nd_opinion/${request_id}`), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  updateUSBoard2ndOpinion(payload, request_id) {
    const headers = prepareHeaders();
    return axios.put(buildPath(`panel_api/us_board_2nd_opinion/${request_id}/submit_opinion`), payload, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  saveUSBoard2ndOpinion(payload, request_id) {
    const headers = prepareHeaders();
    return axios.put(buildPath(`panel_api/us_board_2nd_opinion/${request_id}`), payload, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  acceptUSBoard2ndOpinion(request_id) {
    const headers = prepareHeaders();
    return axios.post(buildPath(`panel_api/us_board_2nd_opinion/${request_id}/accept`), {}, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  rejectUSBoard2ndOpinion(request_id) {
    const headers = prepareHeaders();
    return axios.post(buildPath(`panel_api/us_board_2nd_opinion/${request_id}/reject`), {}, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  fetchUSBoard2ndOpinionByVisitId(visit_id) {
    const headers = prepareHeaders('get');
    return axios.get(buildPath(`panel_api/us_board_2nd_opinion/by_visit_id/${visit_id}`), {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },

  requestAccountDelete() {
    const headers = prepareHeaders();
    return axios.post(buildPath(`panel_api/delete_account`), {}, {headers, responseType: 'arraybuffer'})
      .then(response => response.data);
  },
};

export default api;
