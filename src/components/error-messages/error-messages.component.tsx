import React from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import './error-messages.component.scss';

export enum Severity {
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning',
}
interface ErrorMessagesProps {
  errors: string[] | string;
  severity?: Severity;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ErrorMessages = (props: ErrorMessagesProps) => {
  const { errors, severity } = props;
  return (
    <>
      {Array.isArray(errors) && (
        <div>
          {Array.isArray(errors) &&
            errors.map((item) => (
              <Alert severity={severity ? severity : 'error'}>{item}</Alert>
            ))}
        </div>
      )}

      {typeof errors === 'string' && (
        <div>
          <Alert severity={severity ? severity : 'error'}>{errors}</Alert>
        </div>
      )}
    </>
  );
};

export default ErrorMessages;
