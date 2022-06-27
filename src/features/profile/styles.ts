import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    profileContainer: {
        width: '650px',
        height: '420px',
        background: '#F9F9FE',
        margin: '20px auto 0',
        padding: "20px 20px 0 20px",
        borderRadius: ' 8px',
    },
    profileWrapper: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 20px 0 20px',
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
    name:{
        padding:20,
        height:50
    }
}))