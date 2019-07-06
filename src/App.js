import React from 'react';
import Header from './Header';
import UploadBtn from './UploadBtn';
import SelectStyleBtn from './SelectStyleBtn'
import { BrowserRouter, Switch, Route } from 'react-router-dom';


class Post extends React.Component {
  render() {
    return(
      <div>
        <Header />
        <UploadBtn />
      </div>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <UploadBtn />
        <SelectStyleBtn />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path={'/'} component={Home}/>
            <Route path={'/post'} component={Post}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
