import { registerApplication, start } from 'single-spa';

const init = async () => {
  //  Check if user is loggedin, if not show loging form
  const userLoggedin = true;

  registerApplication(
    'auth',
    () => System.import(`http://localhost:8099/main.js`),
    () => window.location.pathname === '/auth'
  );

  start();

  if (userLoggedin) {
    // Get user applications
    const applications = Promise.resolve([
      // {
      //   appName: 'auth-app',
      //   path: '/auth',
      //   href: `http://localhost:8099/main.js`
      // },
      {
        appName: 'applications-app',
        path: '/applications',
        href: `http://localhost:8081/main.js`
      },
      {
        appName: 'portal-app',
        path: '/portal',
        href: `http://localhost:8082/main.js`
      }
    ]);

    const apps = await applications;

    apps.forEach(app =>
      registerApplication(
        app.appName,
        () => System.import(app.href),
        () => window.location.pathname.includes(app.path)
      )
    );
  }
};

init();
