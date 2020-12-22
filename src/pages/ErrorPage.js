import React from 'react';
import { useHistory } from 'react-router-dom';
/* Library */

import Header from '../components/header/Header';
import FixedButton from '../components/button/FixedButton';
/* Components */

import Error from '../static/asset/svg/Error';
/* Static */

import styles from './ErrorPage.module.scss';
/* StyleSheets */


const ErrorPage = () => {

    const history = useHistory();

    return (
        <>
            <Header title={"오류 안내"} />
            <div className={styles['container']}>
                <div className={styles['error-area']}>
                    <div className={styles['img-wrap']}>
                        <Error />
                    </div>
                    <div className={styles['code-wrap']}>
                        <span>에러코드(404)</span>
                    </div>
                    <div className={styles['text-wrap']}>
                        <span>페이지를 찾을 수 없습니다.</span>
                    </div>
                </div>
            </div>
            <FixedButton button_name="이젠페이지" disable={false} onClick={() => history.goBack()} />
        </>
    );
}

export default ErrorPage;