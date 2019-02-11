const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3004'

const headers = {
    'Accept': 'application/json'
};

//signup
export const signup = (payload) =>
fetch(`${api}/signup`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  credentials:'include',
  body: JSON.stringify(payload)
}).then(res=>res.json())
.then(res => {
  return res.status;
})
.catch(error => {
  console.log("This is signup error");
  return error;
});


//signin
export const signin = (payload) =>
fetch(`${api}/signin`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  credentials:'include',
  body: JSON.stringify(payload)
}).then(res=>res.json())
.then(res => {
  return res.output;
})
.catch(error => {
  console.log("This is login error");
  return error;
});
