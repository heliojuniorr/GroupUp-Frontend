import Divider from '@mui/material/Divider';
import SwipeableDrawer, {SwipeableDrawerProps} from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const categories = [
  {
    id: 'Grupos',
    children: [
      {
        id: 'Meus grupos',
        active: true,
      },
      { id: 'Novo grupo'},
      { id: 'Achar grupos'},
    ],
  },
  {
    id: 'Eventos',
    children: [
      { id: 'Meus eventos'},
      { id: 'Novo evento',},
      { id: 'Achar eventos',},
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const paperProps = {
  sx: {
    backgroundColor: '#101F33'
  }
}

export function Navigator(props: SwipeableDrawerProps) {
  const { ...other } = props;

  return (
    <SwipeableDrawer variant="temporary" {...other} anchor="left" PaperProps={paperProps}>
      <List>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, active }) => (
              <ListItem key={childId}>
                <ListItemButton selected={active} sx={item}>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </SwipeableDrawer>
  );
}