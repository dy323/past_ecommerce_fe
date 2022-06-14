import { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast = ({open, status, message, onCloseAction}) => {
    return (
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}} open={open} autoHideDuration={6000} onClose={onCloseAction}>
          <Alert onClose={onCloseAction} severity={status} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
    )
}

export default Toast;
