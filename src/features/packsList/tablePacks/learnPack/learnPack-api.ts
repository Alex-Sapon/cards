import {instance} from '../../../../api/instance-api';
import {AxiosResponse} from 'axios';

export const learnPackAPI = {
    updateGrade(data: UpdateGradeType) {
        return instance.put<UpdateGradeResponseType, AxiosResponse<UpdateGradeResponseType>, UpdateGradeType>('cards/grade', data);
    }
}

type UpdateGradeType = {
    grade: 1 | 2 | 3 | 4 | 5
    card_id: string
}

type UpdateGradeResponseType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
}