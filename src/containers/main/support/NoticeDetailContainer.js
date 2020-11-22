import React from 'react';
import { useLocation } from 'react-router-dom';
/* Library */

const NoticeDetailContainer = () => {
    const location = useLocation();
    return (
        <div>
            공지사항 상세보기
        </div>
    );
};

export default NoticeDetailContainer;