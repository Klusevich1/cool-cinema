import React, { useContext } from "react";
import styles from "./Search.module.css";
import { AppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { CardItems } from "../GroupItems/CardItems/CardItems";

export const Search = ({ allMovies }) => {
  const { filterSearch } = useContext(AppContext);
  const renderItems = () => {
    const filteredItems = allMovies.filter((item) =>
      item.title.toLowerCase().includes(filterSearch.toLowerCase())
    );
    console.log(filteredItems);
    return (
      <>
        {filteredItems.map((obj, index) => (
          <Link to={`/watch${obj.url}`}>
            <CardItems key={index} obj={obj} />
          </Link>
        ))}
      </>
    );
  };

  return (
    <div className={styles.search}>
      <span className={styles.spanText}>Результаты поиска</span>
      {filterSearch === "" ? (
        <span className={styles.errorText}>
          Начните вводить название в поле «Поиск»🧐
        </span>
      ) : (
        <div className={styles.movieWrapper}>{renderItems()}</div>
      )}
    </div>
  );
};
