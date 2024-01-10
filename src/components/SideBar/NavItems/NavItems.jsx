import React from "react";
import styles from "../SideBar.module.css";
import { GoHomeFill } from "react-icons/go";
import { RiFilmFill } from "react-icons/ri";
import { RiMovie2Fill } from "react-icons/ri";
import { MdSmartToy } from "react-icons/md";
import { PiMaskHappyFill } from "react-icons/pi";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { BiSolidGhost } from "react-icons/bi";
import { MdPerson } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import classNames from "classnames";
import { Link, NavLink } from "react-router-dom";

export const NavItems = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.navGroup}>
        <span className={styles.groupName}>МЕНЮ</span>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          <div className={styles.navItem}>
            <div className={styles.navText}>
              <GoHomeFill />
              <span>Главная</span>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/films"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          <div className={styles.navItem}>
            <div className={styles.navText}>
              <RiFilmFill />
              <span>Фильмы</span>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/serials"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          <div className={styles.navItem}>
            <div className={styles.navText}>
              <RiMovie2Fill />
              <span>Сериалы</span>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/cartoons"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          <div className={styles.navItem}>
            <div className={styles.navText}>
              <MdSmartToy />
              <span>Мультфильмы</span>
            </div>
          </div>
        </NavLink>
      </div>
      <div className={styles.navGroup}>
        <span className={styles.groupName}>ПОПУЛЯРНЫЕ ЖАНРЫ</span>
        <NavLink
          to="/comedy"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          <div className={styles.navItem}>
            <div className={styles.navText}>
              <PiMaskHappyFill />
              <span>Комедии</span>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/fantasy"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          <div className={styles.navItem}>
            <div className={styles.navText}>
              <FaWandMagicSparkles />
              <span>Фэнтези</span>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/horrors"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          <div className={styles.navItem}>
            <div className={styles.navText}>
              <BiSolidGhost />
              <span>Ужасы</span>
            </div>
          </div>
        </NavLink>
      </div>
      <div className={styles.navGroup}>
        <span className={styles.groupName}>ЛИЧНЫЙ КАБИНЕТ</span>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
          >
          <div className={styles.navItem}>
            <div className={styles.navText}>
              <MdPerson />
              <span>Профиль</span>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          <div className={styles.navItem}>
            <div className={styles.navText}>
              <FaRegHeart />
              <span>Избранные</span>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};
