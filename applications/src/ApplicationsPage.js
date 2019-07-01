import React from 'react';
import axios from 'axios';

const ApplicationsPage = () => {
  const [apps, setApps] = React.useState();
  React.useEffect(() => {
    const getApps = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await axios.get(
        `https://api.staging.openbasic.io/users/search?name=&page=0&pageSize=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response);
      if (response.status === 200) setApps(response.data.users);
    };
    getApps();
  }, []);
  return (
    <React.Fragment>
      {apps ? (
        apps.map(user => <div key={user._id}>{user._id}</div>)
      ) : (
        <div>No Applications Loaded</div>
      )}
    </React.Fragment>
  );
};

export default ApplicationsPage;
