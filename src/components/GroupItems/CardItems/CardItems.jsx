import React, { useContext } from 'react';
import styles from './../GroupItems.module.css';

export const CardItems = ({obj, cardRef}) => {
  return (
    <div ref={cardRef} key={obj.id} className={styles.movie}>
        <div className={styles.movieImg}>
            <img src={obj.imageUrl} alt="" />
        </div>
        <span className={styles.movieName}>{obj.title}</span>
    </div>
  )
}
