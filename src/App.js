import { createTheme, CssBaseline, Grid, ThemeProvider } from '@mui/material';
import { blue, grey, pink } from "@mui/material/colors";
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllFeedbacks } from 'redux/slices/relevantFeedbackSlice';
import SideBar from 'components/SideBar';
import VideoBrowser from 'components/video-browser/VideoBrowser';

const theme = createTheme({
	palette: {
		background: { default: "#f1f2f6" },
		primary: { main: "#000000" },
		secondary: { main: "#ff4757" },
		info: { main: "#70a1ff" },
		success: { main: "#7bed9f" },
	},
	typography: {
		allVariants: {
			color: "white",
		},
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
		].join(','),
	},
});

const SERVER_BACKEND = "http://192.168.20.156:5004";

function App() {

	const [sessionId, setSessionId] = useState(null);

	const MAX_VIDEOS = 5;
	const MAX_TRANSITIONS = 9;
	const [videos, setVideos] = useState(new Array(MAX_VIDEOS).fill(0).map(() => new Array(MAX_TRANSITIONS).fill({})));

	const dispatch = useDispatch();
	const relevantFeedbacks = useSelector(state => state.relevantFeedbacks);

	const setVideoTransition = (transitionNew, i, j) => {
		setVideos(videos => videos.map((video, videoId) => {
			if (videoId != i) return video;
			return video.map((transition, transitionId) => {
				if (transitionId != j) return transition;
				return transitionNew;
			})
		}));
	}

	const handleQuery = query => {
		const url = SERVER_BACKEND + "/query";
		const payload = {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				session_id: sessionId,
				query: query,
				feedbacks: {
					positives: Object.values(relevantFeedbacks.positives),
					negatives: Object.values(relevantFeedbacks.negatives),
				},
				pagination: {
					limit: MAX_VIDEOS,
					page: 1
				},
			})
		}
		fetch(url, payload)
			.then(response => response.json())
			.then(response => {
				const session_id = response['session_id'];
				if (sessionId!=null && sessionId!=session_id) {
					console.warn(`Non-consistent session id: old_id="${sessionId}", new_id="${session_id}"`);
					return;
				}
				setSessionId(session_id);
				response['results'].forEach((result, videoIndex) => result == null ? null : getVideoContext(
					result['channel_id'],
					result['video_id'],
					result['transition_id'],
					(transition, transitionIndex) => setVideoTransition(transition, videoIndex, transitionIndex)
				));
			})
			.then(() => dispatch(clearAllFeedbacks()))
			.catch((error) => {
				console.error('Error:', error);
			});
	}

	const handleReset = () => {
		setSessionId(null);
	}

	const getVideoContext = (channel_id, video_id, transition_id, listener) => {
		const url = SERVER_BACKEND + "/browse";
		const payload = {
			method: "POST",
			body: JSON.stringify({
				channel_id: channel_id,
				video_id: video_id,
				transition_id: transition_id,
				window: MAX_TRANSITIONS,
			})
		}
		fetch(url, payload)
			.then(response => response.json())
			.then(response => response['results'])
			.then(transitions => transitions.forEach(
				(transition, transitionIndex) => listener.call(this, transition, transitionIndex)
			))
			.catch((error) => {
				console.error('Error while browsing transitions:', error);
			});
	}

	useEffect(() => {
		handleQuery(null);
	}, [sessionId])

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Grid container height="100%">
				<Grid item xs={12} sm={4} md={3}>
					<SideBar handleQuery={handleQuery} handleReset={handleReset} />
				</Grid>
				<Grid item xs={12} sm={8} md={9}>
					<VideoBrowser videos={videos} />
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}

export default App;
