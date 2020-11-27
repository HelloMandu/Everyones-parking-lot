import React, { useState } from 'react';
import { ButtonBase } from '@material-ui/core';
import classnames from 'classnames/bind';
/* Library */

import styles from './FAQContainer.module.scss';
import Notice from '../../../static/asset/svg/Notice';
/* StyleSheets */

const cn = classnames.bind(styles);

const Category = ({ type, setType }) => {

    return (
        <div className={styles['category-container']}>
            <ButtonBase className={cn('category', { click: type === 0 })} onClick={() => setType(0)}>회원가입</ButtonBase>
            <ButtonBase className={cn('category', { click: type === 1 })} onClick={() => setType(1)}>쿠폰</ButtonBase>
            <ButtonBase className={cn('category', { click: type === 2 })} onClick={() => setType(2)}>결제</ButtonBase>
            <ButtonBase className={cn('category', { click: type === 3 })} onClick={() => setType(3)}>포인트</ButtonBase>
            <ButtonBase className={cn('category', { click: type === 4 })} onClick={() => setType(4)}>주차공간</ButtonBase>
            <ButtonBase className={cn('category', { click: type === 5 })} onClick={() => setType(5)}>대여연장</ButtonBase>
        </div>
    );
};

const FAQContainer = () => {

    const [FAQList, setFAQList] = useState([
        {
            faq_id: 1,
            faq_title: '회원가입은 어떻게 하죠?',
            faq_name: '스페이스',
            faq_cnt: '조회수 123',
            faq_text: "TEST 이벤트 제목입니이벤트 제목입니다.TEST 이벤트 제목입TEST 이벤트 제목입니다.TEST 이벤트 제목ST 이벤트 제목입니다.TEST 이벤트 제목입니다. TEST 이벤트 제목입",
        },
        {
            faq_id: 2,
            faq_title: '회원가입은 어떻게 하죠?',
            faq_name: '스페이스',
            faq_cnt: '조회수 123',
            faq_text: "TEST 이벤트 제목입니이벤트 제목입니다.TEST 이벤트 제목입TEST 이벤트 제목입니다.TEST 이벤트 제목ST 이벤트 제목입니다.TEST 이벤트 제목입니다. TEST 이벤트 제목입",
        },
        {
            faq_id: 3,
            faq_title: '회원가입은 어떻게 하죠?',
            faq_name: '스페이스',
            faq_cnt: '조회수 123',
            faq_text: "TEST 이벤트 제목입니이벤트 제목입니다.TEST 이벤트 제목입TEST 이벤트 제목입니다.TEST 이벤트 제목ST 이벤트 제목입니다.TEST 이벤트 제목입니다. TEST 이벤트 제목입",
        },
        {
            faq_id: 4,
            faq_title: '회원가입은 어떻게 하죠?',
            faq_name: '스페이스',
            faq_cnt: '조회수 123',
            faq_text: "TEST 이벤트 제목입니이벤트 제목입니다.TEST 이벤트 제목입TEST 이벤트 제목입니다.TEST 이벤트 제목ST 이벤트 제목입니다.TEST 이벤트 제목입니다. TEST 이벤트 제목입",
        },
        {
            faq_id: 5,
            faq_title: '회원가입은 어떻게 하죠?',
            faq_name: '스페이스',
            faq_cnt: '조회수 123',
            faq_text: "TEST 이벤트 제목입니이벤트 제목입니다.TEST 이벤트 제목입TEST 이벤트 제목입니다.TEST 이벤트 제목ST 이벤트 제목입니다.TEST 이벤트 제목입니다. TEST 이벤트 제목입",
        },
    ]);

    const [type, setType] = useState(0);

    if (FAQList.length !== 0) {
        return (
            <>
                <Category type={type} setType={setType} />
                <div className={styles['container']}>
                </div>
            </>
        )
    }
    return (
        <>
            <Category type={type} setType={setType} />
            <div className={styles['non-faq']}>
                <div className={styles['non-container']}>
                    <Notice />
                    <div className={styles['explain']}>등록된 자주 묻는 질문이 없습니다.</div>
                </div>
            </div>
        </>
    );
};

export default FAQContainer;