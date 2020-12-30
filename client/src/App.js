import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UsersPage from './pages/users/UserPage';
import TasksPage from './pages/tasks/TaskPage';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/users/:userId" component={TasksPage} />
          <Route path="/users" component={UsersPage} />
          <Route path="/" component={UsersPage} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
