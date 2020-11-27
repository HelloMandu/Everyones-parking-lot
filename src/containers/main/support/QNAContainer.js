import React, { useState } from 'react';
import { ButtonBase } from '@material-ui/core';
import classnames from 'classnames/bind';
/* Library */

import styles from './QNAContainer.module.scss';
import Notice from '../../../static/asset/svg/Notice';
import { Link } from 'react-router-dom';
/* StyleSheets */

import { Paths } from '../../../paths';
/* Paths */

const cn = classnames.bind(styles);

const Header = () => {
    return (
        <div className={styles['header-container']}>
            <Link to={Paths.main.support.qna_write}>
                <ButtonBase className={styles['write-button']}>문의 작성</ButtonBase>
            </Link>
        </div>
    );
};

const QNAItems = ({ QNAList }) => {


    return (
        <ul className={styles['container']}>
            {QNAList.map(({ qna_id, qna_date, qna_title, qna_name, qna_cnt, qna_status }) => (
                <Link to={Paths.main.support.qna_detail + `?id=${qna_id}`} key={qna_id}>
                    <ButtonBase
                        component={"li"}
                        className={styles['item-area']}
                    >
                        <div className={styles['date']}>{qna_date}</div>
                        <div className={styles['title']}>{qna_title}</div>
                        <div className={styles['bottom']}>
                            <div className={styles['name']}>{qna_name}</div>
                            <div className={styles['count']}>{qna_cnt}</div>
                        </div>
                        <div className={cn('button', { status: qna_status })}>
                            {qna_status ? "답변완료" : "답변대기"}
                        </div>
                    </ButtonBase>
                </Link>
            ))}
        </ul>
    );
};

const QNAContainer = () => {

    const [QNAList, setQNSList] = useState([
        {
            qna_id: 1,
            qna_date: '2020/05/22',
<<<<<<< HEAD
            qna_title: 'TEST 공지사항',
            qna_name: '스페이스',
            qna_cnt: '조회수 123',
=======
            qna_title: '도와 주도와 요세요!',
            qna_name: '스페이스',
            qna_cnt: '조회수 123',
            qna_status: false,
>>>>>>> mandu
        },
        {
            qna_id: 2,
            qna_date: '2020/05/22',
<<<<<<< HEAD
            qna_title: 'TEST 공지사항',
            qna_name: '스페이스',
            qna_cnt: '조회수 123',
=======
            qna_title: '도와 주도와 요세요!',
            qna_name: '스페이스',
            qna_cnt: '조회수 123',
            qna_status: true,

>>>>>>> mandu
        },
        {
            qna_id: 3,
            qna_date: '2020/05/22',
<<<<<<< HEAD
            qna_title: 'TEST 공지사항',
            qna_name: '스페이스',
            qna_cnt: '조회수 123',
=======
            qna_title: '도와 주도와 요세요!',
            qna_name: '스페이스',
            qna_cnt: '조회수 123',
            qna_status: true,
>>>>>>> mandu
        },
    ]);

    if (QNAList.length !== 0) {
        return (
            <>
                <Header />
                <QNAItems QNAList={QNAList} />
            </>
        )
    }
    return (
        <>
            <Header />
            <div className={styles['non-qna']}>
                <div className={styles['non-container']}>
                    <Notice />
                    <div className={styles['explain']}>등록된 1:1 문의가 없습니다.</div>
                </div>
            </div>
        </>
    );
};

export default QNAContainer;