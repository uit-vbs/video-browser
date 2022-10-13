import { Button, Card, CardMedia, Collapse, IconButton, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import { useRef, useState } from 'react';
import VideoSegment from './VideoSegment';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { makeStyles } from '@mui/styles';
import { TransitionGroup } from 'react-transition-group';

const useStyles = makeStyles((theme) => ({
    navButton: {
        top: "50%",
        transform: "translateY(-50%)",
        [theme.breakpoints.up('sm')]: {
            '& svg': {
                fontSize: 32
            }
        },
        [theme.breakpoints.up('md')]: {
            '& svg': {
                fontSize: 48
            }
        },
    }
}));

const VideoInstance = (props) => {

    const classes = useStyles();

    const show = 5;
    const lazy = 15;
    const [videoIndex, setVideoIndex] = useState(Math.floor(lazy / 2));

    const getVideoPath = (index) => "bp/sample_video_" + String(index).padStart(3, '0') + ".mp4";

    const getVideoSegments = () => Array.from({ length: 15 }, (x, i) => getVideoPath(props.videoId + i - 7));

    const getVideoSegment = (video, index, array) => (
        <VideoSegment
            src={video}
            index={Math.abs(index - videoIndex - Math.floor(show / 2))}
            transform={`translateX(-${videoIndex * 100}%)`}
        />
    );

    const addVideoNext = () => {
        setVideoIndex(videoIndex + 1);
    }

    const addVideoPrev = () => {
        setVideoIndex(videoIndex - 1);
    }

    const videoRef = useRef();

    return (
        <Stack
            direction="row"
            sx={{
                position: "relative",
                display: "flex",
                overflowX: "hidden",
                maxHeight: "25%",
                pb: 1, pt: 1,
            }}
        >
            {getVideoSegments().map((video, index, array) => {
                const videoSegment = getVideoSegment(video, index, array);
                return (
                    <Box sx={{ width: "20%", flexShrink: 0 }}>
                        <Collapse key={video + index} in={true} direction="left">
                            {videoSegment}
                        </Collapse>
                    </Box>
                );
            })}

            <IconButton
                color="primary"
                className={classes.navButton}
                onClick={e => addVideoPrev()}
                sx={{ position: "absolute", left: 0 }}
            >
                <KeyboardDoubleArrowLeftIcon />
            </IconButton>
            <IconButton
                color="primary"
                className={classes.navButton}
                onClick={e => addVideoNext()}
                sx={{ position: "absolute", right: 0 }}
            >
                <KeyboardDoubleArrowRightIcon />
            </IconButton>
        </Stack>
    );
}

export default VideoInstance;