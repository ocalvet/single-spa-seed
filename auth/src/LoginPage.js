import React from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [error, setError] = React.useState();
  const [signedIn, setSignedIn] = React.useState(false);
  const [email, setEmail] = React.useState('developer@openbasic.io');
  const [password, setPassword] = React.useState('password');

  const login = async event => {
    event.preventDefault();
    setError(undefined);
    const response = await axios.post(
      'https://api.staging.openbasic.io/auth/signin',
      {
        email,
        password
      }
    );
    if (response.status !== 200) setError('Wrong email or password!');
    else {
      localStorage.setItem('token', JSON.stringify(response.data.token));
      setSignedIn(true);
      // add applications to the page
      setTimeout(() => {
        window.history.pushState({}, 'applications', '/applications');
      }, 0);
    }
  };

  return signedIn ? (
    <div id="applications" />
  ) : (
    <form onSubmit={login}>
      <input onChange={e => setEmail(e.target.value)} value={email} />
      <br />
      <input onChange={e => setPassword(e.target.value)} value={password} />
      <br />
      {error ? <div>{error}</div> : null}
      <button>Signin</button>
    </form>
  );
};

export default LoginPage;
