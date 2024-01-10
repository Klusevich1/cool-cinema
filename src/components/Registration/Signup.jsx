import React, { useContext } from "react";
import classNames from "classnames";
import styles from "./Registration.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppContext } from "../../context/AppContext";

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Неправильный email")
    .email()
    .required("email"),
  password: yup
    .string()
    .min(6, "Минимальная длина - 6 элементов")
    .max(12, "Максимальная длина - 6 элементов")
    .matches(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).*/, "Пароль должен содержать хотя бы 1 заглавную букву, 1 строчную букву и 1 цифру")
    .required("Поле пароль обязательное"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли не совпадают")
    .required(),
});

export const Signup = () => {
  const { data, setData, setValues } = useContext(AppContext);
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
      password: data.password,
      confirmPassword: data.confirmPassword,
    },
  });

  const onSubmit = (data) => {
    setValues(data);
    setData([]);
    reset();
  };

  return (
    <form className={styles.formReg} onSubmit={handleSubmit(onSubmit)}>
      <h1>Регистрация</h1>
      <input
        type="text"
        placeholder="Введите Ваш email"
        className={classNames(styles.inputField, {
          [styles.errorInput]: errors.email,
        })}
        {...register("email")}
      />
      {errors.email && <div className={styles.error}>{errors.email.message}</div>}
      <input
        type="password"
        placeholder="Придумайте пароль"
        className={classNames(styles.inputField, {
          [styles.errorInput]: errors.password,
        })}
        {...register("password")}
      />
      {errors.password && (
        <div className={styles.error}>{errors.password.message}</div>
      )}

      <input
        type="password"
        placeholder="Подтвердите пароль"
        className={classNames(styles.inputField, {
          [styles.errorInput]: errors.password,
        })}
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && (
        <div className={styles.error}>{errors.confirmPassword.message}</div>
      )}

      <button className={styles.buttonSub} type="submit" disabled={!isValid}>
        Регистрация
      </button>
      <span style={{ margin: "20px" }}>
        Уже есть аккаунт? <Link to="/login">Вход</Link>
      </span>
    </form>
  );
};
