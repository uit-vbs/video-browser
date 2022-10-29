import { Stack } from '@mui/material';
import VideoInstance from './VideoInstance';

const VideoBrowser = (props) => {

    return (
        <Stack height="100%" sx={{overflowY: "auto"}}>
            {
                props.videos.map((video, index) => <VideoInstance video={video} index={index}/>)
            }
        </Stack>
    );
}

export default VideoBrowser;