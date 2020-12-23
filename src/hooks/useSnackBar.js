import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { closeSnackBar, openSnackBar } from '../store/snackbar';

const variantReducer = (variant) => {
    switch(variant){
        case 'success':
            return variant;
        case 'error':
            return variant;
        case 'warning':
            return variant;
        case 'info':
            return variant;
        default:
            return 'default';
    }
}

const useSnackBar = () => {
    const lastCloseAnimate = useRef(null);
    const dispatch = useDispatch();
    const handleClose = useCallback(() => {
        dispatch(closeSnackBar());
        clearTimeout(lastCloseAnimate.current);
    }, [dispatch]);
    
    const handleOpen = useCallback((message, variant) => {
        setTimeout(() => dispatch(openSnackBar({ message, variant: variantReducer(variant) })), 200);
        if (lastCloseAnimate.current) {
            clearTimeout(lastCloseAnimate.current);
        }
        lastCloseAnimate.current = setTimeout(handleClose, 2000);
    }, [dispatch, handleClose]);

    return [handleOpen, handleClose];
};

export default useSnackBar;
