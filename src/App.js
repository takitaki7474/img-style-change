import React from 'react';
import Header from './Header';
import UploadBtn from './UploadBtn';
import SelectStyleBtn from './SelectStyleBtn'

class Post extends React.Component {
  render() {
    return(
      <div>
        <UploadBtn />
      </div>
    );
  }
}

class Body extends React.Component {
  render() {
    return (
      <div>
        {/*<UploadBtn />*/}
        <SelectStyleBtn />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return(
        <div>
          <Header />
          <Body />
        </div>
    );
  }
}

export default App;
