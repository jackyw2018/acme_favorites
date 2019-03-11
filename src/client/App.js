import React from 'react';
import axios from 'axios';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import Nav from './Nav';
import Users from './Users';
import Things from './Things';

class App extends React.Component {
  state = {
    users: [],
    things: [],
  };

  componentDidMount() {
    axios
      .get('http://localhost:3000/api/users')
      .then(response => {
        this.setState({ users: response.data });
        return axios.get('http://localhost:3000/api/things');
      })
      .then(response => this.setState({ things: response.data }))
      .catch(error => console.log(error));
  }

  render() {
    const { users, things } = this.state;
    return (
      <HashRouter>
        <div>
          <h1>Acme Favorites</h1>
          <Route render={() => <Nav users={users} things={things} />} />
          <Switch>
            <Route path="/users" render={() => <Users users={users} />} />
            <Route path="/things" render={() => <Things things={things} />} />
            <Route path="/" render={() => <Redirect to="/users" />} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
