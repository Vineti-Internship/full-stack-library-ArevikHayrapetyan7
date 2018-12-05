import Authen from './authen_helper'

const request = (method, path, body, b) => {
  const options = { method, headers: headers() };
  if (body)
    options.body = JSON.stringify({
      [b]: body
    })
  if (!b)
    options.body = JSON.stringify(body);

  return fetch(new Request(path, options));
}


const headers = () => {
  const token = Authen.getToken();
  const header = new Headers();

  header.append('Content-Type', 'application/json');

  if (token) {
    header.append('token', token);
    header.append('Authorization', `Token ${token}`);
  }

  return header;
}


const Req = {
  post(path, data, objective) {
    return request('POST', path, data, objective);
  },
  get(path) {
    return request('GET', path);
  },
  delete(path) {
    return request('DELETE', path);
  },
  update(path, data, objective) {
    return request('PUT', path, data, objective);
  }
}

export default Req