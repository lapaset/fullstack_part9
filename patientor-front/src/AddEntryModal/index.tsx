import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { Modal, Segment } from 'semantic-ui-react';
import { AddHealthCheckForm } from './AddHealthCheckForm';
import { AddHospitalForm } from './AddHospitalForm';
import { AddOccupationalHcForm } from './AddOccupationalHcForm';
import { EntryFormValues } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues ) => void;
  error?: string;
}

const ChooseForm: React.FC = () => (
  <div>
    <h3>Choose form type</h3>
    <Link to="/api/healthcheckform">Health check</Link><br />
    <Link to="/api/occupationalhcform">Occupational healthcare</Link><br />
    <Link to="/api/hospitalform">Hospital</Link>
  </div>
);

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Router>
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <ChooseForm />
        <Switch>
          <Route path="/api/hospitalform" render={() => <AddHospitalForm onSubmit={onSubmit} onCancel={onClose} />} />
          <Route path="/api/healthcheckform" render={() => <AddHealthCheckForm onSubmit={onSubmit} onCancel={onClose} />} />
          <Route path="/api/occupationalhcform" render={() => <AddOccupationalHcForm onSubmit={onSubmit} onCancel={onClose} />} />
          <Route path="/" render={() => <div>Choose form type</div>} />
        </Switch>
      </Modal.Content>
    </Modal>
  </Router>
);

export default AddEntryModal;
