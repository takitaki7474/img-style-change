import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

class UploadBtn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      isLoading: false
    };
    this.handleInputValue = this.handleInputValue.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.SampleFunc = this.SampleFunc.bind(this)
  }

  handleInputValue(e) {
    var files = e.target.files;
    this.setState({
      content: files[0]
    });
    console.log(files[0])
  }

  handleSubmit() {
    this.setState({isLoading: true});
    const params = new FormData()
    params.append('file-submit',this.state.content)

    axios.post(
      'http://localhost:5000/post',
      params,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    ).then((result)=>{
      this.props.history.push('/post')
      console.log("kkkkkkk")
      console.log(this.props)
      this.setState({isLoading:false});
    }).catch(()=>{
      console.log('uploading...');
      this.setState({isLoading:false});
    });

  }

  SampleFunc() {
    this.props.history.push('/post');
  }

  render() {
    return(
      <div>
        <input type="file" name="file-submit" onChange={this.handleInputValue} />
        <input type="button" onClick={this.handleSubmit} value="Submit"/>
        <button onClick={this.SampleFunc}>あああ</button>

      </div>
    );
  }
}

export default withRouter(UploadBtn);
