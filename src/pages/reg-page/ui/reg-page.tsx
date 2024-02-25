import { FieldProps, Form } from "@/features";
import { AppThunkDispatch, getFormData } from "@/features/form/model/formSlice";
import { RootState } from "@/shared/store/store";
import { Loader } from "@/shared/ui";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";

export const RegPage = () => {
  const {fields, loading} = useSelector((state: RootState) => state.form);
  const dispatch: AppThunkDispatch = useDispatch();

  useEffect(() => {
    if (fields.length || loading) return;

    dispatch(getFormData());
  }, [fields, loading]);

  return (
    <section className={styles.auth}>
      <div className={styles.column}>
        <img
            className={styles.image}
            src={'/images/main.png'}
            alt="Фон"
        />
        </div>
        <div className={styles.container}>
          {!fields.length || loading ? <Loader /> : <Form form={fields} />}
        </div>
    </section>
  );
};
