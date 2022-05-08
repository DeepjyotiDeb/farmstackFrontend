import axios from "axios";

const service = axios.create({
    timeout: 20000 // request timeout
  });
  // service.defaults.baseURL = 'http://localhost:8000/';
//   service.defaults.baseURL ='https://zwc74bqvu4.execute-api.ap-south-1.amazonaws.com/dev1/'
//   service.defaults.baseURL ="https://api-service.d0ljtrevpub3e.ap-south-1.cs.amazonlightsail.com/"
  service.defaults.baseURL = "http://localhost:8000/api/"
  service.defaults.headers.post['Content-Type'] = 'application/json';

export default service;