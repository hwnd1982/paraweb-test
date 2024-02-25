import { Check, FormField } from "@/shared/ui";
import { Formik } from "formik";
import * as yup from 'yup';
import { FieldProps, getFormFields } from "../model/utils";
import styles from "./styles.module.scss";

export const Form = ({form}: {form: FieldProps[]}) => {
  const fields = getFormFields(form);
  const initialValues = Object.keys(fields)
    .reduce((values: {[key: string]: string}, item) => ({...values, [item]: ''}), {});
    
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={yup.object().shape(fields)}
      validateOnBlur
      onSubmit={(values) => { console.log(values) }}
    >
      {({ values, errors, touched, handleChange, setFieldValue, handleBlur, handleSubmit, dirty }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <fieldset className={styles.fieldset}>
            {Object.keys(fields).map((input, index) => (
              <FormField
                name={input}
                key={`reg-${form[index].name}`}
                label={form[index].label}
                value={values[input]}
                error={errors[input]}
                touched={touched[input]}
                type={form[index].type}
                mask={form[index].mask}
                handleChange={handleChange}
                handleBlur={handleBlur}
                options={form[index].options}
                setFieldValue={setFieldValue}
              />
            ))}

            <span className={styles.checkbox}>
              <span className={styles.wrapp}>
                <input className={styles.input} type="checkbox" name="personal-data" value="agree" />
                <Check className={styles.check} />
              </span>
              <span className={styles.span}>
                Я подтверждаю, что даю согласие на&nbsp;<a href="#" className={styles.link}>обработку персональных данных</a>
              </span>
            </span>

            <button className={styles.button} type="submit">РЕГИСТРАЦИЯ</button>
          </fieldset>
        </form>
      )}
    </Formik>
  )
}
