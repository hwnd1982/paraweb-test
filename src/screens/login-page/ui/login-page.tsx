import { Loader } from "@/shared/ui";
import style from "./styles.module.scss";

const LoginPage = () => {
    return (
        <section className={style.auth}>
            <div className={style.column}>
                <img
                    className={style.image}
                    src={'/images/main.png'}
                    alt="Фон"
                />
            </div>
            <div className={style.container}>
                <Loader />
            </div>
        </section>
    );
};

export { LoginPage };
