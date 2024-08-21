import { createContext, useState, useEffect } from "react";
import axios from "axios";
import {
  track_API,
  getAllPlaylist_API,
  getAllDataOfAllPlaylist_API_URL,
} from "../../api";

export const DataContext = createContext(null);

export const DataProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(false);
  const [userSignup, setUserSignup] = useState(false);
  const [data, setData] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [playListname, setPlayListname] = useState("");
  const [playTrack, setPlayTrack] = useState("");
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [allPlaylist, setAllPlaylist] = useState("");
  const [allPlaylistData, setAllPlaylistData] = useState([]);

  useEffect(() => {
    const callAllTrackApi = async () => {
      try {
        const resp = await axios.get(track_API);
        setTracks(resp.data.tracks.items);
      } catch (error) {
        throw error;
      }
    };
    callAllTrackApi();
  }, []);

  const refreshPlaylists = async () => {
    try {
      const response = await axios.get(getAllDataOfAllPlaylist_API_URL);
      setAllPlaylistData(response.data);

      const resp = await axios.get(getAllPlaylist_API);
      setAllPlaylist(resp.data);
    } catch (error) {
      console.error("Error refreshing playlists:", error);
    }
  };

  useEffect(() => {
    const callGetPresentPlaylist = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:8082/v1/getAllPlaylists"
        );
        console.log(">>>>>>>>>>>", resp.data);
        if (resp.data.length !== 0) {
          setAllPlaylist(resp.data);
          setPlayListname(resp.data[resp.data.length - 1]);
        } else setAllPlaylist([]);
      } catch (error) {
        throw error;
      }
    };
    callGetPresentPlaylist();
    refreshPlaylists();
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        playTrack,
        setPlayTrack,
        tracks,
        setTracks,
        playListname,
        setPlayListname,
        isCreatingPlaylist,
        setIsCreatingPlaylist,
        allPlaylist,
        setAllPlaylist,
        refreshPlaylists,
        allPlaylistData,
        setAllPlaylistData,
        isLoggedIn,
        setIsLoggedIn,
        userEmail,
        setUserEmail,
        userSignup,
        setUserSignup
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
