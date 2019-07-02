import { registerApplication, start } from 'single-spa';
import axios from 'axios';

const USER_KEY = '@portal.auth.user';

const init = async () => {
  //  Check if user is loggedin, if not show loging form
  const user = await getUser();

  if (!user) {
    showLoginForm();
  } else {
    // load user applications
    loadUserApps(user);
  }
};

const showLoginForm = () => {
  const formContainer = window.document.createElement('div');
  const userNameInputField = window.document.createElement('input');
  const passwordInputField = window.document.createElement('input');
  const submitButton = window.document.createElement('button');
  submitButton.onclick = async () => {
    // sign in here
    const email = userNameInputField.value;
    const password = passwordInputField.value;
    try {
      const response = await axios.post(`${process.env.AUTH_SERVICE}`, {
        email,
        password
      });
      const user = { ...response.data.user, token: response.data.token };
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      loadUserApps(user);
    } catch (e) {
      console.log(e);
    }
  };
  submitButton.innerText = 'Signin';
  // Connect elements
  formContainer.appendChild(userNameInputField);
  formContainer.appendChild(window.document.createElement('br'));
  formContainer.appendChild(passwordInputField);
  formContainer.appendChild(window.document.createElement('br'));
  formContainer.appendChild(submitButton);
  window.document.getElementById('root-app').appendChild(formContainer);
};

const getUser = async () => {
  const userJsonString = localStorage.getItem(USER_KEY);
  const userModel = JSON.parse(userJsonString);
  // TODO check that user still logged in
  return userModel;
};

const loadUserApps = async user => {
  // Get user applications
  const response = await axios.get(`${process.env.APPLICATIONS_SERVICE}`, {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });

  const apps = response.data;

  const appsContainer = window.document.getElementById('root-app');

  apps.forEach(app => {
    // add element for application in the dom
    const appContainer = document.createElement('div');
    appContainer.id = app.name;
    appsContainer.appendChild(appContainer);

    registerApplication(
      app.name,
      () => System.import(app.href),
      () => window.location.pathname.includes(app.path)
    );
  });

  start();
};

init();
