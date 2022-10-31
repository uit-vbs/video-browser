import { Stack } from '@mui/material';
import VideoInstance from './VideoInstance';

const VideoBrowser = (props) => {

    return (
        <Stack height="100%" sx={{overflowY: "auto"}}>
            {/* {
                props.videos.map((video, index) => <VideoInstance key={index.toString()} video={video} index={index}/>)
            } */}
            {
                props.videoList.map((video, index) => <VideoInstance key={index.toString()} video={video} />)
            }
        </Stack>
    );
}

export default VideoBrowser;