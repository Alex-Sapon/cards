import React, {ChangeEvent, useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';

import {Avatar} from '@mui/material';
import TextField from '@mui/material/TextField';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import {AccountCircle} from '@mui/icons-material';
import Stack from '@mui/material/Stack';

import Button from '../../common/button/Button';
import iconPhoto from '../../assets/images/cam-icon-png-2.jpg';
import userPhoto from '../../assets/images/avatar.jpg';
import {useAppDispatch, useAppSelector} from '../../components/app/store';
import {logoutTC, updateProfileTC} from './profileReducer';
import {SmallAvatar, useStyles} from './styles';
import {PATH} from '../../enums/path';
import Badge from "@mui/material/Badge";


export const Profile = () => {
	const styles = useStyles()
	const dispatch = useAppDispatch()

	const status = useAppSelector(state => state.profile.status)
	const avatar = useAppSelector(state => state.login.avatar)
	const name = useAppSelector(state => state.login.name)
	const email = useAppSelector(state => state.login.email)
	const publicCardPacksCount = useAppSelector(state => state.login.publicCardPacksCount)
	const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)


	let [isEditMode, setEditMode] = useState<boolean>(false)
	let [title, setTitle] = useState<string>(name);

	const activateEditMode = () => {
		setEditMode(true);
		setTitle(title)
	}

	const activateViewMode = () => {
		setEditMode(false);
	}

	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			activateViewMode()
		}
	}

	const updateName = () => {
		dispatch(updateProfileTC(title, avatar || userPhoto))
		setEditMode(false)
	}

	const logoutHandler = () => {
		dispatch(logoutTC())
	};

		if (!isLoggedIn) {
		return <Navigate to={PATH.LOGIN}/>
	}

	return (
		<div>
			{status
				? (<div><Stack className={styles.profilePreloader} spacing={2} direction="row">
					<CircularProgress color="secondary"/>
				</Stack></div>)
				: (<div className={styles.profileContainer}>
						<div className={styles.profileWrapper}>
							<div className={styles.profileItems}>
								<Stack direction="row" spacing={2}>
									<Badge
										overlap="circular"
										anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
										badgeContent={
											<SmallAvatar alt="Remy Sharp" src={iconPhoto}/>}>
										<Avatar alt="Travis Howard" src={avatar || userPhoto} sx={{width: 96, height: 96}}/>
									</Badge>
								</Stack>
								<Button onClick={logoutHandler}>Log out</Button>
							</div>
							<div className={styles.name}>
								{isEditMode
									? <TextField
										onKeyPress={onKeyPressHandler}
										onChange={changeTitle}
										value={title}
										label="Nickname"
										variant="standard"
										autoFocus
										onBlur={activateViewMode}
										InputProps={{
											startAdornment: (
												<AccountCircle/>),
											endAdornment: (
												<ClearIcon/>)
										}}/>
									: <>Nickname:
										<span className={styles.title}>{title}</span>
										{!!activateViewMode && <ModeEditIcon onClick={activateEditMode} fontSize={"small"}/>}
									</>}
							</div>
							<div>
								<div className={styles.profileTitle}>Email: {email}</div>
								<div className={styles.profileTitle}>Количество создоваемых колод: {publicCardPacksCount}</div>
							</div>
							<Button onClick={updateName} className={styles.button}>Save</Button>
						</div>
					</div>
				)
			}
		</div>
	)
}


/*
 onKeyPress={onKeyPressHandler}
const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
	setError(null);
	if (e.charCode === 13) {
		addTask();
	}
}*/

/*
onKeyPress={(e) => {
	console.log(`Pressed keyCode ${e.key}`);
	if (e.key === 'Enter') {
		// Do code here
		e.preventDefault();
	}
}}*/
