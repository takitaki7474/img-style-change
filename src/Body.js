import React from 'react';
import SelectStyleBtn from './SelectStyleBtn';
import UploadBtn from './UploadBtn';
import StyleChangeBtn from './StyleChangeBtn';
import Introduction from './Introduction';

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyStateStyleURL: '',
      bodyStateUploadedURL: ''
    }
    this.inputStyleURL = this.inputStyleURL.bind(this);
    this.inputUploadedURL = this.inputUploadedURL.bind(this);
  }

  inputStyleURL(url) {
    console.log('認識スタイルURL' + url);
    this.setState({bodyStateStyleURL: url});
  }

  inputUploadedURL(url) {
    console.log('認識アップロードURL' + url)
    this.setState({bodyStateUploadedURL: url});
  }

  render(){
    return(
      <div>
        <Introduction styleURL={this.state.bodyStateStyleURL uploadedURL={this.state.bodyStateUploadedURL}/>
        <SelectStyleBtn styleURL={(url)=>{this.inputStyleURL(url)}} />
        <UploadBtn uploadedURL={(url)=>{this.inputUploadedURL(url)}}/>
        <StyleChangeBtn styleURL={this.state.bodyStateStyleURL} uploadedURL={this.state.bodyStateUploadedURL}/>
      </div>
    );
  }
}

export default Body;
