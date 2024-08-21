import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { DataContext } from "../context/context";
import PlaylistDisplay from "../playlistDisplay/playlistDisplay";
import "./dashboard.style.css";
import SongCards from "../songCard/songCards";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { postCreatePlaylist_API_URL } from "../../api";
import LogoutIcon from "../../asset/logout.png";

function Dashboard() {
  const context = useContext(DataContext);
  const [trackStartTime, setTrackStartTime] = useState(0);
  const audioPlayerRef = useRef(null); 

  const getStoredTrackTime = (trackId) => {
    const storedTime = localStorage.getItem(`track-time-${trackId}`);
    return storedTime ? parseFloat(storedTime) : 0;
  };

  const storeTrackTime = (trackURL, time) => {
    localStorage.setItem(`track-time-${trackURL}`, time);
  };

  useEffect(() => {
    if (context.playTrack) {
      const startTime = getStoredTrackTime(context.playTrack);
      setTrackStartTime(startTime);
    }
  }, [context.playTrack]);

  useEffect(() => {
    const audioElement = audioPlayerRef.current?.audio.current;
    if (audioElement) audioElement.currentTime = trackStartTime; 
  }, [trackStartTime]);

  const handleCreatePlaylist = () => {
    context.setIsCreatingPlaylist(true);
  };

  const handleInputChange = (e) => {
    context.setPlayListname(e.target.value);
  };

  const handleInputBlur = () => {
    context.setIsCreatingPlaylist(false);
    if (context.playListname.length !== 0) handleCreatePlaylistAPI();
  };

  const handleCreatePlaylistAPI = async () => {
    try{
      const response = await axios.post(postCreatePlaylist_API_URL, {
        email: context.userEmail,
        playListname: context.playListname,
      });
      context.refreshPlaylists();
    }catch(error){ throw error}
  };

  const handleLogout = () => {
    context.setUserEmail(false);
    context.setIsLoggedIn(false);
    localStorage.clear();
  };

  const handleAudioPause = (e) => {
    storeTrackTime(context.playTrack, e.target.currentTime);
  };

  return (
    <div className="appWrapper">
      <div className="titleBar">
      <div className="userName">Welcome User</div>
      <div onClick={handleLogout}> <img src={LogoutIcon} alt="Not Found" className="logoutIcon"/></div>

      </div>
      <div>
        <AudioPlayer
          ref={audioPlayerRef} 
          key={context.playTrack} 
          className="audioPlayer"
          autoPlay
          src={context.playTrack}
          onPause={handleAudioPause} 
          onEnded={handleAudioPause} 
          style={{ width: "600px", border: "3px solid red", boxShadow: "5px 5px 15px" }}
        />
      </div>
      <div className="playListItem" onClick={handleCreatePlaylist}>
        + Create Playlist
      </div>
      <div>
        {context.isCreatingPlaylist ? (
          <div className="">
            <input
              type="text"
              value={context.playListname}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="Enter Playlist Name"
              autoFocus
              className="playlistInput"
            />
            <button className="addPlayListButton"> + </button>
          </div>
        ) : (
          false
        )}
      </div>
      <div className="">
        {context.allPlaylist.length !== 0 ? <PlaylistDisplay /> : false}
      </div>
      <div>
        {context.tracks ? (
          <>
            {context.tracks.length !== 0 || context.tracks.length !== null ? (
              <SongCards tracks={context.tracks} />
            ) : (
              false
            )}
          </>
        ) : (
          false
        )}
      </div>
    </div>
  );
}

export default Dashboard;
