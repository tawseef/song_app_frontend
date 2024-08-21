import React, { useContext } from "react";
import { DataContext } from "../context/context";
import "./playlistDisplay.style.css";
import axios from "axios";
import { deteleTrack_API_URL, deteleWholePlaylist_API_URL } from "../../api";
import {enqueueSnackbar} from "notistack";

function PlaylistDisplay() {
  const context = useContext(DataContext);

  const handlePlayTrack = (url) => {
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
    if(deleteTrack.status===200){
      enqueueSnackbar("Track Deleted", { variant: 'info' });      
    }
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
    const deletePlaylist = await axios.delete(deteleWholePlaylist_API_URL, {headers, data});
    if(deletePlaylist.status === 200) {
      enqueueSnackbar("Playlist Deleted", { variant: 'info' });
    }
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
                      <div>{item.trackName.slice(0,10)}</div>
                      <div onClick={(e)=>{
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
