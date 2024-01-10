import React, { useContext, useRef } from "react";
import axios from "axios";
import styles from "./Category.module.css";
import { Link, useLocation } from "react-router-dom";
import { DropDown } from "./DropDown/DropDown";
import { CardItems } from "../GroupItems/CardItems/CardItems";
import MyLoader from "./MyLoader";
import OptionLoader from "./OptionLoader";

export const Category = ({ title, type }) => {
  const wrapRef = useRef();
  const [height, setHeight] = React.useState(0);
  const [activePay, setActivePay] = React.useState("Все");
  const [isLoading, setIsLoading] = React.useState(true);
  const [movies, setMovies] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [genresCategory, setGenresCategory] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);
  // const [resetSelected, setResetSelected] = React.useState();

  const [genre, setGenre] = React.useState("Все жанры");
  const [country, setCountry] = React.useState("Все страны");
  const [rate, setRate] = React.useState("Любой рейтинг");
  const { pathname } = useLocation();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [optionsResponse, moviesResponse, genresResponse] =
          await Promise.all([
            axios.get("http://localhost:3004/options"),
            axios.get(`http://localhost:3004/all?type=${type}`),
            axios.get("http://localhost:3004/genresCategory"),
          ]);
        setIsLoading(false);
        setOptions(optionsResponse.data);
        setMovies(moviesResponse.data);
        setGenresCategory(genresResponse.data);
      } catch (error) {
        alert("Ошибка при получении данных :(");
      }
    }
    fetchData();
  }, [type]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  React.useEffect(() => {
    setHeight(wrapRef.current.clientHeight);
  });

  const paySort = (text) => {
    console.log(text);
    if (text === "Все") {
      setActivePay("Все");
    } else if (text === "Бесплатные") {
      setActivePay("Бесплатные");
    } else {
      setActivePay("По подписке");
    }
  };

  console.log(type);

  const renderItems = () => {
    const payItems = movies.filter((item) => {
      if (activePay === "Все") {
        return item;
      }
      return item.price.includes(activePay);
    });
    const genreItems = payItems.filter((item) => {
      if (genre === "Все жанры") {
        return item;
      }
      return item.genre.find((gen) => gen.includes(genre));
    });
    const countryItems = genreItems.filter((item) => {
      if (country === "Все страны") {
        return item;
      }
      return item.country.find((c) => c.includes(country));
    });
    const rateItems = countryItems.filter((item) => {
      if (rate === "Любой рейтинг") {
        return item;
      } else if (rate === "Больше 9") {
        return item.rate > 9;
      } else if (rate === "Больше 8") {
        return item.rate > 8;
      } else if (rate === "Больше 7") {
        return item.rate > 7;
      } else if (rate === "Больше 6") {
        return item.rate > 6;
      } else if (rate === "Больше 5") {
        return item.rate > 5;
      } else if (rate === "Больше 4") {
        return item.rate > 4;
      }
    });
    return (
      <>
        {rateItems.map((obj, index) => (
          <Link to={`/watch${obj.url}`}>
            <CardItems key={index} obj={obj} />
          </Link>
        ))}
      </>
    );
  };

  const handleGenreClick = (name, index) => {
    setSelectedItem(index);
    setGenre(name);
    // setResetSelected()
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.categoryBlock}>
        <span className={styles.titleCategory}>{title}</span>
        <div className={styles.genres}>
          <ul className={styles.categoryList}>
            {genresCategory.map((gen, index) => (
              <li
                className={selectedItem === index ? styles.highlight : ''}
                key={index}
                onClick={() => handleGenreClick(gen.name, index)}
              >
                {gen.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isLoading ? (
        <OptionLoader />
      ) : (
        <div className={styles.sortField}>
          <div className={styles.sortPay}>
            <span
              onClick={(e) => paySort(e.target.textContent)}
              className={activePay === "Все" && styles.activeSpan}
            >
              Все
            </span>
            <span
              onClick={(e) => paySort(e.target.textContent)}
              className={activePay === "Бесплатные" && styles.activeSpan}
            >
              Бесплатные
            </span>
            <span
              onClick={(e) => paySort(e.target.textContent)}
              className={activePay === "По подписке" && styles.activeSpan}
            >
              По подписке
            </span>
          </div>
          {options.map((option, index) => (
            <DropDown
              option={option}
              key={index}
              genre={genre}
              setSelectedItem={setSelectedItem}
              setGenre={setGenre}
              country={country}
              setCountry={setCountry}
              rate={rate}
              setRate={setRate}
            />
          ))}
        </div>
      )}
      <div ref={wrapRef} className={styles.movieWrapper}>
        {isLoading ? <MyLoader /> : renderItems()}
      </div>
      {height < 140 ? (
        <span className={styles.errorText}>К сожалению ничего не найдено</span>
      ) : (
        <></>
      )}
    </div>
  );
};
