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
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import { getToken } from '../../services/access-token.service';
import { isTokenExpired } from '../../services/jwt-service';
import ProductApi from '../../api/products.api';

import NavBar from '../../components/nav-bar/nav-bar.component';
import ErrorMessages from '../../components/error-messages/error-messages.component';

import { ProductsI } from '../../interfaces/products-interfaces';
import { CONNECTION_ERROR } from '../../constants/app.constants';

interface ProductsProps {}

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

const Products = (props: ProductsProps) => {
  const classes = useStyles();
  const [products, setProducts] = useState<ProductsI[] | undefined>(undefined);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGetAllProducts = async () => {
    try {
      const productsResponse: ProductsI[] = await ProductApi.getAllProducts();
      if (Array.isArray(productsResponse)) {
        setProducts(productsResponse);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
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

  return (
    <div>
      <NavBar isLogin={isLogin} onSetIsLogin={setIsLogin} />
      <Typography variant="h4">Products list</Typography>
      <Button
        disabled={!isLogin}
        variant="outlined"
        color="primary"
        onClick={() => console.log('add Product')}
      >
        Add Product
      </Button>
      {isLoading && (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <CircularProgress disableShrink />
          </Paper>
        </Grid>
      )}
      {!isLoading && !products && (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ErrorMessages errors={CONNECTION_ERROR} />
          </Paper>
        </Grid>
      )}
      {!isLoading && products && (
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
                      onClick={() => console.log('edit Product', row.id)}
                    >
                      <CreateIcon />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={!isLogin}
                      variant="contained"
                      color="secondary"
                      onClick={() => console.log('delete Product', row.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Products;
