import React, { useContext } from "react";
import styles from "../Category.module.css";
import { IoIosArrowDown } from "react-icons/io";

export const DropDown = ({option, setGenre, genre, setSelectedItem, setCountry, setRate}) => {
  const dropRef = React.useRef();
  const [isActive, setIsActive] = React.useState(false);
  const [selected, setSelected] = React.useState(option.defValue);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const activeDrop = () => {
    setSelectedItem(null);
    setIsActive(!isActive);
  };

  return (
    <div className={styles.sort}>
      <div
        ref={dropRef}
        className={styles.dropDown}
      >
        <div className={styles.dropDownBtn} onClick={activeDrop}>
          {selected}
          <IoIosArrowDown style={{ marginLeft: "5px" }} />
        </div>
        {isActive && (
          <div className={styles.dropDownContent}>
            {option.items.map((opt) => (
              <div
                className={styles.dropDownItem}
                onClick={() => {
                  if (option.defValue === 'Все жанры') {
                    setGenre(opt);
                  } else if (option.defValue === 'Все страны') {
                    setCountry(opt)
                  } else {
                    setRate(opt)
                  }
                  setSelected(opt);
                  setIsActive(false);
                }}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
