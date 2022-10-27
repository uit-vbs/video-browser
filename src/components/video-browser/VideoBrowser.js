import { Button, Card, CardMedia, Grid, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import { useState } from 'react';
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