import patientList from './emr/patients-list';
import patientDetails from './emr/patient-details';
import patientRecords from './emr/patient-records';
import patientRecordDetails from './emr/patient-record-details';
import patientHealthInfo from './emr/patient-health-info';

describe('EMR', () => {
  context('Patients list', patientList);
  context('Patient details', patientDetails);
  context('Patient records', patientRecords);
  context('Patient record details', patientRecordDetails);
  context('Patient health info', patientHealthInfo);
});
