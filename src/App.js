import React from 'react';
import Header from './Header';
//import UploadBtn from './UploadBtn';
import SelectStyleBtn from './SelectStyleBtn'

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {/*<UploadBtn />*/}
        <SelectStyleBtn />
      </div>
    );
  }
}

export default App;
