import { List, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const navItems = [
  { label: 'Home', icon: <HomeIcon />, path: '/' },
  { label: 'Workouts', icon: <FitnessCenterIcon />, path: '/workouts' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <>
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.label}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      {/* You can add more sections below */}
    </>
  );
}
