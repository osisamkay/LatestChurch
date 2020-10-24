import axios from 'axios';
const Frisbee = require('frisbee');
export default axios.create({
  baseURL: 'http://35.225.224.178/api/v1/',
  timeout: 60000,
  headers: {'X-Custom-Header': 'foobar'},
});
// export const Instance = new Frisbee({
//   baseURI: 'http://35.225.224.178/api/v1/',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });
