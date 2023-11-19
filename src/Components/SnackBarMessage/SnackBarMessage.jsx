/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotificationDisplay } from '../../state/actions';

function SnackBarMessage() {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
		setTimeout(() => dispatch(clearNotificationDisplay()), 200);
	};
	const { message, severity = 'error', isOpen } = useSelector(
		({ notify: { notification } }) => notification,
	);

	useEffect(() => {
		setOpen(isOpen);
	}, [isOpen]);
	return (
		<Snackbar open={open} autoHideDuration={2000} onClose={handleSnackbarClose}>
			<Alert severity={severity} elevation={6} variant="filled">
				{message}
			</Alert>
		</Snackbar>
	);
}

export default SnackBarMessage;
