import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Icon, List, Button, Segment } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient, Gender, EntryFormValues } from '../types';
import EntryItem from './EntryItem';
import AddEntryModal from '../AddEntryModal';

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find(p => p.id === id);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log('submit', values);
    try {
      await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      findPatient(id);
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
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
          <div>
            ssn: {patient.ssn ? patient.ssn : 'loading...'}<br />
            occupation: {patient.occupation ? patient.occupation : 'loading...'}
          </div>
          
          <h3>Entries</h3>
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button onClick={() => openModal()}>Add new entry</Button>
          <Segment color='black'>
            <List divided relaxed>
              {patient.entries
                    ? patient.entries.map(e => <EntryItem
                                                  key={e.id}
                                                  entry={e} />)
                    : 'loading...' }
            </List>
          </Segment>
        </Container>
      </div>
    : <div>Patient not found</div>;
};

export default PatientPage;