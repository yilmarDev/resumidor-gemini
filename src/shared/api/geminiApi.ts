import axios from 'axios';

const geminiApi = axios.create({
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/models/',
});

export { geminiApi };
