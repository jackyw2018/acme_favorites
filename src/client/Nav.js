import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = ({ users, things }) => {
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <NavLink to="/users" className="nav-link" activeClassName="active">
          users {users.length}
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/things" className="nav-link" activeClassName="active">
          things {things.length}
        </NavLink>
      </li>
    </ul>
  );
};

export default Nav;
