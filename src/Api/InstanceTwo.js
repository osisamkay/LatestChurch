import axios from 'axios';
export default () => {
  //   const [results, setResults] = useState([]);
  //   const [errorMessage, setErrorMessage] = useState('');

  const searchApi = axios.create({
    baseURL: 'http://34.68.137.0/api',
    timeout: 2000,
    headers: {'X-Custom-Header': 'foobar'},
  });
  return searchApi;
};
