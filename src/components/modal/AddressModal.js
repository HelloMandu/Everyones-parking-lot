import React from 'react';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import Slide from '@material-ui/core/Slide';
import styles from './AddressModal.module.scss';
import { Backdrop } from '@material-ui/core';

// import FixedButton from '../button/FixedButton';


const useStyles = makeStyles((theme) => ({
 
    appBar: {
        position: 'relative',
        textAlign: 'center',
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        borderBottom: 'solid 1px #aaa',
        fontSize: 10
    },
    title: {
        textAlign: 'center',
        width: '100%',
        fontSize: 16
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content:{
        zIndex:3000,
        padding: 0,
        paddingLeft :24,
        paddingRight:24,
        paddingBottom:60,
        flex: "0 0 auto"
    },
    close: {
        position: 'absolute',
        width: '40px', height: '40px',
        left: 14, zIndex: 2100,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddressModal = (props) => {

    const classes = useStyles();
    const history=  useHistory();

    return (

        <Dialog
            fullScreen
            open={props.open}
            onClose={props.handleClose}
            TransitionComponent={Transition}
            className={classes.dialog}
        >
             <DialogContent className={classes.content}>
            <div className={styles['container']} onClick={()=>history.goBack()}>
                  hello
            </div>  
            </DialogContent>
        </Dialog>
    );
};

export default AddressModal;
