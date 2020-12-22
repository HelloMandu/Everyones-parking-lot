import React from 'react';
/* Library */

import { useSelector } from 'react-redux';
/* Redux */

import Dialog from '../../components/assets/Dialog';
/* Components */

const DialogContainer =  () => {
    const state = useSelector(state => state.dialog);
    const { title, text, handleClick, open, confirm, handleBackDrop } = state;
    return <Dialog confirm={confirm} title={title} text={text} handleClick={handleClick} open={open} handleBackDrop={handleBackDrop} />;
};

export default DialogContainer;
