import React from 'react';

const UserCard = ({ data }) => {
  return (
    <div className="user-card">
      <div>
        <h5>Name : </h5> <p>{data['name']} </p>
      </div>
      <div>
        <h5>Email : </h5> <p>{data['email']} </p>
      </div>
      <div>
        <h5>Mobile : </h5> <p>{data['mobile']} </p>
      </div>
    </div>
  );
};

export default UserCard;
