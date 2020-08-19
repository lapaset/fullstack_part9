import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Icon, List } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient, Gender, Entry } from '../types';

const DiagnosisList: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  
  return entry.diagnosisCodes
            ? <ul>
                {entry.diagnosisCodes
                  .map(d => <li key={d}>
                                {d} {diagnoses[d].name}
                            </li>)}
              </ul>
            : null
};

const EntryItem: React.FC<{ entry: Entry }> = ({ entry }) => {
  const iconName = (type: string) => {
    switch (type) {
      case 'Hospital':
        return 'hospital';
      case 'OccupationalHealthcare':
        return 'stethoscope';
      case 'HealthCheck':
        return 'doctor';
    };
  };

  return <List.Item>
            <List.Icon name={iconName(entry.type)} size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header>{entry.date}</List.Header>
              <List.Description>
                <b>{entry.specialist}:</b> <i>{entry.description}</i>
                <EntryDetails entry={entry} />
                <DiagnosisList entry={entry} />
              </List.Description>
            </List.Content>
        </List.Item>;
};


const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const healthRating = (rating: number) => {
    switch (rating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'red';
      case 3:
        return 'black';
      default:
        return 'grey';
    }
  }

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case "Hospital":
      return <div>discharged: {entry.discharge.date} {entry.discharge.criteria}</div>;
    case "OccupationalHealthcare":
      return <div>
                {entry.sickLeave
                  ? `sick leave: ${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}`
                  : null } <br/>
                employer: {entry.employerName}
              </div>;
    case "HealthCheck":
      return <div>
                <Icon name='heart' color={healthRating(entry.healthCheckRating)} />
              </div>;
    default:
      return assertNever(entry);
  };
};

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
          <List divided relaxed>
            {patient.entries
                  ? patient.entries.map(e => <EntryItem
                                                key={e.id}
                                                entry={e} />)
                  : 'loading...' }
          </List>
        </Container>
      </div>
    : <div>Patient not found</div>;
};

export default PatientPage;