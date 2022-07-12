import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {IconButton} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import {BasicModal} from '../BasicModal';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {setCloseModalAC} from '../reducer/modalReducer';

//styles
const headerModalStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    borderBlockEnd: '1px solid rgba(128, 128, 128, .5)',

}
const buttonsModalStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
    borderRadius: '15px'
}
const buttonStyle = {
    borderRadius: '15px',
}


export const DeletePackModal = () => {

    const dispatch = useAppDispatch()

    const packName = useAppSelector(state => state.tablePacks.packName)

    const handleClose = () => dispatch(setCloseModalAC(false))

    return (
        <div>
            <BasicModal>
                <Box sx={headerModalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete Card
                    </Typography>
                    <IconButton size='small' onClick={handleClose}>
                        <CancelIcon sx={{color: 'black'}}/>
                    </IconButton>
                </Box>
                <Typography id="modal-modal-description" sx={{ mt: 12 }}>
                    Do you really want to remove ... card?
                </Typography>
                <Box sx={buttonsModalStyle}>
                    <Button variant='contained' sx={buttonStyle} onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' sx={buttonStyle}>Delete</Button>
                </Box>
            </BasicModal>
        </div>
    );
}