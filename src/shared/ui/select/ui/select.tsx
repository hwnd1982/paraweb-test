import cn from 'classnames';
import { Field } from 'formik';
import { useState } from 'react';
import { SelectArrow } from '@/shared/ui';
import styles from './styles.module.scss';

export type SelectProps = {
  name: string
  value: string
  options: {text: string, value: string}[]
  touched?: boolean
  error?: string
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: any) => void
  setFieldValue: (name: string, value: string) => void
}

export const Select = ({name, options, touched, error, value, setFieldValue, handleChange, handleBlur}:SelectProps) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <Field
        id={name}
        className={cn(styles.input, touched && (error ? styles.invalid : styles.valid))}
        type="text"
        readOnly
        value={value ? options.find(option => option.value === value)?.text : ''}
        placeholder={options.find(option => option.value === '')?.text || ''}
        onClick={() => setIsOpened(!isOpened)}
        onBlur={(e: any) => setTimeout(() => {
          setIsOpened(false);
          handleBlur(e);
        }, 150)}
      />
      <select
        className={styles.select}
        name={name}
        onChange={handleChange}
        value={value}
      >
        {options.map(({text, value}) => <option
          key={`${name}-${value}-hidden`} value={value}
          disabled={!value}
        >{text}</option>)}
      </select>
      {isOpened &&
        <span className={styles.options}>
          {options.filter(option => option.value).map(option => 
            <span
              className={cn(styles.option, option.value === value && styles.selected)}
              key={`${name}-${option.value}`}
              onClick={() => {
                setFieldValue(name, option.value);
              }}
            >{option.text}</span>
          )}
        </span>
      }
      <SelectArrow className={cn(styles.selectArrow, isOpened && styles.opened)} />
    </>
  );
}
