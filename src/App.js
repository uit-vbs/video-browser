import { createTheme, CssBaseline, Grid, ThemeProvider } from '@mui/material';
import { blue, grey, pink } from "@mui/material/colors";
import { Container } from '@mui/system';
import SideBar from './components/SideBar';
import VideoBrowser from './components/video-browser/VideoBrowser';

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

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Grid container height="100%">
				<Grid item xs={12} sm={4} md={3}>
					<SideBar />
				</Grid>
				<Grid item xs={12} sm={8} md={9}>
					<VideoBrowser />
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}

export default App;
