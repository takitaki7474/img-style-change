import React from 'react';
import Header from './Header';
//import UploadBtn from './UploadBtn';
//import SelectStyleBtn from './SelectStyleBtn';
import Body from './Body';


/*
class Body extends React.Component {
  render() {
    return (
      <div>
        <SelectStyleBtn />
      </div>
    );
  }
}
*/
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
