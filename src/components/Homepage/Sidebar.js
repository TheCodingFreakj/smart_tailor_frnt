import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import { Dashboard as DashboardIcon, ShoppingCart as ShoppingCartIcon, Settings as SettingsIcon } from '@mui/icons-material';

const Sidebar = () => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#232F3E',
          color: 'white',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem button>
          <ListItemIcon><DashboardIcon style={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><ShoppingCartIcon style={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Recommendations" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><SettingsIcon style={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
