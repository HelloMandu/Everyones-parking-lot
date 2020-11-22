import React from 'react';
/* Library */
import { useLocation} from 'react-router-dom';

const NoticeDetailContainer = ({ viewId }) => {
    const location = useLocation();
    return (
        <div>
            공지사항 상세보기
        </div>
    );
};

export default NoticeDetailContainer;