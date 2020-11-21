import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

//styles

// import cn from 'classnames/bind';
//components
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Header from '../header/Header';
import AddressItem from '../../components/address/AddressItem';

import Slide from '@material-ui/core/Slide';
import styles from './AddressModal.module.scss';


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        textAlign: 'center',
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        borderBottom: 'solid 1px #aaa',
        fontSize: 10,
    },
    title: {
        textAlign: 'center',
        width: '100%',
        fontSize: 16,
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        minHeight: '100vh',
        zIndex: 3000,
        padding: 0,
        paddingTop: 70,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 60,
        flex: '0 0 auto',
    },
    close: {
        position: 'absolute',
        width: '40px',
        height: '40px',
        left: 14,
        zIndex: 2100,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BookmarkModal = (props) => {
    const classes = useStyles();
    return (
        <Dialog
            fullScreen
            open={props.open}
            onClose={props.handleClose}
            TransitionComponent={Transition}
            className={classes.dialog}
        >
            <Header title={'즐겨찾는 주차장'} />
            <DialogContent className={classes.content}>
                <div className={styles['container']}>
                    <div className={styles['item-list']}>
                        <AddressItem />
                        <AddressItem />
                        <AddressItem />
                        <AddressItem />
                        <AddressItem />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookmarkModal;
