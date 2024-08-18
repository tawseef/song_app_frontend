import React, {useContext} from "react";
import { DataContext } from "../context/context";
import "./songCard.style.css";

function SongCards({ tracks }) {
  const context = useContext(DataContext);
  
  const handlePlayTrack = (url) => {
    context.setPlayTrack(url);
  };

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
            <button onClick={()=>handlePlayTrack(ele.preview_url)}> PLAY THIS </button>
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
