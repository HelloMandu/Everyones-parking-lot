import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { closeSnackBar, openSnackBar } from '../store/snackbar2';

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
    const dispatch = useDispatch();
    const handleClose = useCallback(
        () => dispatch(closeSnackBar()),
        [dispatch],
    );
    const handleOpen = useCallback(
        (message, variant) => {
            dispatch(openSnackBar({message, variant: variantReducer(variant)}))
            setTimeout(handleClose, 3000);
        },
        [dispatch, handleClose],
    );
    return [handleOpen, handleClose];
};

export default useSnackBar;
