import React from "react";
import styles from "./SideBar.module.css";
import { Input } from "./Input/Input";
import { NavItems } from "./NavItems/NavItems";
import { Link } from "react-router-dom";
import axios from "axios";

export const SideBar = () => {
  const [logo, setLogo] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:3004/logo")
        .then((res) => setLogo(res.data))
        .catch(console.error);
    }
    fetchData();
  }, []);
  return (
    <div className={styles.sidebar}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="" />
      </Link>
      <Input />
      <Link to="/subscribe">
        <div className={styles.subscribe}>30 дней бесплатно</div>
      </Link>
      <NavItems />
    </div>
  );
};
