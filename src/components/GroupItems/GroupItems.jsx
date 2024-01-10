import React, { useContext } from "react";
import styles from "./GroupItems.module.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import classNames from "classnames";
import { CardItems } from "./CardItems/CardItems";
import { Link, useParams } from "react-router-dom";

export const GroupItems = ({ groupText, allMovies }) => {
  const [navLeft, setNavLeft] = React.useState(true);
  const [navRight, setNavRight] = React.useState(false);
  const [disabledBtns, setDisabledBtns] = React.useState(true);
  const navRef = React.useRef();
  const cardRef = React.useRef();

  const filteredItems = allMovies.filter((movie) => movie.group.find((gr) => gr.includes(groupText)));

  const toggleBtns = () => {
    if (filteredItems.length <= 4) {
      setDisabledBtns(true);
    } else {
      setDisabledBtns(!disabledBtns);
    }
  };

  const handleScroll = (direction) => {
    if (direction === "left") {
      const rightScroll = navRef.current.scrollLeft -= (cardRef.current.clientWidth * 2);
      if (rightScroll <= 0) {
        setNavLeft(true);
      }
      setNavRight(false);
    } else {
      const leftScroll = navRef.current.scrollLeft += (cardRef.current.clientWidth * 2);
      if (
        leftScroll >= navRef.current.scrollWidth - navRef.current.offsetWidth
      ) {
        setNavRight(true);
      }
      setNavLeft(false);
    }
  };

  return (
    <div style={{ width: "1000px", marginTop: "50px" }}>
      <span className={styles.groupName}>{groupText}</span>
      <div
        className={styles.sliderFrame}
        onMouseEnter={() => toggleBtns('enter')}
        onMouseLeave={() => toggleBtns('leave')}
      >
        <div ref={navRef} className={styles.itemsSlider}>
          {filteredItems.map((obj, index) => (
            <Link to={`/watch${obj.url}`}>
              <CardItems cardRef={cardRef} obj={obj} key={index}/>
            </Link>
          ))}
        </div>
        <div
          className={classNames(styles.navBtns, {
            [styles.disabled]: disabledBtns,
          })}
        >
          <IoIosArrowDropleftCircle
            className={classNames(styles.navButtonLeft, {
              [styles.disabled]: navLeft,
            })}
            onClick={() => handleScroll("left")}
          />
          <IoIosArrowDroprightCircle
            className={classNames(styles.navButtonRight, {
              [styles.disabled]: navRight,
            })}
            onClick={() => handleScroll("right")}
          />
        </div>
      </div>
    </div>
  );
};
