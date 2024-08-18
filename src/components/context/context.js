import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { track_API, getAllPlaylist_API } from "../../api";

export const DataContext = createContext(null);

export const DataProvider = (props) => {
  const [data, setData] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [playListname, setPlayListname] = useState("");
  const [playTrack, setPlayTrack] = useState("");
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [allPlaylist, setAllPlaylist] = useState("");

  useEffect(() => {
    const callAllTrackApi = async () => {
    try{
      const resp = await axios.get(track_API);
      setTracks(resp.data.tracks.items);
    }catch(error){throw error}
  };
  callAllTrackApi();
}, []);

useEffect(() => {
  const callGetPresentPlaylist = async () => {
  try{
    const resp = await axios.get("http://localhost:8082/v1/getAllPlaylists")
    console.log(resp.data)
    setAllPlaylist(resp.data);
  }catch(error){throw error}
  }
    callGetPresentPlaylist();
  }, []);

  const refreshPlaylists = async () => {
    try {
      const resp = await axios.get(getAllPlaylist_API);
      setAllPlaylist(resp.data);
    } catch (error) {
      console.error("Error refreshing playlists:", error);
    }
  };

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
        refreshPlaylists
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
