import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Search from './containers/Search'
import Chart from './components/Analytics/Chart';
function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Search />
        <Switch>
          <Route exact path="/analytics" component={Chart} />
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
