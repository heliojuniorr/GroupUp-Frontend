import Divider from '@mui/material/Divider';
import SwipeableDrawer, {SwipeableDrawerProps} from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ChevronButton, ButtonDiv } from './styles';
import { useState } from 'react';
import { useHistory } from 'react-router';

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
  const [selectedIndex, setSelectedIndex] = useState(0)
  const history = useHistory()

  function handleClick(index: number, url: string) {
      setSelectedIndex(index)
      history.push(url)
  }

  const categories = [
    {
      id: 'Grupos',
      children: [
        { id: 'Meus grupos', index: 0, url: '/mygroups' },
        { id: 'Novo grupo', index: 1, url: '/newgroup' },
        { id: 'Achar grupos', index: 2, url: '/grouplist' },
      ],
    },
    {
      id: 'Eventos',
      children: [
        { id: 'Meus eventos', index: 3, url: '/myevents' },
        { id: 'Novo evento', index: 4, url: '/newevent' },
        { id: 'Achar eventos', index: 5, url: '/eventlist' },
      ],
    },
  ];

  return (
    <SwipeableDrawer variant="temporary" {...other} anchor="left" PaperProps={paperProps}>
      <List>
        <ButtonDiv>
          <ChevronButton onClick={props.onClose}><ChevronLeftIcon/></ChevronButton>
        </ButtonDiv>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, index, url }) => (
              <ListItem key={childId}>
                <ListItemButton selected={index === selectedIndex} sx={item} onClick={() => {handleClick(index, url)}}>
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