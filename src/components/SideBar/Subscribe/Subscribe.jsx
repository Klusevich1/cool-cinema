import React, { useContext } from "react";
import styles from "./Subscribe.module.css";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { RxCross2 } from "react-icons/rx";

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Неправильный email")
    .required("Поле email обязательное"),
});

export const Subscribe = () => {
  const { data, setData, setValues } = useContext(AppContext);
  const [subImg, setSubImg] = React.useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: data.email,
    },
  });

  React.useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:3004/subImg")
        .then((res) => setSubImg(res.data))
        .catch(console.error);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <img src={subImg} />
      </div>
      <Link to="/">
        <img className={styles.logo} src="./images/logo.png" alt="" />
      </Link>
      <RxCross2 className={styles.crossBtn} onClick={() => navigate("/")} />
      <div className={styles.info}>
        <div>Создай аккаунт и получи 30 дней подписки бесплатно</div>
        <div className={styles.infoForm}>
          <input
            type="text"
            placeholder="Email"
            autoComplete="off"
            className={classNames(styles.infoInput, {
              [styles.errorInput]: errors.email,
            })}
            {...register("email")}
          />
          {errors.email && (
            <div className={styles.error}>{errors.email.message}</div>
          )}
          <Link to="/signup">
            <button className={styles.infoBtn} disabled={!isValid}>
              Продолжить
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
