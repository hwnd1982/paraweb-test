import * as yup from 'yup';

export interface FieldProps {
  type: 'text' | 'number' | 'password' | 'email' | 'tel' | 'select'
  label: string
  name: string
  required?: boolean
  confirm?: string
  mask?: string
  min?: number
  options?: { text: string, value: string }[]
}

export const getFormFields = (form: FieldProps[]) => form.reduce((fields: yup.ObjectShape, item) => {
  if (['text', 'password', 'email', 'tel', 'select'].includes(item.type)) {
    fields[item.name] = yup.string();
  }

  if (item.mask || item.min) {
    const length = item?.min || item.mask?.replaceAll(/[^\d+\s]/g, '').length || 0;

    fields[item.name] = (fields[item.name] as yup.StringSchema | yup.NumberSchema).min(length, `${item.label} должен содержать не менее ${length} символов`);
  }

  if (item.type === "email") {
    fields[item.name] = (fields[item.name] as yup.StringSchema).email("Неверный формат")
  }
  if (item.confirm) {
    fields[item.name] = yup.string().oneOf([yup.ref(item.confirm)], `${item.label} не совпадает`).required('Произошла ошибка. Заполните поле');
  }

  if (item.required) {
    fields[item.name] = (fields[item.name] as yup.Schema).required('Произошла ошибка. Заполните поле');
  }

  return fields;
}, {});
