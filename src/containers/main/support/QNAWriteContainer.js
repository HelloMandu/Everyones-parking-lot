import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ButtonBase, IconButton } from '@material-ui/core';
/* Library */

import FixedButton from '../../../components/button/FixedButton';
import InputBox from '../../../components/inputbox/InputBox';
/* Components */

import useInput from '../../../hooks/useInput';
/* Hooks */

import Delete from '../../../static/asset/svg/parking/Delete';
/* Static */

import styles from './QNAWriteContainer.module.scss';
import Plus from './Plus';
/* StyleSheets */

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
                <div className={styles['file-item']}>
                    <img
                        className={styles['file-image']}
                        src={imgFile}
                        alt="file"
                    />
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

const FilesPicture = () => {

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
    // useEffect(() => {
    //     setCheck(fileList.length >= 2);
    // }, [setCheck, fileList]);

    return (
        <ul className={styles['file-list']}>
            <ButtonBase className={styles['button']}>
                <label htmlFor="file-setter">
                    <Plus />
                </label>
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
};

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
                        <FilesPicture />
                    </div>
                </div>
            </div>
            <FixedButton button_name="문의하기" disable={false} onClick={onClickButton} />

        </>
    );
};

export default QNAWriteContainer;