import React from "react";
import styles from "./Favorites.module.css";
import { Link } from "react-router-dom";
import { CardItems } from "../GroupItems/CardItems/CardItems";
import axios from "axios";

export const Favorites = ({ type, favorites }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.favBlock}>
        <div className={styles.titleCategory}>{type}</div>
        <div className={styles.description}>
          Фильмы и сериалы, которым вы поставили лайк
        </div>
        {favorites.length > 0 ? (
          <div className={styles.movieWrapper}>
            {favorites.map((obj, index) => (
              <Link to={`/watch${obj.url}`}>
                <CardItems key={index} obj={obj} />
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.errorMes}>Ничего не найдено...</div>
        )}
      </div>
    </div>
  );
};
