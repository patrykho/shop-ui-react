import React, { useState } from 'react';
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
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Redirect } from 'react-router-dom';

import useFormState from '../../hooks/use-form-state';
import ErrorMessages from '../../components/error-messages/error-messages.component';

import ProductApi from '../../api/products.api';
import { ProductCreateI } from '../../interfaces/product-interfaces';

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

const initialState: ProductCreateI = {
  title: '',
  imageUrl: '',
  description: '',
  price: 0,
};

const ProductCreate = () => {
  const [formState, setFormState] = useFormState(initialState);
  const [error, setError] = useState<undefined | string | string[]>();
  const [isCreated, setIsCreated] = useState(false);

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
      await ProductApi.createProduct(formState);
      setIsCreated(true);
    } catch (error) {
      const errorResponse = error.response.data.message;
      setError(errorResponse);
    }
  };

  const classes = useStyles();

  if (isCreated) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: { from: '/product/create' },
        }}
      />
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create new product
        </Typography>
        {error && <ErrorMessages errors={error} />}
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
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
            Create
          </Button>
          <Grid container justify="flex-end">
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

export default ProductCreate;
