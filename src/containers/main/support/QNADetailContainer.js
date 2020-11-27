import React from 'react';
<<<<<<< HEAD
=======
import qs from 'qs';
import classnames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
>>>>>>> mandu
/* Library */

import styles from './QNADetailContainer.module.scss';
/* StyleSheets */

const cn = classnames.bind(styles);

const QNADetailContainer = () => {
<<<<<<< HEAD
=======

    const location = useLocation();
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const qna_id = parseInt(query.id);

>>>>>>> mandu
    return (
        <div className={styles['container']}>
            <div className={styles['header-area']}>
                <div className={styles['header-wrap']}>
                    <div className={styles['top']}>
                        <div className={styles['date']}>2020/05/22</div>
                        <div className={cn('button', { status: true })}>
                            {/* {qna_status ? "답변완료" : "답변대기"} */}
                            답변완료
                        </div>
                    </div>
                    <div className={styles['title']}>문의드립니다 도와주세요!</div>
                    <div className={styles['bottom']}>
                        <div className={styles['name']}>스페이스</div>
                        <div className={styles['count']}>조회수 123</div>
                    </div>
                </div>
            </div>
            <div className={styles['question-area']}>
                {qna_id}<p />
                TEST 이벤트 제목입니이벤트 제목입니다.
                TEST 이벤트 제목입니 TEST 이벤트 제목ST 이벤트
            </div>
            <div className={styles['answer-area']}>
                안녕하세요. 홍길동님<p />
                에스 스테이션 고객센터입니다.<p />
                주차 공간을 잘못 등록 하셨을 경우 주차공간 관리에서 삭제해
                주시면 되겠습니다.<p />
                <p />
                감사합니다.

            </div>
        </div>
    );
};

export default QNADetailContainer;