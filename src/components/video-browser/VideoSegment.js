import { Button, Card, CardMedia, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import { useRef, useState } from 'react';

const URL_CDN = "http://192.168.20.156:5004/videos/";

const VideoSegment = (props) => {

    const videoRef = useRef();

    const getVideoSrc = () => {
        if(!props.src) return "sample_video.mp4";
        return URL_CDN + props.src;
    }

    return (
        <Card sx={{ transform: props.transform, transition: "all 400ms ease" }} >
            <CardMedia
                component="video"
                src={getVideoSrc()}
                ref={videoRef}
                onMouseOver={e => { if (props.index == 0) e.target.play() }}
                onMouseOut={e => {
                    e.target.pause();
                    e.target.currentTime = 0;
                }}
                onCanPlay={() => videoRef.current.playbackRate = 5}
                sx={{ opacity: 1 - props.index * 0.3 }}
                preload="metadata"
                loop muted
            >
            </CardMedia>
        </Card>
    );
}

export default VideoSegment;