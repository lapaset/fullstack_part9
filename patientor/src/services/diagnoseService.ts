import diagnoseData from '../../data/diagnoses.json';

import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnoseData;

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getEntries
};