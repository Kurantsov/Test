import React, { useState } from "react";
import "./MusicPage.css";
import { request } from "./logicMusicPage";

function MusicPage() {
  const [parseData, setParseData] = useState(
    JSON.parse(localStorage.getItem("sessionID"))
  );

  function addLike(event) {
    let elem = event.target.parentElement;
    let child = elem.firstElementChild.textContent;

    for (let i = 0; i < parseData.length; i++) {
      if (child === parseData[i].title) {
        parseData[i].likes += 1;
      }
    }

    parseData.sort(function (a, b) {
      if (a.likes < b.likes) {
        return 1;
      }
      if (a.likes > b.likes) {
        return -1;
      }
      return 0;
    });
    console.log(parseData);
    localStorage.setItem("sessionID", JSON.stringify(parseData));
    setParseData(JSON.parse(localStorage.getItem("sessionID")));
  }

  function deleteLike(event) {
    let elem = event.target.parentElement;
    let child = elem.firstElementChild.textContent;

    for (let i = 0; i < parseData.length; i++) {
      if (child === parseData[i].title) {
        parseData[i].likes -= 1;
      }
    }

    parseData.sort(function (a, b) {
      if (a.likes < b.likes) {
        return 1;
      }
      if (a.likes > b.likes) {
        return -1;
      }
      return 0;
    });
    console.log(parseData);
    localStorage.setItem("sessionID", JSON.stringify(parseData));
    setParseData(JSON.parse(localStorage.getItem("sessionID")));
  }

  function DataList() {
    if (parseData === null) {
      request();
    } else {
      return (
        <ul className="track-list">
          <li className="track-list__item">
            <span className="track-list__item_title title-text column">
              TITLE
            </span>
            <span className="track-list__item_artist title-text column">
              ARTIST
            </span>
            <span className="track-list__item_album title-text column">
              ALBUM
            </span>
          </li>
          {parseData.map((data) => (
            <li key={data.id} className="track-list__item">
              <p className="track-list__item_title column">{data.title}</p>
              <span className="track-list__item_artist column">
                {data.artist.name}
              </span>
              <span className="track-list__item_album column">
                {data.album.title}
              </span>
              <button className="like-button" onClick={addLike}>
                Like
              </button>
              <button className="dislike-button" onClick={deleteLike}>
                Dislike
              </button>
            </li>
          ))}
        </ul>
      );
    }
  }

  return (
    <div>
      <div className="conteiner">
        <header className="header">
          <div className="image">
            <img src={parseData[0].album.cover} alt="album" />
          </div>

          <div className="header-info">
            <h1 className="header-info__title">{parseData[0].artist.name}</h1>
            <p className="header-info__text">
              {parseData[0].artist.name} is Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Fusce scelerisque id nunc venenatis
              sagittis. Vestibulum commodo eget sapien quis auctor. Nulla ut
              nisi finibus dolor tincidunt viverra ut ut nibh. In consectetur
              eros placerat ante lacinia, non hendrerit diam lobortis. Etiam sit
              amet nibh enim. Nunc massa libero, elementum quis varius at,
              imperdiet sed est. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Donec non libero eu
              lacus maximus posuere.
            </p>
          </div>
        </header>
      </div>
      <div className="main-content">
        <DataList />
      </div>
    </div>
  );
}

export default MusicPage;
