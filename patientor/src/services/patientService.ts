import patientData from '../../data/patients.json';
import { SecurePatient } from '../types';

const getSecureEntries = (): SecurePatient[] => {
  return patientData
    .map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};

export default { getSecureEntries };