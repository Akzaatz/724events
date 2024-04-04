import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  // on initialise l'index du slider avec useState
  const [index, setIndex] = useState(0);

  // Tri des événements par date décroissante : On vérifie si les données existent et on les trient avec la méthode "sort"
  const byDateDesc = data?.focus
    ? data?.focus.sort(
        (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)
      )
    : [];

  useEffect(() => {
    const interval = setInterval(() => {
      // on modifie l'index toutes les 5secondes avec useEffect et setInterval
      setIndex((current) =>
        current < byDateDesc.length - 1 ? current + 1 : 0
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [index, byDateDesc.length]); // indique que l'effet doit être réexécuté chaque fois que l'index ou la longueur de "byDateDesc" changent

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc?.map((_, radioIdx) => (
                <input
                  key={`${_.title}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => null}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
