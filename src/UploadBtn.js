import React from 'react';
import axios from 'axios';
import StyleChangeBtn from './StyleChangeBtn';

class UploadBtn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      isLoading: false,
      img_url: ''
    };
    this.handleInputValue = this.handleInputValue.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setImgChange = this.setImgChange.bind(this)
  }

  handleInputValue(e) {
    var files = e.target.files;
    this.setState({
      content: files[0]
    }, ()=>{
      this.handleSubmit();
    });
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
    ).then(result =>{
      this.setState({isLoading:false});
      this.setImgChange(result.data.img_url);
    }).catch(error =>{
      console.log('uploading failure');
      this.setState({isLoading:false});
    });

  }

  setImgChange(url) {
    this.setState({img_url: url});
    this.props.uploadedURL(url);
  }

  render() {
    let loading;
    if(this.state.isLoading) {
      loading = (
        <h1>
          loading...
        </h1>
      );
    }
    return(
      <div className="upload-form">
        <label className="button-item">
          アップロード
          <input className="form-button" type="file" name="file-submit" onChange={this.handleInputValue} />
        </label>
        {loading}
      </div>
    );
  }
}

export default UploadBtn;
