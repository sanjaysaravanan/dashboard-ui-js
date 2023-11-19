/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip, useTheme } from '@mui/material';

const navPaths = [
  { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { label: 'Charts', path: '/charts', icon: <BarChartIcon /> },
  { label: 'Reports', path: '/reports', icon: <TopicOutlinedIcon /> },
];

export default function ListItems() {
  const location = useLocation();
  const theme = useTheme();

  // eslint-disable-next-line no-unused-vars
  const highlightItem = (itemPath) => itemPath === location.pathname;

  const renderHighlightColor = (itemPath) => (highlightItem(itemPath)
    ? theme.palette.common.white
    : theme.palette.common.black);

  return (
    <>
      {navPaths.map(({ path, label, icon }) => (
        <Tooltip
          title={label}
          key={label}
          placement="right"
        >
          <ListItem
            button
            component={Link}
            to={path}
            sx={{
              backgroundColor: highlightItem(path)
                ? theme.palette.primary.main
                : 'transparent',
              color: renderHighlightColor(path),
              '&:hover': {
                backgroundColor: highlightItem(path)
                  ? theme.palette.primary.main
                  : 'rgba(0,0,0,0.04)',
              },
            }}
          >
            <ListItemIcon sx={{ color: renderHighlightColor(path) }}>
              {icon}
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        </Tooltip>
      ))}
    </>
  );
}
