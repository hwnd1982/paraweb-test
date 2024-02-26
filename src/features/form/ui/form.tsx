import { AppThunkDispatch, RootState } from "@/shared/store/store";
import { Button, Check, FormField } from "@/shared/ui";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from 'yup';
import { sendFormData } from "../model/formSlice";
import { FieldProps, getFormFields } from "../model/utils";
import styles from "./styles.module.scss";

export const Form = ({form}: {form: FieldProps[]}) => {
  const {data} : {data: {[key: string]: string}, date: string} = useSelector((state: RootState) => state.form);
  const {loading} = useSelector((state: RootState) => state.form);
  const dispatch: AppThunkDispatch = useDispatch();
  const fields: yup.AnyObject = getFormFields(form);
  const initialValues = Object.keys(fields)
    .reduce((values: {[key: string]: string}, item) => ({...values, [item]: data[item] || ''}), {});
    
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={yup.object().shape(fields)}
      validateOnBlur
      onSubmit={(values) => { 
        dispatch(sendFormData(values));
      }}
    >
      {({ values, errors, touched, handleChange, setFieldValue, handleBlur, handleSubmit, dirty }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <fieldset disabled={loading} className={styles.fieldset}>
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

            <Button type="submit">РЕГИСТРАЦИЯ</Button>
          </fieldset>
        </form>
      )}
    </Formik>
  )
}
