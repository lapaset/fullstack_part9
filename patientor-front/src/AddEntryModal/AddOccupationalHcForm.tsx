import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Formik, Form, Field } from "formik";
import { OccupationalHcFormValues } from "../types";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: OccupationalHcFormValues) => void;
  onCancel: () => void;
}

export const AddOccupationalHcForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  
  return (
    <div>
      <h3>type: occupational healthcare</h3>
      <Formik
        initialValues={{
          type: "OccupationalHealthcare",
          description: "",
          date: "",
          specialist: "",
          diagnosisCodes: undefined,
          employerName: ""
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
          if (!values.employerName)
            errors.employerName = requiredError;
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
                label="Employer Name"
                placeholder="Employer Name"
                name="employerName"
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

export default AddOccupationalHcForm;
