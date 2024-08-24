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
  const [playTrack, setPlayTrack] = useState(null);
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [allPlaylist, setAllPlaylist] = useState("");
  const [allPlaylistData, setAllPlaylistData] = useState([]);

  useEffect(()=>{
    const persistLoginFeature = () =>{
      const getLocalStorageUserId = localStorage.getItem("isLoggedInId")
      const getLocalStorageUserToken = localStorage.getItem("token")
      const getLocalStorageUserEmail = localStorage.getItem("email")
      if (getLocalStorageUserId && getLocalStorageUserToken && getLocalStorageUserEmail){
        setIsLoggedIn(true);
        setUserEmail(getLocalStorageUserEmail);
      }
    }
    persistLoginFeature()
  },[])

  useEffect(() => {
    const callAllTrackApi = async () => {
      try {
        const resp = await axios.get(track_API);
        setTracks(resp.data.tracks.items);
      } catch (error) {
        throw error;
      }
    };
    // if(userEmail)
    callAllTrackApi();
  }, [userEmail]);

  const refreshPlaylists = async () => {
    try {
      const resp = await axios.get(getAllPlaylist_API, {
        params: {
          email: localStorage.getItem("email"),
        },
      });

      const response = await axios.get(getAllDataOfAllPlaylist_API_URL, {
        params: {
          email: localStorage.getItem("email"),
        },
      });
      setAllPlaylistData(response.data);
      
      if (resp.data.length !== 0) {
        setAllPlaylist(resp.data);
      } else setAllPlaylist([]);

    } catch (error) {
      console.error("Error refreshing playlists:", error);
    }
  };

  useEffect(() => {
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
