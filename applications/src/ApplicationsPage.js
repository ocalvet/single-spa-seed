import React from 'react';
import axios from 'axios';

const ApplicationsPage = () => {
  const [apps, setApps] = React.useState();
  React.useEffect(() => {
    const getApps = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await axios.get(`${process.env.APPLICATIONS_SERVICE}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      if (response.status === 200) setApps(response.data.users);
    };
    getApps();
  }, []);
  return (
    <React.Fragment>
      {apps ? (
        apps.map(user => (
          <div key={user._id}>{`${user.firstName} ${user.lastName}`}</div>
        ))
      ) : (
        <div>No Applications Loaded</div>
      )}
    </React.Fragment>
  );
};

export default ApplicationsPage;
