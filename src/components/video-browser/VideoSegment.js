import { Card, CardMedia } from '@mui/material';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNegativeFeedback, togglePositiveFeedback } from 'redux/slices/relevantFeedbackSlice';
import { addSubmission } from 'redux/slices/submitSlice';
import { getFrameId, getTransitionKey } from 'utils';

import './VideoSegment.css';

const URL_CDN = "http://192.168.20.156:5004/videos/";

const VideoSegment = (props) => {

    const videoRef = useRef();

    const dispatch = useDispatch();
    const isPositiveFeedback = useSelector(state => (getTransitionKey(props.transition) in state.relevantFeedbacks.positives));
    const isNegativeFeedback = useSelector(state => (getTransitionKey(props.transition) in state.relevantFeedbacks.negatives));
    const submissionIndex = useSelector(state => state.submissions.findIndex(transition => getTransitionKey(props.transition) === getTransitionKey(transition)));

    const [isHover, setHover] = useState(false);

    const handleHoverOn = () => {
        if (isHover) return;
        if (props.index !== 0) return;
        setHover(true);
        videoRef.current.play();
    }

    const handleHoverOff = () => {
        if (!isHover) return;
        setHover(false);
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    }

    const leftClick = e => {
        dispatch(togglePositiveFeedback(props.transition))
    }

    const rightClick = e => {
        dispatch(toggleNegativeFeedback(props.transition));
    }

    const middleClick = e => {
        dispatch(addSubmission(props.transition));
        e.preventDefault();
    }

    const handleClick = e => {
        switch (e.button) {
            case 0: // Left click
                leftClick(e);
                break;
            case 2: // Right click
                rightClick(e);
                break;
            case 1: // Middle click
                middleClick(e);
                break;
        }
    }

    const getMediaClassName = () => {
        if (isPositiveFeedback) return "segment-positive";
        if (isNegativeFeedback) return "segment-negative";
        return "";
    }

    return (
        <Card
            sx={{
                transform: props.transform, transition: "all 400ms ease",
                flexShrink: 0,
                width: "20%", height: "100%",
            }}
            onMouseDown={handleClick}
            onContextMenu={e => e.preventDefault()}
            onMouseEnter={handleHoverOn}
            onMouseLeave={handleHoverOff}
        >
            <CardMedia
                component="video"
                // className={getMediaClassName()}
                src={URL_CDN + props.transition?.video_path}
                ref={videoRef}
                onCanPlay={() => videoRef.current.playbackRate = 4}
                sx={{ opacity: 1 - props.index * 0.3 }}
                preload="metadata"
                loop muted
            >
            </CardMedia>
            {/* Submission overlay */}
            {
                submissionIndex != -1 ? <div
                    className={"submission-overlay"}
                    style={{ position: "absolute", top: 0, width: "100%", height: "100%" }}
                ><span>{submissionIndex + 1}</span></div> : <div />
            }
            {/* Relevant feedback border */}
            <div
                className={getMediaClassName()}
                style={{ position: "absolute", top: 0, width: "100%", height: "100%" }}
            />
            {/* Hover tooltip */}
            {
                isHover ? (<div style={{ position: "absolute", bottom: 0, backgroundColor: "#f0f0f0", fontSize: 14 }}>
                    {getFrameId(props.transition)}
                </div>) : <div />
            }
        </Card>
    );
}

export default VideoSegment;