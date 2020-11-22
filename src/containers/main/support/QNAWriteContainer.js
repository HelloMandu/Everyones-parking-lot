import React from 'react';
/* Library */
import { useLocation} from 'react-router-dom';

const QNAWriteContainer = ({qna_id}) => {
    const location = useLocation();
    return (
        <div>
            1:1 문의 쓰기
        </div>
    );
};

export default QNAWriteContainer;