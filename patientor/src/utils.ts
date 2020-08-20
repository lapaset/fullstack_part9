/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Entry, EntryType, NewEntry, HealthCheckRating } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate= (date: any): string => {
  if (!date || !isString(date) || !isDate(date))
    throw new Error('Incorrect or missing date: ' + date);
  return date;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatient = (object: any): NewPatient => {

  const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
  };

  const isEntryType = (entryType: any): entryType is EntryType => {
    return Object.values(EntryType).includes(entryType);
  };

  const parseName = (name: any): string => {
    if (!name || !isString(name))
      throw new Error('Incorrect or missing name: ' + name);
    return name;
  };

  const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender))
      throw new Error('Incorrect or missing gender: ' + gender);
    return gender;
  };

  const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation))
      throw new Error('Incorrect or missing occupation: ' + occupation);
    return occupation;
  };

  const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn))
      throw new Error('Incorrect or missing ssn: ' + ssn);
    return ssn;
  };

  const correctTypes = (entries: any[]): boolean => {
    return entries.find(e => !isEntryType(e.type)) === undefined;
  };

  const parseEntries = (entries: any): Entry[] => {
    if (entries && entries !== undefined && Array.isArray(entries) && !correctTypes(entries))
      throw new Error('Incorrect entries: ' + entries);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entries
      ? entries
      : [];
  };

  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  };
};


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewEntry = (object: any): NewEntry => {
 
  const parseDescription = (description: any): string => {
    if (!description || !isString(description))
      throw new Error('Incorrect or missing description: ' + description);
    return description;
  };

  const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist))
      throw new Error('Incorrect or missing specialist: ' + specialist);
    return specialist;
  };

  const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
  };

  const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if (!rating || !isHealthCheckRating(rating))
      throw new Error('Incorrect or missing health check rating: ' + rating);
    return rating;
  };

  //if time check that the string really is diagnosis code
  const correctTypes = (codes: any[]): boolean => {
    return codes.find(c => !isString(c)) === undefined;
  };

  const parseDiagnosisCodes = (codes: any): string[] | undefined => {
    if (codes && codes !== undefined && Array.isArray(codes) && !correctTypes(codes))
      throw new Error('Incorrect diagnosis codes: ' + codes);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return codes;
  };

  const parseEmployer = (employer: any): string => {
    if (!employer || !isString(employer))
      throw new Error('Incorrect or missing employer: ' + employer);
    return employer;
  };

  const parseDischarge = (discharge: any): {
      date: string,
      criteria: string
    } => {
      if (!discharge)
        throw new Error('Missing discharge');
      if (!discharge.date || !isString(discharge.date) || !isDate(discharge.date))
        throw new Error('Incorrect or missing discharge date: ' + discharge.date);
      if (!discharge.criteria || !isString(discharge.criteria))
        throw new Error('Incorrect or missing discharge criteria: ' + discharge.criteria);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return discharge;
    };

  switch (object.type) {
    case "HealthCheck":
      return {
        type: "HealthCheck",
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    case "OccupationalHealthcare":
      return {
        type: "OccupationalHealthcare",
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        employerName: parseEmployer(object.employerName)
      };
    case "Hospital":
      return {
        type: "Hospital",
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        discharge: parseDischarge(object.discharge)
      };

    default:
      throw new Error('Incorrect or missing entry type: ' + object.type);
  }
};

export default toNewPatient;


 /*interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: {
    date: string,
    criteria: string
  }
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string
  }
} */
