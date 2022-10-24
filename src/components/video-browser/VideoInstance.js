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
    const totalVideos = props.video.length;
    const [currentIndex, setVideoIndex] = useState(Math.floor(totalVideos / 2));

    const getVideoSegment = (video, videoIndex, array) => (
        <VideoSegment
            src={video}
            index={Math.abs(videoIndex - currentIndex)}
            transform={`translateX(-${(currentIndex - Math.floor(show / 2)) * 100}%)`}
        />
    );

    const addVideoNext = () => {
        setVideoIndex(currentIndex + 1);
    }

    const addVideoPrev = () => {
        setVideoIndex(currentIndex - 1);
    }

    return (
        <Stack
            direction="row"
            sx={{
                position: "relative",
                display: "flex",
                overflowX: "hidden",
                maxHeight: "25%",
                pb: 1,
            }}
        >
            {
                props.video.map((transition, index) => {
                    const videoPath = transition != null ? transition['video_path'] : null
                    const videoSegment = getVideoSegment(videoPath, index, null);
                    return (
                        <Box sx={{ width: "20%", flexShrink: 0 }}>
                            <Collapse key={videoPath + index.toString()} in={true} direction="left">
                                {videoSegment}
                            </Collapse>
                        </Box>
                    );
                })
            }

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