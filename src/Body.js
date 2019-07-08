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
      bodyStateUploadedURL: '',
      isStyle: false,
      isUploaded: false
    }
    this.inputStyleURL = this.inputStyleURL.bind(this);
    this.inputUploadedURL = this.inputUploadedURL.bind(this);
  }

  inputStyleURL(url) {
    console.log('認識スタイルURL' + url);
    this.setState({bodyStateStyleURL: url});
    this.setState({isStyle: true});
  }

  inputUploadedURL(url) {
    console.log('認識アップロードURL' + url)
    this.setState({bodyStateUploadedURL: url});
    this.setState({isUploaded: true});
  }

  render(){
    return(
      <div>
        <Introduction styleURL={this.state.bodyStateStyleURL} uploadedURL={this.state.bodyStateUploadedURL} isStyle={this.state.isStyle} isUploaded={this.state.isUploaded}/>
        <SelectStyleBtn styleURL={(url)=>{this.inputStyleURL(url)}} />
        <UploadBtn uploadedURL={(url)=>{this.inputUploadedURL(url)}}/>
        <StyleChangeBtn styleURL={this.state.bodyStateStyleURL} uploadedURL={this.state.bodyStateUploadedURL}/>
      </div>
    );
  }
}

export default Body;
