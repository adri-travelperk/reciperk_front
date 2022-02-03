import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, List, Typography, Divider, Container, ListItem, Link } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import { Link as RouterLink, Routes, Route, useParams } from 'react-router-dom';


import RecipeAdd from './RecipeAdd'
import { RecipeView } from '../pages/RecipeView';
import { RecipeEdit } from './RecipeEdit';
import RecipeList from './RecipeList';
import RecipeSideList from '../components/RecipeSideList';
import Home from './Home'
import RecipeDelete from './RecipeDelete'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link component={RouterLink} color="inherit" to="https://travelperk.com/">
        Travelperk
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth: number = 180;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function SideBar({ recipes }) {
  return (
    <Drawer variant="permanent" open={true}>
      <List>
        <ListItem button>
          <Link component={RouterLink} color='primary' to='/'>
            <Typography color="primary" sx={{ pl: 1 }} variant="h6">
              Reciperk
            </Typography>
          </Link>
        </ListItem>
      </List>
      <Divider />
      <RecipeSideList recipes={recipes} />
    </Drawer>
  )
}

export default function Dashboard() {
  const [recipes, setRecipes] = React.useState([])

  React.useEffect(() => {
    fetch('http://127.0.0.1:8000/recipes/', { method: "GET" })
      .then(res => res.json())
      .then(response => { setRecipes(response) })
      .catch(console.log)
  }, [])

  const randomRecipe = recipes.length > 0 ? recipes[Math.floor(Math.random() * recipes.length)] : { id: 0, name: "" }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <SideBar recipes={recipes} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path='/'
                element={<Home randomRecipe={randomRecipe} />} />
              <Route path='/recipes'
                element={<RecipeList />} />
              <Route path='/recipes/add'
                element={<RecipeAdd />} />
              <Route path='/recipes/:id'
                element={<RecipeView />} />
              <Route path='/recipes/:id/edit'
                element={<RecipeEdit />} />
              <Route path='/recipes/:id/delete'
                element={<RecipeDelete />} />
            </Routes>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
