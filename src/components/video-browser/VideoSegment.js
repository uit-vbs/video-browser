import { Button, Card, CardMedia, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import { useContext, useEffect, useRef, useState } from 'react';
import { RelevantFeedbackContext } from './RelevantFeedbackContext';

import './VideoSegment.css';

const URL_CDN = "http://192.168.20.156:5004/videos/";

const VideoSegment = (props) => {

    const videoRef = useRef();
    const { togglePositiveFeedback, toggleNegativeFeedback, isPositiveFeedback, isNegativeFeedback } = useContext(RelevantFeedbackContext);

    const [selectState, setSelectState] = useState(0);
    const [isHover, setHover] = useState(false);

    const leftClick = e => {
        setSelectState(togglePositiveFeedback(props.transition));
    }

    const rightClick = e => {
        setSelectState(toggleNegativeFeedback(props.transition));
        e.preventDefault();
    }

    const getMediaClassName = () => {
        if (selectState > 0) return "segment-positive";
        if (selectState < 0) return "segment-negative";
        return "";
    }

    return (
        <Card
            sx={{ transform: props.transform, transition: "all 400ms ease" }}
            onClick={leftClick}
            onContextMenu={rightClick}
            onMouseEnter={() => { if (!isHover) setHover(true) }}
            onMouseLeave={() => { if (isHover) setHover(false) }}
        >
            <CardMedia
                component="video"
                className={getMediaClassName()}
                src={URL_CDN + props.transition?.video_path}
                ref={videoRef}
                onMouseOver={e => { if (props.index == 0) e.target.play() }}
                onMouseOut={e => {
                    e.target.pause();
                    e.target.currentTime = 0;
                }}
                onCanPlay={() => videoRef.current.playbackRate = 4}
                sx={{ opacity: 1 - props.index * 0.3 }}
                preload="metadata"
                loop muted
            >
            </CardMedia>
            {
                isHover ? (<div>{props.transition?.video_path}</div>) : <div />
            }
        </Card>
    );
}

export default VideoSegment;