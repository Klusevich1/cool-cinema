import React from "react";
import styles from "./Genres.module.css";
import { Link, useParams } from "react-router-dom";
import { CardItems } from "../GroupItems/CardItems/CardItems";
import axios from "axios";

export const GenresItems = ({allMovies, genre}) => {
  React.useEffect(() => {
    function shuffle() {
      for (let i = allMovies.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [allMovies[i], allMovies[j]] = [allMovies[j], allMovies[i]];
      }
    }
    shuffle();
  }, [allMovies]);
  console.log(allMovies)

  return (
    <div className={styles.wrapper}>
      <div className={styles.genreBlock}>
        <div className={styles.titleCategory}>{genre}</div>
        <div className={styles.movieWrapper}>
          {allMovies
            .filter((item) => item.genre.find((gen) => gen.includes(genre)))
            .map((obj, index) => (
              <Link to={`/watch${obj.url}`}>
                <CardItems key={index} obj={obj} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
