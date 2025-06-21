import React, { useEffect, useRef, useState } from "react";
import cards_data from "../../assets/cards/Cards_data";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjAwM2JlNTgzMDA0ZDFjNTM1NDgyNjg2YzExYTVmMSIsIm5iZiI6MTc0NDcwNzE2Ni4yMywic3ViIjoiNjdmZTFlNWVkZTVlNGRlYzYyYWU2YmUxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.mhTKPi_5TUJ-THtIMIwAhUWhUpSZUBTDf0UsQmVwqF8",
    },
  };

  const handleWheel = (event) => {
    event.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {

    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
  console.log("API response: ", res);
  setApiData(res.results);
})
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="titlecards">
      <h2>{title ? title : "Polular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
