import React from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import './alert-messages.component.scss';

export enum Severity {
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning',
}
interface AlertMessagesProps {
  messages: string[] | string;
  severity?: Severity;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertMessages = (props: AlertMessagesProps) => {
  const { messages, severity } = props;
  return (
    <>
      {Array.isArray(messages) && (
        <div>
          {Array.isArray(messages) &&
            messages.map((item) => (
              <Alert severity={severity ? severity : 'error'}>{item}</Alert>
            ))}
        </div>
      )}

      {typeof messages === 'string' && (
        <div>
          <Alert severity={severity ? severity : 'error'}>{messages}</Alert>
        </div>
      )}
    </>
  );
};

export default AlertMessages;
