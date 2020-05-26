import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  makeStyles,
  Paper,
  CircularProgress,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import useFormState from '../../hooks/use-form-state';
import ErrorMessages from '../../components/error-messages/error-messages.component';

import ProductApi from '../../api/products.api';
import { ProductI } from '../../interfaces/product-interfaces';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialState: ProductI = {
  id: 0,
  title: '',
  imageUrl: '',
  description: '',
  price: 0,
};
type TParams = { id: string };

const ProductEdit = ({ match }: RouteComponentProps<TParams>) => {
  const classes = useStyles();
  const { id } = match.params;
  const [formState, setFormState] = useFormState(initialState);
  const [error, setError] = useState<undefined | string | string[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isEdited, setIsEdited] = useState(false);

  const fetchGetProduct = async () => {
    try {
      const productsResponse: ProductI = await ProductApi.getProduct(id);
      if (productsResponse) {
        setFormState(productsResponse);
        setIsLoading(false);
      }
    } catch (error) {
      const errorResponse = error.response.data.message;
      setError(errorResponse);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGetProduct();
  }, []);

  if (isLoading) {
    return (
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <CircularProgress disableShrink />
        </Paper>
      </Grid>
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    let value: string | number = event.target.value;
    const name = event.target.name;
    if (name === 'price' && typeof value === 'string') {
      value = parseFloat(value);
    }
    setFormState({
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await ProductApi.updateProduct(id, formState);
      setIsEdited(true);
    } catch (error) {
      const errorResponse = error.response.data.message;
      setError(errorResponse);
    }
  };

  if (isEdited) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: { from: `/product/edited/${id}` },
        }}
      />
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit product
        </Typography>
        {error && <ErrorMessages errors={error} />}
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                defaultValue={formState.title}
                name="title"
                variant="outlined"
                fullWidth
                id="title"
                label="Title"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={formState.imageUrl}
                type="url"
                variant="outlined"
                fullWidth
                id="imageUrl"
                label="Image url"
                name="imageUrl"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={formState.description}
                type="text"
                variant="outlined"
                fullWidth
                id="description"
                label="Product description"
                name="description"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={formState.price}
                variant="outlined"
                fullWidth
                name="price"
                label="Price"
                type="number"
                id="price"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Edit
          </Button>{' '}
          <Grid container justify="space-between">
            <Grid item>
              <Link href="/login" variant="body2">
                Go to Login page
              </Link>
            </Grid>
            <Grid item>
              <Link href="/" variant="body2">
                Go to Products list
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default ProductEdit;
