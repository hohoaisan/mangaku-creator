/**
 * This helper will help resolving public path for accessing static files from the server
 * if it starts with letter "/", else
 * @param {string} url The `url` needs to be resolve.
 */

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_HOST;

const resolveImgUrl = (url) => (typeof url === 'string' && url.startsWith('/') ? `${PUBLIC_URL}${url}` : url);

export default resolveImgUrl;
