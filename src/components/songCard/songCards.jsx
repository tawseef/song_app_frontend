import React from "react";
import "./songCard.style.css";

function SongCards({ tracks }) {
  return (
    <div className="cardWrapper">
      {tracks.map((ele) => (
        <div key={ele.id} className="cardCover">
        <div className="coverImage">
          <img src={ele.album.images[1].url} alt="not found" />
        </div>
          <div className="eleName">{ele.name.slice(0,19)}</div>
          <div className="eleArtist">Artists: {ele.artists[0].name}</div>
          <div className="audioTag">
          <audio src={ele.preview_url} controls />
            <div className="">
                <button className="playlistButton">Add to Playlist</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


export default SongCards;
