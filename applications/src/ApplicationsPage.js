import React from 'react';

const ApplicationsPage = () => {
  const [apps, setApps] = React.useState();
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
