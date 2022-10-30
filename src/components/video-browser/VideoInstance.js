import { Collapse, IconButton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import VideoSegment from './VideoSegment';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { makeStyles } from '@mui/styles';

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

    const getVideoSegment = (transition, videoIndex, array) => {
        return (
            <VideoSegment
                transition={transition}
                index={Math.abs(videoIndex - currentIndex)}
                transform={`translateX(${(Math.floor(show / 2) - currentIndex) * 100}%)`}
            />
        );
    }

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
                    const videoSegment = getVideoSegment(transition, index, null);
                    const segmentId = props.index.toString() + "_" + index.toString();
                    return (
                        <Box key={segmentId} sx={{ width: "20%", flexShrink: 0 }}>
                            <Collapse in={true} direction="left">
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