import React, { useContext } from "react";
import axios from "axios";
import { DataContext } from "../context/context";
import PlaylistDisplay from "../playlistDisplay/playlistDisplay";
import "./dashboard.style.css";
import SongCards from "../songCard/songCards";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { postCreatePlaylist_API_URL } from "../../api";

function Dashboard() {
  const context = useContext(DataContext);

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
    const response = await axios.post(postCreatePlaylist_API_URL, {
      email: "test@mail.com",
      playListname: context.playListname,
    });
    console.log(response.data);
    context.refreshPlaylists();
  };

  return (
    <div className="appWrapper">
      <div className="userName">Welcome User</div>
      <div className="">
        <AudioPlayer
          key={context.playTrack}
          className="audioPlayer"
          autoPlay
          src={context.playTrack}
          onPlay={(e) => console.log("onPlay")}
          style={{ width: "500px", border: "2px solid red" }}
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
            {context.tracks.length !== 0 ? (
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
