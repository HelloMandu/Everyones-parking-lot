import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { closeSnackBar, openSnackBar } from '../store/snackBar';

const useSnackBar = () => {
    const dispatch = useDispatch();
    const handleOpen = useCallback(
        (message) => dispatch(openSnackBar(message)),
        [dispatch],
    );
    const handleClose = useCallback(
        (message) => dispatch(closeSnackBar(message)),
        [dispatch],
    );
    return [handleOpen, handleClose];
};

export default useSnackBar;
