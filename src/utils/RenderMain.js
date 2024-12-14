import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Paper } from '@mui/material';
import HorizontalTabs from './modalTabs';

export const SettingsModal = ({ selectedCustomer,submitData, configData, open, setOpen }) => {
    console.log(open,configData)
    const handleClose = () => {
        
      setOpen(false);
    };


  
    return (
      <Dialog open={open} onClose={handleClose} fullScreen >
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>

            
          {/* Render settings only if selectedCustomer is not empty and configData has data */}
          {selectedCustomer!=='' && (
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
              <HorizontalTabs selectedCustomer={selectedCustomer} configData={configData} submitData={submitData}/>
            </Paper>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          
        </DialogActions>
      </Dialog>
    );
  };
  