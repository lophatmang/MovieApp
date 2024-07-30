import React, { useEffect, useState } from "react";
import classes from "./Browse.module.css";

function MovieDetail(props) {
  const [videoYoutube, setVideoYoutube] = useState();

  useEffect(() => {
    async function fetchApi() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${props.movie.id}/videos?api_key=26c6591badba825ef0c47ed30d223710`
        );

        if (!res.ok) setVideoYoutube("");
        const data = await res.json();

        if (data.results.length !== 0) {
          data.results.map((e) => {
            if (e.site === "YouTube") {
              if (e.type === "Trailer") {
                setVideoYoutube(e);
              } else if (e.type === "Teaser") {
                setVideoYoutube(e);
              } else {
                setVideoYoutube("");
              }
            }
          });
        } else {
          setVideoYoutube("");
        }
      } catch (e) {
        console.error("Lỗi: ", e);
      }
    }
    fetchApi();
  }, [props.movie]);

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
    >
      <div className={classes.detailMovie}>
        <h1>{props.movie.name || props.movie.original_title}</h1>
        <p>
          <span>
            Release Date:{" "}
            {props.movie.release_date || props.movie.first_air_date}
          </span>
        </p>
        <p>
          <span>Vote: {props.movie.vote_average}/10</span>
        </p>
        <p>{props.movie.overview}</p>
      </div>
      <div>
        {videoYoutube ? (
          <iframe
            className={classes.youtube}
            src={`https://www.youtube.com/embed/${videoYoutube.key}`}
            allowFullScreen
          ></iframe>
        ) : (
          <img
            key={props.movie.id}
            src={`https://image.tmdb.org/t/p/w500/${props.movie.backdrop_path}`}
          />
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
