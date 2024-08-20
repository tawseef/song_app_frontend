import React, { useContext } from "react";
import { DataContext } from "../context/context";
import "./playlistDisplay.style.css";

function PlaylistDisplay() {
  const context = useContext(DataContext);

  const handlePlayTrack = (url) => {
    context.setPlayTrack(url);
  };

  return (
    <div className="playlistDisplayWrapper">
      {context.allPlaylistData !== null
        ? context.allPlaylistData.playListDetail.map((ele, ind) => (
            <div className="playlistDisplayContent" key={ind + "key"}>
              <div className="playListTitle">{ele.playListname}</div>
              {ele.trackDetails !== 0 ? (
                <>
                  {ele.trackDetails.map((item, idx) => (
                    <div
                      className="trackNames"
                      key={idx + "key"}
                      onClick={() => handlePlayTrack(item.previewURL)}
                    >
                      {item.trackName}
                    </div>
                  ))}
                </>
              ) : (
                false
              )}
            </div>
          ))
        : false}
    </div>
  );
}

export default PlaylistDisplay;
