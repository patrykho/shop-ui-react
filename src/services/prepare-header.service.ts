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
