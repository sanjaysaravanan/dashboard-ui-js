/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Autocomplete, InputLabel, Stack, TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { loadReports, createReport, removeReport } from '../state/actions';
import CustomCard from '../Components/CustomCard';

const types = [
  { label: 'Education', id: 1 },
  { label: 'Expense', id: 2 },
  { label: 'Sales', id: 3 },
  { label: 'Business', id: 5 },
  { label: 'Others', id: 6 },
];

const initialState = {
  file: null,
  type: '',
  name: '',
  desc: '',
};

export default function Reports() {
  const dispatch = useDispatch();
  const reportsData = useSelector(({ reports }) => reports.reports);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(initialState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const payloadFormData = new FormData();
    payloadFormData.append('file', state.file);
    payloadFormData.append('name', state.name);
    payloadFormData.append('desc', state.desc);
    payloadFormData.append('type', state.type);
    dispatch(createReport(payloadFormData));
    handleClose();
  };

  const handleDelete = (id) => {
    dispatch(removeReport(id));
  };

  React.useEffect(() => {
    dispatch(loadReports());
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        {reportsData.map(({
          id, name, desc, type,
        }) => (
          <Grid item key={name} xs={12} sm={6} md={4}>
            <CustomCard
              type="report"
              cardName={name}
              cardDesc={desc}
              handleDelete={() => handleDelete(id)}
              imgType={type}
            />
          </Grid>
        ))}
        <Grid item key="add-card" xs={12} sm={6} md={4}>
          <CustomCard action="add" type="report" handleClickOpen={handleClickOpen} />
        </Grid>
      </Grid>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          New Report
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <DialogContentText id="alert-dialog-description">
              New Report which can be used to generate charts & dashboard
            </DialogContentText>
            <TextField
              type="text"
              name="report-name"
              size="small"
              label="Report Name"
              fullWidth
              onChange={(e) => setState({
                ...state,
                name: e.target.value,
              })}
            />
            <div>
              <InputLabel>
                Choose Excel File
              </InputLabel>
              <TextField
                type="file"
                name="report-file"
                size="small"
                fullWidth
                onChange={(e) => setState({
                  ...state,
                  file: e.target.files[0],
                })}
              />
            </div>
            <TextField
              type="text"
              name="report-desc"
              size="small"
              label="Report Description"
              multiline
              rows={2}
              fullWidth
              onChange={(e) => setState({
                ...state,
                desc: e.target.value,
              })}
            />
            <Autocomplete
              disablePortal
              id="report-type"
              options={types}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Report Type" size="small" />}
              onChange={(_, value) => setState({
                ...state,
                type: value.label,
              })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="outlined"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
