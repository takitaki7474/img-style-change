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
      bodyStateChangedURL:'',
      isStyle: false,
      isUploaded: false,
      isChanged: false,
      isLoading: false
    }
    this.inputStyleURL = this.inputStyleURL.bind(this);
    this.inputUploadedURL = this.inputUploadedURL.bind(this);
    this.inputChangedURL = this.inputChangedURL.bind(this);
    this.inputIsLoading = this.inputIsLoading.bind(this);
  }

  inputStyleURL(url) {
    console.log('認識スタイルURL' + url);
    this.setState({bodyStateStyleURL: url});
    this.setState({isStyle: true});
  }

  inputUploadedURL(url) {
    console.log('認識アップロードURL' + url);
    this.setState({bodyStateUploadedURL: url});
    this.setState({isUploaded: true});
  }

  inputChangedURL(url) {
    console.log('認識スタイル変換後URL' + url);
    this.setState({bodyStateChangedURL: url});
    this.setState({isChanged: true});
  }

  inputIsLoading(load) {
    this.setState({isLoading: load})
  }

  render(){
    return(
      <div>
        <Introduction styleURL={this.state.bodyStateStyleURL} uploadedURL={this.state.bodyStateUploadedURL} changedURL={this.state.bodyStateChangedURL} isStyle={this.state.isStyle} isUploaded={this.state.isUploaded} isChanged={this.state.isChanged} isLoading={this.state.isLoading}/>
        <div className="button-items-box">
          <SelectStyleBtn styleURL={(url)=>{this.inputStyleURL(url)}} />
          <UploadBtn uploadedURL={(url)=>{this.inputUploadedURL(url)}}/>
          <StyleChangeBtn styleURL={this.state.bodyStateStyleURL} uploadedURL={this.state.bodyStateUploadedURL} isLoading={(load)=>{this.inputIsLoading(load)}} changedURL={(url)=>{this.inputChangedURL(url)}}/>
        </div>
      </div>
    );
  }
}

export default Body;
