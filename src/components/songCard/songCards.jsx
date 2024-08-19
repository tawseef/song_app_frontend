import React, {useContext} from "react";
import { DataContext } from "../context/context";
import "./songCard.style.css";
import axios from "axios";
import {addTracksToPlaylist_API_URL} from "../../api";

function SongCards({ tracks }) {
  const context = useContext(DataContext);
  
  const handlePlayTrack = (url) => {
    context.setPlayTrack(url);
  };

  const handleAddToPlaylist = (ele) =>{
    apiCallForAddInPlaylist(ele.name, ele.preview_url);
    context.refreshPlaylists();
  }

  const apiCallForAddInPlaylist = async (name, url) =>{
    const response = await axios.post(addTracksToPlaylist_API_URL, {
        "email": "test@mail.com",
        "playListname": context.playListname,
        "trackName": name,
        "previewURL": url
    } 
    )
  }

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
            <div>
                <button className="playlistButton" onClick={()=>handleAddToPlaylist(ele)}>Add to Playlist</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


export default SongCards;
