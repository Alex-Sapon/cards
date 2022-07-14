import {memo} from 'react';
import {AppStateType, useAppDispatch, useAppSelector} from '../../../../app/store';
import {StyledTableCell, StyledTableRow} from './styledTablePack';
import {shortWord} from '../utils/shortWord';
import {PATH} from '../../../../enums/path';
import {useNavigate} from 'react-router-dom';
import Button from '../../../../common/button/Button';
import {RequestStatusType} from '../../../../app/reducer/app-reducer';
import styles from './TableRowPack.module.css';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import IconButton from '@mui/material/IconButton';
import {setUserCardId, setUserCardName} from '../../../packName/reducer/packCardReducer';
import {setNameModalAC, setOpenModalAC} from '../../../../components/Modals/reducer/modalReducer';
import {handleOpenModal} from '../../../../components/Modals/utilsModal';
import {setPackId, setPackName, setSearchPackName} from '../tablePacksReducer';


type TableRowPackType = {
    _id: string
    name: string
    cardsCount: number
    updated: string
    user_name: string
    user_id: string
    status: RequestStatusType
}

const selectLoginUserId = (state: AppStateType): string => state.login._id;

export const TableRowPack = memo((props: TableRowPackType) => {
    const {_id, name, cardsCount, updated, user_id, user_name, status} = props;


    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const userId = useAppSelector(selectLoginUserId);

   // const handleDeletePack = () => dispatch(deleteUpdateCardsPack(_id));
    const handleDeletePack = () => {
        handleOpenModal(dispatch, 'deletePack')
        dispatch(setPackName(name))
        dispatch(setPackId(_id))
    }
    // const handleUpdatePack = () => dispatch(deleteUpdateCardsPack(_id, 'Update my new PACK'));
    const handleUpdatePack = () => {
        dispatch(setOpenModalAC(true))
        dispatch(setNameModalAC('editPack'))
    };
    const handleSendPackId = () => {
        dispatch(setUserCardId(_id));
        dispatch(setUserCardName(name));
        navigate(PATH.CARDS)
    };


    return (
            <StyledTableRow sx={{display: 'grid', gridTemplateColumns: '25% 8% 24% 15% 28%'}}>
            <StyledTableCell component="th" scope="row" className={styles.sell}>
                <span style={{display: 'inline-block', flex: '1 1 auto'}}>{shortWord(name, 15)}</span>
                <IconButton
                    disabled={status === 'loading'}
                    aria-label="expand row"
                    size="small"
                    onClick={handleSendPackId}
                >
                    <DriveFolderUploadIcon/>
                </IconButton>
            </StyledTableCell>
            <StyledTableCell className={styles.sell}>{cardsCount}</StyledTableCell>
            <StyledTableCell className={styles.sell}>
                {new Date(updated).toLocaleDateString()}
            </StyledTableCell>
            <StyledTableCell className={styles.sell}>
                {shortWord(user_name, 8)}
            </StyledTableCell>
            <StyledTableCell align="center" className={styles.table_button_group}>
                {userId === user_id
                    ? <>
                        <Button id="btn_delete" disabled={status === 'loading'} onClick={handleDeletePack}>
                            Delete
                        </Button>
                        <Button disabled={status === 'loading'} onClick={handleUpdatePack}>
                            Edit
                        </Button>
                    </> : null}
                <Button disabled={status === 'loading'}>Learn</Button>
            </StyledTableCell>
        </StyledTableRow>
    );
});