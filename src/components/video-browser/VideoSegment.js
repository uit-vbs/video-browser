import { Card, CardMedia } from '@mui/material';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNegativeFeedback, togglePositiveFeedback } from 'redux/slices/relevantFeedbackSlice';
import { getTransitionKey } from 'utils';

import './VideoSegment.css';

const URL_CDN = "http://192.168.20.156:5004/videos/";

const VideoSegment = (props) => {

    const videoRef = useRef();

    const isPositiveFeedback = useSelector(state => (getTransitionKey(props.transition) in state.relevantFeedbacks.positives));
    const isNegativeFeedback = useSelector(state => (getTransitionKey(props.transition) in state.relevantFeedbacks.negatives));
    const dispatch = useDispatch();

    const [isHover, setHover] = useState(false);

    const leftClick = e => {
        dispatch(togglePositiveFeedback(props.transition))
    }

    const rightClick = e => {
        dispatch(toggleNegativeFeedback(props.transition));
        e.preventDefault();
    }

    const getMediaClassName = () => {
        if (isPositiveFeedback) return "segment-positive";
        if (isNegativeFeedback) return "segment-negative";
        return "";
    }

    const zeroPad = (num, places) => String(num).padStart(places, '0')

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
                onMouseOver={e => { if (props.index === 0) e.target.play() }}
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
                isHover ? (<div>
                    {`C${zeroPad(props.transition?.channel_id, 2)}_V${zeroPad(props.transition?.video_id, 4)}/${props.transition?.frame_start}`}
                </div>) : <div />
            }
        </Card>
    );
}

export default VideoSegment;