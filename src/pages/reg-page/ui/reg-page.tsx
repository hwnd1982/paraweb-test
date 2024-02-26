import { Form } from "@/features";
import { getFormData } from "@/features/form/model/formSlice";
import { AppThunkDispatch, RootState } from "@/shared/store/store";
import { Loader, RegistrationCompleted } from "@/widgets";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";

export const RegPage = () => {
  const {fields, loading, date} = useSelector((state: RootState) => state.form);
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
          {(!date && !!fields.length) && <Form form={fields} />}
          {(loading || !fields.length) && <Loader />}
          {(date && !loading) && <RegistrationCompleted />}
        </div>
    </section>
  );
};
