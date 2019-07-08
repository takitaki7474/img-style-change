import React from 'react';

class Introduction extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let displayStyleImg;
    let displayUploadedImg;
    let displayMain;

    if (this.props.isStyle) {
      displayStyleImg = (
        <div>
          <img src={this.props.styleURL}/>
        </div>
      );
    }

    if (this.props.isUploaded) {
      displayUploadedImg = (
        <div>
          <img src={this.props.uploadedURL}/>
        </div>
      );
    }

    if ((!this.props.isStyle)&&(!this.props.isUploaded)) {
      displayMain = (
        <div>
          <div>メイン</div>
        </div>
      );
    }

    console.log('イントロスタイル' + this.props.styleURL);
    console.log('イントロアップロード' + this.props.uploadedURL);
    console.log(this.props.isStyle);
    console.log(this.props.isUploaded);

    return(
      <div>
        {displayStyleImg}
        {displayUploadedImg}
        {displayMain}
      </div>
    );
  }
}

export default Introduction;
