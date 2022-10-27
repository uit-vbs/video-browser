import { Button, Card, CardMedia, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import { useRef, useState } from 'react';

const URL_CDN = "http://192.168.20.156:5004/videos/";

const VideoSegment = (props) => {

    const videoRef = useRef();

    return (
        <Card 
            sx={{ transform: props.transform, transition: "all 400ms ease" }} 
            onClick={() => {}}
        >
            <CardMedia
                component="video"
                src={URL_CDN + props.transition?.video_path}
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