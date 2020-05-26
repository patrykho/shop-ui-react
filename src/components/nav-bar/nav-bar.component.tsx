import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

import './nav-bar.component.scss';

import { removeToken } from '../../services/access-token.service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },

    inputRoot: {
      color: 'inherit',
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
  })
);

interface NavBarProps {
  isLogin: boolean;
  onSetIsLogin: Function;
}

const NavBar = (props: NavBarProps) => {
  const classes = useStyles();
  const { isLogin, onSetIsLogin } = props;

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Shop Management
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {!isLogin && (
              <>
                <Button color="inherit">
                  <Link to="/login">Login</Link>
                </Button>
                <Button color="inherit">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
            {isLogin && (
              <>
                <Button color="inherit">
                  <Link to="/upload">Upload CSV</Link>
                </Button>
                <Button
                  onClick={() => {
                    removeToken();
                    onSetIsLogin(false);
                  }}
                  color="inherit"
                >
                  Logout
                </Button>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={() => {
                    console.log('go to user Profile');
                  }}
                  color="inherit"
                >
                  <Link to="/profile">
                    <AccountCircle />
                  </Link>
                </IconButton>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
