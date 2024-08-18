import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/context";
import "./dashboard.style.css";
import SongCards from "../songCard/songCards";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function Dashboard() {
  const context = useContext(DataContext);

  const handleCreatePlaylist = () => {
    context.setIsCreatingPlaylist(true); 
  };

  const handleInputChange = (e) => {
    context.setPlayListname(e.target.value);
  };

  const handleInputBlur = () => {
    context.setIsCreatingPlaylist(false); // Hide the input box on blur
    // Here you can add logic to save the playlist name if necessary
  };

  console.log(context.tracks);

  return (
    <div className="appWrapper">
      <div className="userName">Welcome User</div>
      <div className="playListItem" onClick={handleCreatePlaylist}>
        + Create Playlist
      </div>
      <div>
      <AudioPlayer
         key={context.playTrack} 
          className="audioPlayer"
          autoPlay
          src={context.playTrack} // This should update when playTrack changes
          onPlay={(e) => console.log("onPlay")}
          style={{ width: "500px", border: "2px solid red" }}
        />
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
      <div>{context.tracks && <SongCards tracks={context.tracks} />}</div>
    </div>
  );
}

export default Dashboard;
