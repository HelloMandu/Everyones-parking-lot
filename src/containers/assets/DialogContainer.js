import React from 'react';
/* Library */

import { useSelector } from 'react-redux';
/* Redux */

import Dialog from '../../components/assets/Dialog';
/* Components */

export default () => {
    const state = useSelector(state => state.dialog);
    const { title, text, handleClick, open, confirm } = state;
    return <Dialog confirm={confirm} title={title} text={text} handleClick={handleClick} open={open} />;
};
