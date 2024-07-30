import classes from "./Search.module.css";
import swal from "sweetalert";
import { requests } from "../../App";
import React, { useState } from "react";
import MovieDetail from "../browse/MovieDetail";

function SearchForm() {
  const [resultList, setResultList] = useState();
  const [detail, setDetail] = useState();

  async function onSubmit(e) {
    e.preventDefault();
    setDetail("");

    if (!e.target.movie.value) {
      swal("Tên phim trống!!!!", "Vui lòng điều tên phim để tìm kiếm", "error");
    } else {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3${requests.fetchSearch}&query=${e.target.movie.value}`
        );
        const data = await res.json();

        if (data.results.length === 0) {
          setResultList("KHÔNG CÓ DỮ LIỆU PHIM TÌM KIẾM");
        } else {
          setResultList(data.results);
        }
      } catch (e) {
        console.error(`lỗi là: ${e}`);
      }
    }
  }

  return (
    <>
      <div style={{ padding: "80px", paddingBottom: "0px" }}>
        <form onSubmit={onSubmit} className={classes.searchForm}>
          <div style={{ borderBottom: "3px solid #00bbec" }}>
            <div className={classes.input}>
              <input type="text" name="movie" />

              <svg
                className="svg-inline--fa fa-search fa-w-16"
                fill="#ccc"
                aria-hidden="true"
                data-prefix="fas"
                data-icon="search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="30"
                height="30"
              >
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
              </svg>
            </div>
          </div>
          <div className={classes.buttonFrom}>
            <button type="reset">RESET</button>
            <button
              type="submit"
              style={{ backgroundColor: "#00bbec", color: "white" }}
            >
              SEARCH
            </button>
          </div>
        </form>
      </div>
      <ResultList
        setDetail={setDetail}
        detail={detail}
        resultList={resultList}
      />
    </>
  );
}

function ResultList(props) {
  function checkMovie(movie) {
    if (props.detail && props.detail.id == movie.id) {
      props.setDetail(null);
    } else {
      props.setDetail(movie);
    }
  }
  return (
    <div className={classes.resultList}>
      {props.resultList && (
        <>
          <h1>Search Result</h1>
          <div className={classes.listMovie}>
            {props.resultList && Array.isArray(props.resultList) ? (
              props.resultList.map(
                (e) =>
                  e.backdrop_path && (
                    <img
                      className={classes.img}
                      key={e.id}
                      src={`https://image.tmdb.org/t/p/w200/${e.poster_path}`}
                      onClick={() => checkMovie(e)}
                    />
                  )
              )
            ) : (
              <h2>{props.resultList}</h2>
            )}
          </div>
        </>
      )}
      {props.detail && <MovieDetail movie={props.detail} />}
    </div>
  );
}

export default SearchForm;
