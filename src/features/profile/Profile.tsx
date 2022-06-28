import {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";

import {Avatar} from "@mui/material";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";

import Button from "../../common/button/Button";
import userPhoto from "../../assets/images/avatar.jpg"
import {AppStateType} from "../../components/app/store";
import {logoutTC, ProfileActions, ProfileStateType, updateProfileTC} from './profileReducer';
import {useStyles} from "./styles";

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStateType, unknown, ProfileActions>>();

export const Profile = () => {
	const styles = useStyles()
	const dispatch = useAppDispatch()

	let [isEditMode, setEditMode] = useState(false)
	let [title, setTitle] = useState('');

	const {name, status, email, publicCardPacksCount} = useSelector<AppStateType, ProfileStateType>(state => state.profile)

	const activateEditMode = () => {
		setEditMode(true);
		setTitle(name)
	}

	const activateViewMode = () => {
		setEditMode(false);
	}

	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const updateName = () => {
		dispatch(updateProfileTC(title))
		setEditMode(false)
	}

	const logoutHandler = () => {
		dispatch(logoutTC())
	};

	return (
		<div>
			{status === 'loading' && <LinearProgress/>}
			<div className={styles.profileContainer}>
				<div className={styles.profileWrapper}>
					<div className={styles.profileItems}>
						<Avatar
							alt="Remy Sharp"
							src={userPhoto}
							sx={{width: 96, height: 96}}
						/>
						<Button onClick={logoutHandler}>Log out</Button>
					</div>
					<div className={styles.name}>{isEditMode
							?
							<TextField
								onChange={changeTitle}
								value={title}
								label="Nickname"
								variant="standard"
								autoFocus
								onBlur={activateViewMode}/>
							: <span onDoubleClick={activateEditMode}>{name}</span>}
					</div>
					<div>
						<div className={styles.profileTitle}>Email: {email}</div>
						<div className={styles.profileTitle}>Количество создоваемых колод: {publicCardPacksCount}</div>

					</div>
					<Button onClick={updateName} className={styles.button}>Save</Button>
				</div>
			</div>
		</div>
	)
};

