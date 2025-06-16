import React from 'react';
import YouTube from 'react-youtube';

const YoutubeMovie = ({ height, width,videoId }) => {
    const options = {
        height: height ?? '390',
        width: width ?? '640',
        playerVars: {
            autoplay: 1,
            controls: 1,
        },
    };

    const handleReady = (event) => {
        event.target.pauseVideo();
    };

    return (
        <YouTube
            videoId={videoId ?? "Oflbho9ZG2U"}
            opts={options}
            onReady={handleReady}
            id="video"
        />
    );
};

export default YoutubeMovie;