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
import PublishIcon from '@material-ui/icons/Publish';

import ErrorMessages from '../../components/error-messages/error-messages.component';
import ProductApi from '../../api/products.api';
import { Severity } from '../../components/error-messages/error-messages.component';

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

const FileUpload = () => {
  const [error, setError] = useState<undefined | string | string[]>();
  const [success, setSuccess] = useState<undefined | string | string[]>();
  const [file, setFile] = useState<File>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (file) {
      if (file.type === 'text/csv') {
        try {
          const formData = new FormData();
          formData.append('File', file);
          const response = await ProductApi.uploadFile(formData);
          setError(undefined);
          setSuccess([
            response.message.toString(),
            `file name ${response.fileName}`,
          ]);
        } catch (error) {
          setError('Some error occured');
        }
      } else {
        setError('Please upload only CSV file');
      }
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PublishIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Upload CSV file
        </Typography>
        {error && <ErrorMessages errors={error} />}
        {success && !error && (
          <ErrorMessages errors={success} severity={Severity.success} />
        )}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="file"
            name="file"
            type="file"
            onChange={handleChange}
          />

          <Button
            disabled={!file}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Send
          </Button>
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

export default FileUpload;
