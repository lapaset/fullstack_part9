import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Formik, Form, Field } from "formik";
import { HospitalFormValues } from "../types";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: HospitalFormValues) => void;
  onCancel: () => void;
}

export const AddHospitalForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  
  return (
    <div>
      <h3>type: hospital</h3>
      <Formik
        initialValues={{
          type: "Hospital",
          description: "",
          date: "",
          specialist: "",
          diagnosisCodes: undefined,
          discharge: {
            date: "",
            criteria: ""
          }
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.description)
            errors.description = requiredError;
          if (!values.date)
            errors.date = requiredError;
          if (!values.specialist)
            errors.specialist = requiredError;
          if (!values.discharge.date)
            errors.dischargeDate = requiredError;
          if (!values.discharge.criteria)
            errors.dischargeCriteria = requiredError;
          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              <Field 
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
              <Field 
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <Field 
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
              <Field 
                label="Discharge Date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
              />
              <Field 
                label="Discharge Criteria"
                placeholder="Discharge Criteria"
                name="discharge.criteria"
                component={TextField}
              />
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddHospitalForm;
