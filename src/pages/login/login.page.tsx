import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Container,
  CssBaseline,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
  makeStyles,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Redirect } from 'react-router-dom';

import {
  LoginDataI,
  LoginResponseI,
} from '../../interfaces/login-data-interface';

import AuthApi from '../../api/auth.api';
import useFormState from '../../hooks/use-form-state';
import ErrorMessages from '../../components/error-messages/error-messages.component';
import { setToken, getToken } from '../../services/access-token.service';
import { isTokenExpired } from '../../services/jwt-service';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialState: LoginDataI = {
  login: '',
  password: '',
};

const Login = () => {
  const [formState, setFormState] = useFormState(initialState);
  const [error, setError] = useState<undefined | string | string[]>();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token: string | null = getToken();
    if (token) {
      const validToken: boolean = isTokenExpired(token);
      if (validToken) {
        setIsLogin(true);
      }
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setFormState({
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response: LoginResponseI = await AuthApi.signIn(formState);
      setError(undefined);
      setToken(response.accessToken);
      setIsLogin(true);
    } catch (error) {
      const errorResponse = error.response.data.message;
      setError(errorResponse);
      setIsLogin(false);
    }
  };

  const classes = useStyles();

  if (isLogin) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: { from: '/login' },
        }}
      />
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {error && <ErrorMessages errors={error} />}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="login"
            label="Login"
            name="login"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
