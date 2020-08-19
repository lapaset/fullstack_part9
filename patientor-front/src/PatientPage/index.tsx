import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient, Gender, Entry } from '../types';

interface EntryProps {
  entry: Entry;
}

const EntryText: React.FC<EntryProps> = ({ entry }) => (
  <div>
    <p>{entry.date} <i>{entry.description}</i></p>
    {entry.diagnosisCodes
      ? <ul>
          {entry.diagnosisCodes.map(d => <li key={d}>{d}</li>)}
        </ul>
      : null }
  </div>
)

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find(p => p.id === id);

  const findPatient = async (id: string) => {
    try {
      const { data: patient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );

      dispatch({ type: "SET_PATIENT", payload: patient });
    } catch (e) {
      console.error(e);
    }
  };

  const iconName = (gender: Gender) => {
    switch (gender) {
      case 'male':
        return 'mars';
      case 'female':
        return 'venus';
      case 'other':
        return 'transgender alternate';
    }
  };

  if (id && patient && !patient.ssn)
    findPatient(id);
  
  return patient
    ? <div>
        <Container>
          <h2>{patient.name} <Icon name={iconName(patient.gender)} /></h2> 
          ssn: {patient.ssn ? patient.ssn : 'loading...'}<br />
          occupation: {patient.occupation ? patient.occupation : 'loading...'}
          <h3>entries</h3>
          {patient.entries
                ? patient.entries.map(e => <EntryText key={e.id} entry={e} />)
                : 'loading...' }
        </Container>
      </div>
    : <div>Patient not found</div>;
};

export default PatientPage;