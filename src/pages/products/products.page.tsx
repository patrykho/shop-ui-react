import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  makeStyles,
  createStyles,
  Theme,
  CircularProgress,
  Grid,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { getToken } from '../../services/access-token.service';
import { isTokenExpired } from '../../services/jwt-service';
import ProductApi from '../../api/products.api';

import NavBar from '../../components/nav-bar/nav-bar.component';
import AlertMessages from '../../components/alert-messages/alert-messages.component';

import { ProductI } from '../../interfaces/product-interfaces';
import { CONNECTION_ERROR } from '../../constants/app.constants';

import './products.page.scss';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

const Products = () => {
  const classes = useStyles();
  const [error, setError] = useState<undefined | string | string[]>();
  const [products, setProducts] = useState<ProductI[]>([]);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | undefined>(
    undefined
  );

  const [openSnackBarError, setOpenSnackBarError] = useState(false);
  const [openSnackBarSuccess, setOpenSnackBarSuccess] = useState(false);

  const handleClickSnackBarError = () => {
    setOpenSnackBarError(true);
  };

  const handleCloseSnackBarError = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log(event);

    setOpenSnackBarError(false);
  };

  const handleClickSnackBarSuccess = () => {
    setOpenSnackBarSuccess(true);
  };
  const handleCloseSnackBarSuccess = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBarSuccess(false);
  };

  const handleClickOpen = (productId: number) => {
    setProductToDelete(productId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchDeleteProduct = async () => {
    if (productToDelete) {
      try {
        await ProductApi.deleteProduct(productToDelete);
        if (products) {
          setProducts((prev) =>
            prev.filter((item) => item.id !== productToDelete)
          );
        }
        setProductToDelete(undefined);
        handleClickSnackBarSuccess();
      } catch (error) {
        handleClickSnackBarError();
        console.error(error);
      }
    }
  };

  const fetchGetAllProducts = async () => {
    try {
      const productsResponse: ProductI[] = await ProductApi.getAllProducts();
      if (Array.isArray(productsResponse)) {
        setProducts(productsResponse);
        setIsLoading(false);
      }
    } catch (error) {
      let errorResponse;
      if (error.response && error.response.data.message) {
        errorResponse = error.response.data.message;
      } else {
        errorResponse = CONNECTION_ERROR;
      }
      setError(errorResponse);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token: string | null = getToken();
    if (token) {
      const validToken: boolean = isTokenExpired(token);
      if (validToken) {
        setIsLogin(true);
      }
    }
  }, []);

  useEffect(() => {
    fetchGetAllProducts();
  }, []);

  const handleRedirect = (path: string) => {
    history.push(path);
  };

  return (
    <div>
      <NavBar isLogin={isLogin} onSetIsLogin={setIsLogin} />
      <Grid container justify="center">
        <Grid className="products-list-title" item>
          <Typography variant="h4">Products list</Typography>
        </Grid>
      </Grid>
      <Grid container justify="flex-end">
        <Grid className="products-list-button" item>
          <Button
            disabled={!isLogin}
            variant="contained"
            color="primary"
            onClick={() => {
              handleRedirect('/product/create');
            }}
          >
            Add Product
          </Button>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid className="products-list-title" item>
          {error && <AlertMessages messages={error} />}
        </Grid>
      </Grid>
      {isLoading && (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <CircularProgress disableShrink />
          </Paper>
        </Grid>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products &&
            products.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <Avatar
                    alt="Profile"
                    src={row.imageUrl}
                    className={classes.large}
                  />
                </TableCell>
                <TableCell>{row.title}</TableCell>

                <TableCell>{row.price}</TableCell>

                <TableCell>
                  <Button
                    disabled={!isLogin}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleRedirect(`/product/edit/${row.id}`);
                    }}
                  >
                    <CreateIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    disabled={!isLogin}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      handleClickOpen(row.id);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Do you want to delete the product id:'} {productToDelete}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please confirm to remove the product
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button
            onClick={fetchDeleteProduct}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackBarError}
        autoHideDuration={6000}
        onClose={handleCloseSnackBarError}
      >
        <AlertMessages messages={'The product could not be removed'} />
      </Snackbar>
      <Snackbar
        open={openSnackBarSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackBarSuccess}
      >
        <Alert onClose={handleCloseSnackBarSuccess} severity="success">
          Product successfully removed
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Products;
