import patientData from '../../data/patients.json';
import { SecurePatient, NewPatient } from '../types';
import { v4 as uuid } from 'uuid';

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

const addPatient = ( patient: NewPatient ): SecurePatient => {

    const newPatient = {
      id: uuid(),
      ...patient
    };

    patientData.push(newPatient);
    return {
      id: newPatient.id,
      name: newPatient.name,
      dateOfBirth: newPatient.dateOfBirth,
      gender: newPatient.gender,
      occupation: newPatient.occupation
    };
};

export default {
  getSecureEntries, addPatient
};