import { IconButton, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
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

const SERVER_BACKEND = "http://192.168.20.156:5004";
const MAX_TRANSITIONS = 7;

const VideoInstance = (props) => {

    const classes = useStyles();

    const show = 5;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transitionList, setTransitionList] = useState([]);

    const getTransitionContext = ({handleVideoIndex=null, direction="both", window=MAX_TRANSITIONS}) => {
		const url = SERVER_BACKEND + "/browse";
        let transition = null;
        switch (direction) {
            case "next":
                transition = transitionList[transitionList.length - 1];
                break;
            case "prev":
                transition = transitionList[0];
                break;
            case "both":
            default:
                transition = props?.video;
        }
		const payload = {
			method: "POST",
			body: JSON.stringify({
				channel_id: transition?.channel_id,
				video_id: transition?.video_id,
				transition_id: transition?.transition_id,
                direction: direction,
				window: window,
			})
		}
		fetch(url, payload)
			.then(response => response.json())
			.then(response => response['results'])
			.then(transitions => {
                switch (direction) {
                    case "next":
                        setTransitionList([...transitionList, ...transitions]);
                        break;
                    case "prev":
                        setTransitionList([...transitions, ...transitionList]);
                        break;
                    case "both":
                    default:
                        setTransitionList(transitions);
                }
                if (handleVideoIndex!=null) handleVideoIndex.call(this, transitions);
            })
			.catch((error) => {
				console.error('Error while browsing transitions:', error);
			});
	}

    useEffect(() => {
        getTransitionContext({
            direction: "both",
            handleVideoIndex: (transitions) => setCurrentIndex(Math.floor(transitions.length / 2)),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.video]);

    const addVideoNext = () => {
        getTransitionContext({
            direction: "next",
            window: 1,
            handleVideoIndex: (transitions) => setCurrentIndex(currentIndex + 1),
        });
    }

    const addVideoPrev = () => {
        getTransitionContext({
            direction: "prev",
            window: 1,
            handleVideoIndex: (transitions) => {},
        });
    }

    return (
        <Stack
            direction="row"
            sx={{
                position: "relative",
                display: "flex",
                overflowX: "hidden",
                height: "20%",
                boxSizing: "border-box",
                pt: 0.5,
                pb: 0.5,
            }}
        >
            {
                transitionList.map((transition, index) => {
                    const segmentId = props.key + "_" + transition?.channel_id + "_" + transition?.video_id + "_" + transition?.transition_id;
                    return (
                        <VideoSegment
                            key={segmentId}
                            transition={transition}
                            index={Math.abs(index - currentIndex)}
                            transform={`translateX(${(Math.floor(show / 2) - currentIndex) * 100}%)`}
                        />
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