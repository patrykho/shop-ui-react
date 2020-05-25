import React from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import './error-messages.scss';
interface ErrorMessagesProps {
  errors: string[] | string;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ErrorMessages = (props: ErrorMessagesProps) => {
  const { errors } = props;
  return (
    <>
      {Array.isArray(errors) && (
        <div>
          {Array.isArray(errors) &&
            errors.map((item) => <Alert severity="error">{item}</Alert>)}
        </div>
      )}

      {typeof errors === 'string' && (
        <div>
          <Alert severity="error">{errors}</Alert>
        </div>
      )}
    </>
  );
};

export default ErrorMessages;
