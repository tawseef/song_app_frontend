import React, {useContext} from 'react';
import { DataContext } from '../context/context';
import "./selectPlaylistComp.style.css";
import axios from 'axios';
import {addTracksToPlaylist_API_URL} from "../../api";

function SelectPlaylistComponent(props) {
  const context = useContext(DataContext);


  const handleAddToPlaylist = (ele) =>{
    apiCallForAddInPlaylist(ele.name, ele.preview_url);
    setTimeout(()=>{context.refreshPlaylists();},500)
  }

  const apiCallForAddInPlaylist = async (name, url) =>{
    try{
      await axios.post(addTracksToPlaylist_API_URL, {
          "email": context.userEmail,
          "playListname": context.playListname,
          "trackName": name,
          "previewURL": url
      } 
      )
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className='selectPlaylistWrapper'>
      <div className='selectPlaylistTitle'>Select Playlist</div>
        {
          context.allPlaylist.length!==0? 
            context.allPlaylist.map((item, ind)=>(
              <div className="playlistItem" key={ind+"key"} onClick={()=>{
                console.log(item);
                handleAddToPlaylist(props.data)
                }}>
                {item}
                <hr />
              </div>
            ))
          :<div className='createPlaylist'>Create Playlist</div>
        }
    </div>
  )
}

export default SelectPlaylistComponent