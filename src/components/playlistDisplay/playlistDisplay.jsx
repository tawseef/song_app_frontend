import React, { useContext } from 'react';
import { DataContext } from '../context/context';
import "./playlistDisplay.style.css";

function PlaylistDisplay() {
  const context = useContext(DataContext); 
  // console.log(context.allPlaylistData.playListDetail)
  const handlePlayTrack = (url) => {
    context.setPlayTrack(url);
  };

  return (
    <div className='playlistDisplayWrapper'>
        {
            context.allPlaylistData.length !==0  ? 
            context.allPlaylistData.playListDetail.map((ele, ind)=>(
            <div className='playlistDisplayContent' key={ind+"key"}>
                <div className='playListTitle'>{ele.playListname}</div>
                {ele.trackDetails !==0 ? 
                  <>{
                    ele.trackDetails.map((item)=>(
                      <div onClick={()=>handlePlayTrack(item.previewURL)}>{item.trackName}</div>
                    ))
                  }</>
                : false}
            </div>))
            : 
            false
        }
        {/* {
            context.allPlaylist.length!==0 ? 
            context.allPlaylist.map((ele, ind)=>(
            <div className='playlistDisplayContent' key={ind+"key"}>
                <div className='playListTitle'>{ele}</div>
                <div onClick={()=>console.log(ele)}>scnsacnsd</div>
                <div>scnsacnsd</div>
                <div>scnsacnsd</div>
            </div>))
            : 
            false
        } */}
    </div>
  )
}

export default PlaylistDisplay;
