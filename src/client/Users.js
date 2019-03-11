import React from 'react';

const Users = ({ users }) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name}
          <ul>
            <Thing things={user.things} />
          </ul>
        </li>
      ))}
    </ul>
  );
};

const Thing = ({ things }) => {
  return things.map(thing => (
    <li key={thing.id}>
      {thing.name} (Ranked: {thing.favorite.rank})
    </li>
  ));
};

export default Users;
