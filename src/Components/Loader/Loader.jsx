import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { hideGlobalLoading } from '../../state/actions/notifyActions';

let currentlyTimeOutId;
function LoadingIndicator() {
  const theme = useTheme();
  const { isLoading = [] } = useSelector(({ notify }) => notify);
  const dispatch = useDispatch();
  const [openClosed, setOpenClosed] = useState(false);

  useEffect(() => {
    setOpenClosed(!!isLoading.length);
  }, [isLoading]);

  if (openClosed) {
    clearTimeout(currentlyTimeOutId);
    currentlyTimeOutId = setTimeout(() => {
      isLoading.forEach(() => dispatch(hideGlobalLoading()));
    }, 12000);
  } else clearTimeout(currentlyTimeOutId);
  return (
    <Backdrop
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      }}
      open={openClosed}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default LoadingIndicator;
