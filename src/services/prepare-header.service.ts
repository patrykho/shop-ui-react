import { getToken } from '../services/access-token.service';

export const prepareHeader = () => {
  const token = getToken();
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return options ? options : {};
};

export const prepareHeaderWithFile = () => {
  const token = getToken();
  const options = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };
  return options ? options : {};
};
