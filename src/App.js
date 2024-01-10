import { Link, Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
import axios, { all } from "axios";
import { Search } from "./components/Search/Search";
import { Registration } from "./components/Registration/Registration";
import { Profile } from "./components/Profile/Profile";
import { SideBar } from "./components/SideBar/SideBar";
import { GroupItems } from "./components/GroupItems/GroupItems";
import { GenresItems } from "./components/GenresItems/GenresItems";
import { Category } from "./components/Category/Category";
import { Card } from "./components/Card/Card";
import styles from "./components/GroupItems/GroupItems.module.css";
import AppContextProvider, { AppContext } from "./context/AppContext";
import { Favorites } from "./components/Favorites/Favorites";
import { Subscribe } from "./components/SideBar/Subscribe/Subscribe";

function App() {
  const [allMovies, setAllMovies] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [banner, setBanner] = React.useState([]);
  const [groupMov, setGroupMov] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [bannerResponse, allResponse, groupsResponse, favoritesResponse] =
          await Promise.all([
            axios.get("http://localhost:3004/imgBanner"),
            axios.get("http://localhost:3004/all"),
            axios.get("http://localhost:3004/groups"),
            axios.get("http://localhost:3004/favorites"),
          ]);
        setBanner(bannerResponse.data);
        setAllMovies(allResponse.data);
        setGroupMov(groupsResponse.data);
        setFavorites(favoritesResponse.data);
      } catch (error) {
        alert("Ошибка при получении данных :(");
      }
    }
    fetchData();
  }, []);

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`http://localhost:3004/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "http://localhost:3004/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в избранное");
    }
  };

  return (
    <div
      style={{
        maxWidth: "100%",
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <AppContextProvider>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div style={{ minWidth: "300px" }}>
                    <SideBar />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div className={styles.watchNow}>
                      <span>Смотрите сейчас</span>
                      <div className={styles.imgBlock}>
                        <img src={`${banner}`} alt="Banner" />
                      </div>
                      <Link to="/watch/boicovskiy_club">
                        <button className={styles.btnWatch}>Смотреть</button>
                      </Link>
                    </div>
                    {groupMov.map((groupText, index) => (
                      <GroupItems
                        groupText={groupText}
                        allMovies={allMovies}
                        key={index}
                      />
                    ))}
                  </div>
                </>
              }
            />
            <Route
              path="/search"
              element={
                <>
                  <div style={{ minWidth: "300px" }}>
                    <SideBar />
                  </div>
                  <Search allMovies={allMovies} />
                </>
              }
            />
            <Route
              path="watch/:url"
              element={
                <>
                  <div style={{ minWidth: "300px" }}>
                    <SideBar />
                  </div>
                  <Card
                    allMovies={allMovies}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    onAddToFavorite={onAddToFavorite}
                    // isItemAdded={isItemAdded}
                  />
                </>
              }
            />
            <Route
              path="/films"
              element={
                <>
                  <div style={{ minWidth: "300px" }}>
                    <SideBar />
                  </div>
                  <Category key="film" type="film" title="Фильмы" />
                </>
              }
            />

            <Route
              path="/serials"
              element={
                <>
                  <div style={{ minWidth: "300px" }}>
                    <SideBar />
                  </div>
                  <Category key="serial" type="serial" title="Сериалы" />
                </>
              }
            />
            <Route
              path="/cartoons"
              element={
                <>
                  <div style={{ minWidth: "300px" }}>
                    <SideBar />
                  </div>
                  <Category
                    key="cartoons"
                    type="cartoons"
                    title="Мультфильмы"
                  />
                </>
              }
            />
            <Route
              path="/comedy"
              element={
                <>
                  <div style={{ minWidth: "300px" }}>
                    <SideBar />
                  </div>
                  <GenresItems genre="Комедии" allMovies={allMovies} />
                </>
              }
            />
            <Route
              path="/fantasy"
              element={
                <>
                  <div style={{ minWidth: "300px" }}>
                    <SideBar />
                  </div>
                  <GenresItems genre="Фэнтези" allMovies={allMovies} />
                </>
              }
            />
            <Route
              path="/horrors"
              element={
                <>
                  <div style={{ minWidth: "300px" }}>
                    <SideBar />
                  </div>
                  <GenresItems genre="Ужасы" allMovies={allMovies} />
                </>
              }
            />
            <Route path="/login" element={<Registration type="login" />} />
            <Route path="/signup" element={<Registration type="signup" />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route
              path="/favorites"
              element={
                <>
                  <div style={{ minWidth: "300px" }}>
                    <SideBar />
                  </div>
                  <Favorites type="Избранные" favorites={favorites} />
                </>
              }
            />
          </Routes>
        </AppContextProvider>
      </div>
    </div>
  );
}

export default App;
