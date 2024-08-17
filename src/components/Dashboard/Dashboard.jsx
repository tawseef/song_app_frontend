import React, { useEffect, useState } from "react";
import "./dashboard.style.css";
import axios from "axios";
import SongCards from "../songCard/songCards";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function Dashboard() {
  const [data, setData] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [playListname, setPlayListname] = useState("");
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false); // State to toggle input box visibility

  useEffect(() => {
    const callApi = async () => {
      const resp = await axios.get(
        "https://v1.nocodeapi.com/tawseefalam/spotify/CuDNOjnseQwurvbO/search?q=track&type=track"
      );
      console.log(resp.data.tracks.items);
      setTracks(resp.data.tracks.items);
    };
    callApi();
  }, []);

  const handleCreatePlaylist = () => {
    setIsCreatingPlaylist(true); // Show the input box
  };

  const handleInputChange = (e) => {
    setPlayListname(e.target.value); // Update playlist name state
  };

  const handleInputBlur = () => {
    setIsCreatingPlaylist(false); // Hide the input box on blur
    // Here you can add logic to save the playlist name if necessary
  };

  console.log(tracks);

  return (
    <div className="appWrapper">
      <div className="userName">Welcome User</div>
      <div className="playListItem" onClick={handleCreatePlaylist}>
        + Create Playlist
      </div>
      <div>
      <AudioPlayer
      className="audioPlayer"
      autoPlay
      src="http://example.com/audio.mp3"
      onPlay={e => console.log("onPlay")}
      style={{ width: '500px', border:"2px solid red" }} 
      // other props here
    />
        {isCreatingPlaylist ? (
          <div className="">
            <input
              type="text"
              value={playListname}
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
      <div>{tracks && <SongCards tracks={tracks} />}</div>
    </div>
  );
}

export default Dashboard;
