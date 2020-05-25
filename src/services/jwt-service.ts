import decode from 'jwt-decode';

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/jwt-decode/v1/jwt-decode-tests.ts
interface TokenDto {
  foo: string;
  exp: number;
  iat: number;
}

export const isTokenExpired = (token: string) => {
  try {
    const decoded: TokenDto = decode(token);
    const timeNow = Math.floor(Date.now() / 1000);
    if (decoded.exp > timeNow) {
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};
