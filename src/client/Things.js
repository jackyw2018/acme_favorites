import React from 'react';

const Things = ({ things }) => {
  return (
    <ul>
      {things.map(thing => (
        <li key={thing.id}>
          {thing.name}
          <ul>
            <Favorites favoriteUsers={thing.users} />
          </ul>
        </li>
      ))}
    </ul>
  );
};

const Favorites = ({ favoriteUsers }) => {
  return favoriteUsers.map(favoriteUser => (
    <li key={favoriteUser.id}>favorited by: {favoriteUser.name}</li>
  ));
};

export default Things;
