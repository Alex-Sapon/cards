import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
	profileContainer: {
		width: '650px',
		maxHeight: '500px',
		background: '#F9F9FE',
		margin: '20px auto 0',
		padding: '20px 20px 20px 20px',
		borderRadius: ' 8px',
	},
	profileWrapper: {
		display: 'flex',
		flexDirection: 'column',
		padding: '20px 20px 0px 20px',
		background: '#D9D9F1',
		borderRadius: '8px',
	},
	profileItems: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	button: {
		margin: '20px',
		width: '127px',
		height: '36px',
	},
	profileTitle: {
		padding: '20px',
	},
	name: {
		padding: '20px',
		height: '60px'
	},
	title: {
		margin: '0.25em'
	},
	profilePreloader: {
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		position: 'absolute',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}

}))