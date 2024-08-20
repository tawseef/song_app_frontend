import React, { useContext, useEffect, useState, useRef } from "react";
import { DataContext } from "../context/context";
import "./songCard.style.css";
import SelectPlaylistComponent from "../selectPlaylistComponent/selectPlaylistComponent";

function SongCards({ tracks }) {
  const context = useContext(DataContext);
  const playlistRef = useRef(null);
  const [openPlaylistIndex, setOpenPlaylistIndex] = useState(null);

  const handlePlayTrack = (url) => {
    context.setPlayTrack(url);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (playlistRef.current && !playlistRef.current.contains(event.target)) {
        setOpenPlaylistIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openPlaylistIndex]);

  const handlePlaylistOpen = (index) => {
    setOpenPlaylistIndex(openPlaylistIndex === index ? null : index);
  };

  return (
    <div className="cardWrapper">
      {tracks.map((ele, index) => (
        <div key={ele.id} className="cardCover">
          <div className="coverImage">
            <img src={ele.album.images[1].url} alt="not found" />
          </div>
          <div className="eleName">{ele.name.slice(0, 19)}</div>
          <div className="eleArtist">Artists: {ele.artists[0].name}</div>
          <div className="audioTag">
            <button onClick={() => handlePlayTrack(ele.preview_url)}>
              PLAY THIS
            </button>
            <div>
              <button
                className="playlistButton"
                onClick={() => handlePlaylistOpen(index)}
              >
                Add to Playlist
              </button>
              {openPlaylistIndex === index && (
                <div ref={playlistRef}>
                  <SelectPlaylistComponent data={ele} />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SongCards;
