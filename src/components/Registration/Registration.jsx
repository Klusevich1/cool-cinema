import React from "react";
import styles from "./Registration.module.css";
import axios from "axios";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

export const Registration = ({ type }) => {
  const [back, setBack] = React.useState([]);
  const navigate = useNavigate();
  // React.useEffect(() => {
  //   async function fetchData() {
  //     await axios
  //       .get("http://localhost:3004/backgroundReg")
  //       .then((res) => setBack(res.data))
  //       .catch(console.error);
  //   }
  //   fetchData();
  // }, []);
  return (
    <>
      <Link to="/">
        <img className={styles.logo} src='./images/logo.png' alt="" />
      </Link>
      <RxCross2 className={styles.crossBtn} onClick={() => navigate('/')} />
      {type === "login" ? <Login /> : <Signup />}
    </>
  );
};
