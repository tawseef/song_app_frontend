import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = (props) => {
    const [data, setData] = useState(null);
    const [tracks, setTracks] = useState(null);
    const [playListname, setPlayListname] = useState("");
    const [playTrack, setPlayTrack] = useState("");
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

    
  useEffect(()=>{
    console.log("Current track: ", playTrack);    
  },[playTrack])
  

    return (
        <DataContext.Provider value={{data, setData, playTrack, setPlayTrack, tracks, setTracks, playListname, setPlayListname, isCreatingPlaylist, setIsCreatingPlaylist}}>
            {props.children}
        </DataContext.Provider>
    )
}
