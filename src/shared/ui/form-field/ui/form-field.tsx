import cn from 'classnames';
import { Field } from 'formik';
import { IMaskInput } from 'react-imask';
import { IsValid } from '@/shared/ui';
import { Select } from '@/shared/ui';
import styles from './styles.module.scss';

export type FieldProps = {
  label: string
  name: string
  type: string
  value: string
  options?: {text: string, value: string}[]
  mask?: string
  touched?: boolean
  error?: string
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: any) => void
  setFieldValue: (name: string, value: string) => void
}

export const FormField = ({label, name, type, setFieldValue, mask = '', options = [], touched, error, value, handleChange, handleBlur}:FieldProps) => {
  return (
    <label className={styles.root}>
      <span className={styles.label}>{label}</span>
      {(() => {
        switch (true) {
          case !!mask: return (
            <IMaskInput
              className={cn(styles.input, touched && (error ? styles.invalid : styles.valid))}
              type={type} 
              name={name}
              mask={mask}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={() => {
                if (value) return;

                const prefix = mask.replaceAll(/^\{(.+)\}.*$/g, '$1');
                  
                setFieldValue(name, prefix);
              }}
              onAccept={(value: string) => setFieldValue(name, value)}
              value={value}
              placeholder={label}
            ></IMaskInput>);
          case type === "select": 
            return (
              <Select 
                name={name}
                value={value}
                touched={touched}
                error={error}
                options={options}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            );
          default: return (
            <Field 
              className={cn(styles.input, touched && (error ? styles.invalid : styles.valid))}
              type={type}
              name={name}
              onChange={handleChange}
              onBlur={handleBlur}
              value={value}
              placeholder={label}
            />);
        }
      })()}
      {touched && (error ?
        <span className={styles.message}>{error}</span> :
        type !== 'select' ? <IsValid className={styles.isValide} /> : '')
      }
    </label>)};