import React from 'react';
import { Icon, List } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Entry } from '../types';

const DiagnosisList: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  
  return entry.diagnosisCodes
            ? <div>
                diagnoses:
                <ul>
                  {entry.diagnosisCodes
                    .map(d => <li key={d}>
                                {d} {diagnoses[d].name}
                              </li>)}
                </ul>
              </div>
            : null;
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
  };

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
                  ? <div>sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</div>
                  : null }
                employer: {entry.employerName}
              </div>;
    case "HealthCheck":
      return <div>
                <Icon name='heart' color={healthRating(entry.healthCheckRating)} />
              </div>;
    default:
      return assertNever(entry);
  }
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
    }
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

export default EntryItem;