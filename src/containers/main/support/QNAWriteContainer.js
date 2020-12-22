import React, { useState, useRef, useCallback, useEffect, useImperativeHandle, forwardRef } from 'react';
import { ButtonBase, IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
/* Library */

import FixedButton from '../../../components/button/FixedButton';
import InputBox from '../../../components/inputbox/InputBox';
/* Components */

import useInput from '../../../hooks/useInput';
import { useDialog } from '../../../hooks/useDialog';
/* Hooks */

import Delete from '../../../static/asset/svg/parking/Delete';
/* Static */

import styles from './QNAWriteContainer.module.scss';
/* StyleSheets */

import { requestPostWriteQNA } from '../../../api/qna';
/* API */

import { Paths } from '../../../paths';
/* Paths */

const FileItem = ({ file, onDelete }) => {
    const [imgFile, setImgFile] = useState(null);
    useEffect(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            if (base64) {
                setImgFile(base64.toString());
            }
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }, [file]);
    return (
        <>
            {imgFile && (
                <div
                    className={styles['file-item']}
                    style={{ backgroundImage: `url(${imgFile})` }}
                >
                    <IconButton
                        className={styles['file-delete']}
                        onClick={onDelete}
                    >
                        <Delete />
                    </IconButton>
                </div>
            )}
        </>
    );
};

// eslint-disable-next-line
const FilesPicture = forwardRef(({ }, ref) => {

    const [fileList, setFileList] = useState([]); //파일

    const onChangeFileList = useCallback((e) => {
        const { files } = e.target;
        const newFileList = [];
        for (let i = 0; i < files.length; i++) {
            newFileList.push({ id: i + 1, file: files[i] });
        }
        setFileList(newFileList);
    }, []);

    const handleDeleteFile = useCallback(
        (id) => setFileList(fileList.filter((file) => file.id !== id)),
        [fileList],
    );
    useImperativeHandle(ref, () => ({
        fileList,
    }));

    return (
        <ul className={styles['file-list']}>
            <ButtonBase className={styles['button']}>
                <label htmlFor="file-setter" />
            </ButtonBase>
            <input
                id="file-setter"
                className={styles['input-files']}
                onChange={onChangeFileList}
                multiple="multiple"
                type="file"
                accept="image/gif, image/jpeg, image/png, image/svg"
                formEncType="multipart/form-data"
            />
            {fileList.map(({ id, file }) => (
                <li key={id}>
                    <FileItem
                        file={file}
                        onDelete={() => handleDeleteFile(id)}
                    ></FileItem>
                </li>
            ))}
        </ul>
    );
});

const QNAWriteContainer = () => {

    const openDialog = useDialog();
    const history = useHistory();

    const subjectRef = useRef();
    const questionRef = useRef();
    const parkingPicture = useRef();
    const emailRef = useRef();

    const [email, onChangeEmail] = useInput('');
    const [subject, onChangeSubject] = useInput('');
    const [question, onChangeQuestion] = useInput('');

    const [checkAll, setCheckAll] = useState(false);

    const onClickButton = useCallback(async () => {
        // 업데이트 요청
        const JWT_TOKEN = localStorage.getItem('user_id');
        const response = await requestPostWriteQNA(JWT_TOKEN, email, subject, question, parkingPicture.current !== undefined ? parkingPicture.current.fileList : null);
        if (response.msg === 'success') {
            openDialog("1:1문의 작성 완료", "", () => history.replace(Paths.main.support.qna));
        } else {
            openDialog(response.msg, response.sub);
        }
    }, [history, openDialog, email, question, subject]);

    useEffect(() => {
        if (email !== '' && subject !== '' && question !== '') {
            setCheckAll(true);
        } else {
            setCheckAll(false);
        }
    }, [email, subject, question]);

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, [])

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['data-area']}>
                    <div className={styles['email-wrap']}>
                        <div className={styles['text']}>이메일</div>
                        <InputBox
                            className={'input-bar'}
                            type={'email'}
                            value={email}
                            placeholder={'이메일을 입력해주세요.'}
                            onChange={onChangeEmail}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') subjectRef.current.focus();
                            }}
                            reference={emailRef}
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
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    questionRef.current.focus();
                                }
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
                            ref={questionRef}
                        />
                    </div>
                    <div className={styles['files-wrap']}>
                        <div className={styles['text']}>첨부파일</div>
                        <FilesPicture ref={parkingPicture} />
                    </div>
                </div>
            </div>
            <FixedButton button_name="문의하기" disable={!checkAll} onClick={onClickButton} />

        </>
    );
};

export default QNAWriteContainer;