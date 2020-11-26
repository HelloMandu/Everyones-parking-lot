import React, { useRef } from 'react';
/* Library */

import FixedButton from '../../../components/button/FixedButton';
import InputBox from '../../../components/inputbox/InputBox';
/* Components */

import useInput from '../../../hooks/useInput';
/* Hooks */

import styles from './QNAWriteContainer.module.scss';
/* StyleSheets */

const QNAWriteContainer = () => {

    const subjectRef = useRef();
    const questionRef = useRef();

    const [email, onChangeEmail] = useInput('');
    const [subject, onChangeSubject] = useInput('');
    const [question, onChangeQuestion] = useInput('');

    const onClickButton = () => {
        // 업데이트 요청
        alert('문의 작성')
    }

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['data-area']}>
                    <div className={styles['email-wrap']}>
                        <div className={styles['text']}>이메일</div>
                        <InputBox
                            className={'input-bar'}
                            type={'text'}
                            value={email}
                            placeholder={'이메일을 입력해주세요.'}
                            onChange={onChangeEmail}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') subjectRef.current.focus();
                            }}
                        />
                    </div>
                    <div className={styles['subject-wrap']}>
                        <div className={styles['text']}>제목</div>
                        <InputBox
                            className={'input-bar'}
                            type={'text'}
                            value={subject}
                            placeholder={'제목을 입력해주세요.'}
                            onChange={onChangeSubject}
                            reference={subjectRef}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') questionRef.current.focus();
                            }}
                        />
                    </div>
                    <div className={styles['question-wrap']}>
                        <textarea
                            className={styles['input-question']}
                            type="text"
                            value={question}
                            placeholder={'문의 내용을 입력해주세요'}
                            onChange={onChangeQuestion}
                        />
                    </div>
                    <div className={styles['files-wrap']}>
                        <div className={styles['text']}>첨부파일</div>
                    </div>
                </div>
            </div>
            <FixedButton button_name="문의하기" disable={false} onClick={onClickButton} />

        </>
    );
};

export default QNAWriteContainer;