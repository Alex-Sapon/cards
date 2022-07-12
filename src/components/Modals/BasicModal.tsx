import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {ReactNode} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {setCloseModalAC, setOpenModalAC} from './reducer/modalReducer';

//styles
const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

export const BasicModal: React.FC<BasicModalPropsType> = ({children}) => {

    const dispatch = useAppDispatch()

    const isOpenModal = useAppSelector(state => state.modal.isOpenModal)

    const handleOpen = () => dispatch(setCloseModalAC(true))
    const handleClose = () => dispatch(setOpenModalAC(false))

    return (
        <div>
            <Modal
                open={isOpenModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}

//types
type BasicModalPropsType = {
    children: ReactNode,
}