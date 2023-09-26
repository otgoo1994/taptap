import axios from 'axios';

const detectRequest = async (method, url, data) => {
  const params = {method, url}
  if (data) { params.data = data; }
  Event.$emit('set-loader', true);
  let response = await axios( params ).then( data => {
    Event.$emit('set-loader', false);
    return data;
  }).catch(() => {
    Event.$emit('set-loader', false);
    return false;
  });

  if (!response) {
    return false;
  }

  if (response === 204) {
    return 204;
  }
  
  return response.data ? response.data : true;
}

export {
  detectRequest
};