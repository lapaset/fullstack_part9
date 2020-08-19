import patients from '../../data/patients';
import { PublicPatient, NewPatient, Patient } from '../types';
import { v4 as uuid } from 'uuid';

const getSecureEntries = (): PublicPatient[] => {
  return patients
    .map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};

const addPatient = ( patient: NewPatient ): PublicPatient => {

    const newPatient = {
      id: uuid(),
      ...patient
    };

    patients.push(newPatient);
    return {
      id: newPatient.id,
      name: newPatient.name,
      dateOfBirth: newPatient.dateOfBirth,
      gender: newPatient.gender,
      occupation: newPatient.occupation
    };
};

const findPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

export default {
  getSecureEntries,
  addPatient,
  findPatientById
};