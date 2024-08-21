import React, { useContext } from "react";
import { DataContext } from "../context/context";
import "./playlistDisplay.style.css";
import axios from "axios";
import { deteleTrack_API_URL, deteleWholePlaylist_API_URL } from "../../api";

function PlaylistDisplay() {
  const context = useContext(DataContext);

  const handlePlayTrack = (url) => {
    console.log(url)
    context.setPlayTrack(url);
  };

  const handleDeleteTrack = async (name, track, url) =>{
    const headers = {
      'Content-Type': 'application/json'
    };

    const data = {
      "email": context.userEmail, 
       "playListname": name, 
       "trackName": track, 
       "previewURL": url
   }

    const deleteTrack = await axios.delete(deteleTrack_API_URL, { headers, data } )
    console.log(deleteTrack.data);
    context.refreshPlaylists();
  }

  const handleDeleteFullPlaylist = async (name) =>{
    const headers = {
      'Content-Type': 'application/json'
    };
    
    const data={
      email: context.userEmail,
      playListname: name
    }
    const deletePlaylist = await axios.delete(deteleWholePlaylist_API_URL, {headers, data})
    console.log(deletePlaylist.data);
    context.refreshPlaylists();
  }

  return (
    <div className="playlistDisplayWrapper">
      {context.allPlaylistData !== null
        ? context.allPlaylistData.playListDetail.map((ele, ind) => (
            <div className="playlistDisplayContent" key={ind + "key"}>
              <div className="playListTitle">
                <div>{ele.playListname}</div>
                <div onClick={()=>{handleDeleteFullPlaylist(ele.playListname)}}>🔴</div>
                </div>
              {ele.trackDetails !== 0 ? (
                <>
                  {ele.trackDetails.map((item, idx) => (
                    <div
                      className="trackNames"
                      key={idx + "key"}
                      onClick={() => handlePlayTrack(item.previewURL)}
                    >
                      <div>{item.trackName}</div><div onClick={(e)=>{
                        e.stopPropagation();
                        handleDeleteTrack(ele.playListname, item.trackName, item.previewURL)
                        }}>⛔</div>
                    </div>
                  ))}
                </>
              ) : (
                false
              )}
            </div>
          ))
        : false}
    </div>
  );
}

export default PlaylistDisplay;
