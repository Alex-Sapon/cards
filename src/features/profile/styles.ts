import {makeStyles, styled} from "@mui/styles";
import {Avatar} from "@mui/material";

export const useStyles = makeStyles((theme) => ({
	profileContainer: {
		width: '400px',
		maxHeight: '800px',
		background: '#f9f9fe',
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
		minHeight: '300px',
		maxHeight: '800px'
	},
	profileLogOutButton: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	profileAvatar: {
		display: 'flex',
		justifyContent: 'center',
		paddingTop: '20px',
	},
	profileWrapperText: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: "center"
	},
	profileWrapperButtonSave: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: "center"
	},
	button: {
		margin: '20px',
		width: '127px',
		height: '36px',
	},
	profileTitle: {
		display: 'flex',
		justifyContent: 'center',
		padding: '20px',
	},
	name: {
		display: "flex",
		justifyContent: 'center',
		padding: '20px 0 0 10px',
		height: '80px'
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
export const SmallAvatar = styled(Avatar)(({ theme }) => ({
	width: 32,
	height: 32,
}));