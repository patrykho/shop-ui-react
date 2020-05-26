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
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { getToken } from '../../services/access-token.service';
import { isTokenExpired } from '../../services/jwt-service';
import NavBar from '../../components/nav-bar/nav-bar.component';

interface ProductsProps {}

const PRODUCTS = [
  {
    id: 3,
    title: 'APPLE MacBook Pro 16 i5',
    imageUrl:
      'https://www.mediaexpert.pl/media/cache/gallery/product/2/295/116/565/1vjqtsjy/images/20/2097809/APPLE-MacBook-Pro-16-front.jpg',
    description:
      'Oto najpotężniejszy notebook od Apple. Stworzony dla twórców. Ma niesamowity wyświetlacz Retina o przekątnej 16 cali, superszybkie procesory, grafikę nowej generacji, najpojemniejszą baterię w historii MacBooka Pro, nową klawiaturę Magic Keyboard i olbrzymią pamięć masową. To najdoskonalszy sprzęt dla najbardziej wymagających profesjonalistów.',
    price: 11224.33,
  },
  {
    id: 1,
    title: 'APPLE MacBook Pro 16 i5',
    imageUrl:
      'https://www.mediaexpert.pl/media/cache/gallery/product/2/295/116/565/1vjqtsjy/images/20/2097809/APPLE-MacBook-Pro-16-front.jpg',
    description:
      'Oto najpotężniejszy notebook od Apple. Stworzony dla twórców. Ma niesamowity wyświetlacz Retina o przekątnej 16 cali, superszybkie procesory, grafikę nowej generacji, najpojemniejszą baterię w historii MacBooka Pro, nową klawiaturę Magic Keyboard i olbrzymią pamięć masową. To najdoskonalszy sprzęt dla najbardziej wymagających profesjonalistów.',
    price: 1111.44,
  },
  {
    id: 4,
    title: 'APPLE MacBook Pro 16 i5',
    imageUrl:
      'https://ww.mediaexpert.pl/media/cache/gallery/product/2/295/116/565/1vjqtsjy/images/20/2097809/APPLE-MacBook-Pro-16-front.jpg',
    description:
      'Oto najpotężniejszy notebook od Apple. Stworzony dla twórców. Ma niesamowity wyświetlacz Retina o przekątnej 16 cali, superszybkie procesory, grafikę nowej generacji, najpojemniejszą baterię w historii MacBooka Pro, nową klawiaturę Magic Keyboard i olbrzymią pamięć masową. To najdoskonalszy sprzęt dla najbardziej wymagających profesjonalistów.',
    price: 11224.33,
  },
];

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
  })
);

const Products = (props: ProductsProps) => {
  const classes = useStyles();
  const [products, setProducts] = useState(PRODUCTS);
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
          {products.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>
                <Avatar
                  alt="Remy Sharp"
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
    </div>
  );
};

export default Products;
