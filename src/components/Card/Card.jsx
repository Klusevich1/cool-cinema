import React, { useContext, useEffect } from "react";
import styles from "./Card.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export const Card = ({ allMovies, favorites, onAddToFavorite }) => {
  const { url } = useParams();
  const fetchCard = allMovies.find((item) => item.url.includes(url));
  const [isLoading, setIsLoading] = React.useState(true);

  console.log(url)
  console.log(fetchCard);
  console.log(allMovies);
  const onClickFavorite = () => {
    onAddToFavorite({ ...fetchCard });
  };

  if (!isLoading) {
    return <h1 className={styles.loadingText}>Идет загрузка...</h1>;
  }


  const isItemAdded = (id) => {
    if (favorites.length > 0) {
      console.log(favorites.some((obj) => obj.id === id))
      return favorites.some((obj) => obj.id === id);
    } else {
      return false
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.watchBlock}>
        <span className={styles.titleMovie}>{fetchCard.title}</span>
        <div></div>
      </div>
      {isLoading === true && (
        <div className={styles.movieAbout}>
          <div className={styles.info}>
            <div className={styles.container}>
              <div className={styles.movieImg}>
                <img src={fetchCard.imageUrl} />
              </div>
              <div className={styles.movieInfo}>
                <div className={styles.infoPoint}>
                  <div className={styles.optText}>Год</div>
                  <div className={styles.optValue}>{fetchCard.year}</div>
                </div>
                <div className={styles.infoPoint}>
                  <div className={styles.optText}>Страна</div>
                  <div className={styles.optValue}>
                    {fetchCard.country.join(", ")}
                  </div>
                </div>
                <div className={styles.infoPoint}>
                  <div className={styles.optText}>Жанр</div>
                  <div className={styles.optValue}>
                    {fetchCard.genre.join(", ")}
                  </div>
                </div>
                <div className={styles.infoPoint}>
                  <div className={styles.optText}>Стоимость</div>
                  <div className={styles.optValue}>{fetchCard.price}</div>
                </div>
                <div className={styles.infoPoint}>
                  <div className={styles.optText}>Возраст</div>
                  <div className={styles.optValue}>{fetchCard.age}</div>
                </div>
                <div className={styles.infoPoint}>
                  <div className={styles.optText}>Продолжительность</div>
                  <div className={styles.optValue}>
                    {fetchCard.duration} мин
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.movieRate}>
              <span className={styles.rateText}>{fetchCard.rate}</span>
              <span className={styles.rateNum}>123 оценки</span>
              <button className={styles.rateBtn}>
                Оценить {fetchCard.type === "film" ? "фильм" : "сериал"}
              </button>
              {isItemAdded(fetchCard.id) ? (
                <FaHeart className={styles.like} onClick={onClickFavorite} />
              ) : (
                <FaRegHeart className={styles.like} onClick={onClickFavorite} />
              )}
            </div>
          </div>
          <div className={styles.descriptionText}>{fetchCard.description}</div>
        </div>
      )}
    </div>
  );
};
