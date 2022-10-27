import { Button, Card, CardMedia, Grid, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import { Container } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
        },
        "& .MuiOutlinedInput-root:hover": {
            backgroundColor: "#fafafa",
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
                backgroundColor: "white"
            }
        },
        "& .MuiOutlinedInput-root.Mui-focused": {
            backgroundColor: "#f0f0f0"
        }
    }
}));

const SideBar = (props) => {

    const classes = useStyles();

    const [query, setQuery] = useState("");
    const [timer, setTimer] = useState(300);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer <= 0) return;
            setTimer(timer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const formatTimer = (timer) => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return [minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .join(":");
    }

    return (
        <Box sx={{ p: 2, boxShadow: 24, zIndex: 1000, position: "relative" }} height="100%" spacing={1} overflow="auto" bgcolor="info.main">
            <Typography sx={{ pt: 4, pb: 4 }} variant="h3" textAlign="center" fontFamily="Lilita One">
                UIT - VBS
            </Typography>

            <TextField
                // label="Textual query"
                placeholder="Type something..."
                variant="outlined"
                className={classes.root}
                value={query}
                // InputProps={{ color: "primary" }}
                onChange={e => setQuery(e.target.value)}
                rows={4}
                multiline
                fullWidth
            />

            <Grid container spacing={1} sx={{ pt: 1, pb: 1 }}>
                <Grid item lg={8} xs={12}>
                    <Button color="secondary" variant="contained" fullWidth
                        onClick={(e) => {
                            setQuery("");
                            props.handleReset();
                        }}
                    >
                        <b>RESET ALL</b>
                    </Button>
                </Grid>
                <Grid item lg={4} xs={12}>
                    <Button color="success" variant="contained" endIcon={<SendIcon />} fullWidth
                        onClick={(e) => props.handleQuery(query)}
                    >
                        Query
                    </Button>
                </Grid>
            </Grid>

            <Typography sx={{ pt: 3 }}>
                Find the video below:
            </Typography>
            <Card sx={{ maxWidth: 360 }}>
                <CardMedia
                    component="video"
                    src="bp/sample_video.mp4"
                    controls
                >
                </CardMedia>
            </Card>
            <Typography sx={{ pt: 2 }} variant="h4" textAlign="center">
                {formatTimer(timer)}
            </Typography>

        </Box>
    );
}

export default SideBar;