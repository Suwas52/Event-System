import { Button, TextField } from "@mui/material";
import { ICreateCompanyDTO } from "../../types/global.types";
import "./companies.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";

const AddCompany = () => {
  const redirect = useNavigate();
  const [isSubmitting, SetIsSubmitting] = useState<boolean>(false);
  const initialValues: ICreateCompanyDTO = {
    name: "",
    size: "",
  };

  const validationScheme = Yup.object({
    name: Yup.string().required("Enter Name"),
    size: Yup.string().required("Select Size"),
  });

  const submit = (value: ICreateCompanyDTO) => {
    SetIsSubmitting(true);

    httpModule
      .post<ICreateCompanyDTO>("/Company/Create", {
        name: value.name,
        size: value.size,
      })
      .then((response) => {
        console.log(response);
        SetIsSubmitting(false);
        redirect("/companies");
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="add-company">
      <h1>Add Company</h1>

      <div className="form">
        <Formik
          initialValues={initialValues}
          validationSchema={validationScheme}
          onSubmit={submit}
        >
          {({ values, isValid, dirty }) => (
            <Form>
              <div className="form-control">
                <label htmlFor="name">Company Name</label>
                <Field
                  className="input-form"
                  type="text"
                  name="name"
                  id="name"
                />
                <ErrorMessage name="name" className="error" component="span" />
              </div>
              <div className="form-control">
                <label htmlFor="size">Size</label>
                <Field className="input-form" as="select" name="size">
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </Field>
                <ErrorMessage name="size" className="error" component="span" />
              </div>
              <div className="btn">
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={!isValid || !dirty || isSubmitting}
                >
                  submit
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => redirect("/companies")}
                >
                  Back
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCompany;
