import axios from 'axios';

export const login = (creds) =>
  axios.post(`http://bugtracker-env.eba-cnmv7y5g.us-east-2.elasticbeanstalk.com/authenticate`, creds, {
    withCredentials: true,
  });
