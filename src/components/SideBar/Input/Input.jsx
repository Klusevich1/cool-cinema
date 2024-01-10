import React, { useContext } from 'react';
import styles from '../SideBar.module.css';
import { FaSearch } from "react-icons/fa";
import { AppContext } from '../../../context/AppContext';
import { Link } from 'react-router-dom';

export const Input = () => {
  const {setSubmitInput, searchValue, setSearchValue, setFilterSearch} = useContext(AppContext);
  const onChangeInput = (e) => {
    setSearchValue(e.target.value);
    console.log(searchValue)
  }
  return (
    <div className={styles.inputBox}>
        <input className={styles.input} type="text" placeholder='Поиск' value={searchValue} onChange={onChangeInput}/>
        <Link to="/search">
          <FaSearch className={styles.searchIcon} onClick={() => {
            setFilterSearch(searchValue)
            setSearchValue('')
          }}/>
        </Link>
    </div>
  )
}
