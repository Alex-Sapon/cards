import * as React from 'react';
import {AlertBar} from "../login/AlertBar";
import styles from './PackName.module.css';
import {TablePack} from "./TablePack";

export const PackName = () => {
	return (
		<div className={styles.container}>
			 <TablePack/>
			{false && <AlertBar message={'Massage'}/>}
		</div>
	)
}