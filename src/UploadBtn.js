import React from 'react';

class UploadBtn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
    this.handleInputValue = this.handleInputValue.bind(this)
  }

  handleInputValue(e) {
    var files = e.target.files;
    this.setState({
      content: files[0]
    });
    console.log(files[0])
  }

  render() {
    return(
      <div>
        <input type="file" name="file-submit" onChange={this.handleInputValue} />
      </div>
    );
  }
}

export default UploadBtn;
