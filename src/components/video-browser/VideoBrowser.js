import { Button, Card, CardMedia, Grid, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import { useState } from 'react';
import VideoInstance from './VideoInstance';

const VideoBrowser = (props) => {

    return (
        <Stack height="100%" sx={{overflowY: "auto"}}>
            <VideoInstance videoId={4} />
            <VideoInstance videoId={8} />
            <VideoInstance videoId={12} />
            <VideoInstance videoId={16} />
            <VideoInstance videoId={20} />
        </Stack>
    );
}

export default VideoBrowser;