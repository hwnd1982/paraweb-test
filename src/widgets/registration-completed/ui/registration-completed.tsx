import { resend } from '@/features/form/model/formSlice';
import { Button } from '@/shared/ui';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';

export const RegistrationCompleted = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h2 className={styles.title}>Регистрация прошла успешно!</h2>
        <div className={styles.textBlock}>
          <p className={styles.text}>Поздравляем, вы успешно зарегистрировались на портале!</p>
          <p className={styles.text}>Письмо с подтверждением регистрации было выслано на вашу почту.</p>
        </div>
        <Button onClick={() => dispatch(resend())}>ОТПРАВИТЬ ПОВТОРНО</Button>
      </div>
    </div>
  )
}