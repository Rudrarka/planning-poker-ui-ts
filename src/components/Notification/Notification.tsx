import React from 'react';
import { Snackbar } from '@material-ui/core';

interface INotificationProps {
    open: boolean;
    onClose: (event: React.SyntheticEvent | React.MouseEvent, reason?: string | undefined) => void;
}

const Notification = ({ open, onClose }: INotificationProps) => (
    <Snackbar
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        message="Link is copied to your Clipboard!"
    />
);

export default Notification;
