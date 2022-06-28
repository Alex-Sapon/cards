import React, {ChangeEvent, useState} from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

import {Avatar} from '@mui/material';
import TextField from '@mui/material/TextField';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import {AccountCircle} from '@mui/icons-material';
import Stack from '@mui/material/Stack';

import Button from '../../common/button/Button';
import userPhoto from '../../assets/images/avatar.jpg';
import {AppStateType, useAppDispatch} from '../../components/app/store';
import {logoutTC, updateProfileTC} from './profileReducer';
import {useStyles} from './styles';
import {PATH} from '../../enums/path';


export const Profile = () => {
	const styles = useStyles()
	const dispatch = useAppDispatch()

	const status = useSelector<AppStateType, boolean>(state => state.profile.status)
	const name = useSelector<AppStateType, string>(state => state.login.name)
	const email = useSelector<AppStateType, string>(state => state.login.email)
	const publicCardPacksCount = useSelector<AppStateType, number>(state => state.login.publicCardPacksCount)
	const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)

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

	const updateName = () => {
		dispatch(updateProfileTC(title))
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
								<Avatar	alt="Remy Sharp"
									src={userPhoto}
									sx={{width: 96, height: 96}}
								/>
								<Button onClick={logoutHandler}>Log out</Button>
							</div>
							<div className={styles.name}>
								{isEditMode
									? <TextField
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
};
