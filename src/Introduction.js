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
        <div className="selected-img">
          <p className="selected-img-text">Style</p>
          <img className="display-img" src={this.props.styleURL}/>
        </div>
      );
    }

    if (this.props.isUploaded) {
      displayUploadedImg = (
        <div className="selected-img">
          <p className="selected-img-text">Target Image</p>
          <img className="display-img" src={this.props.uploadedURL}/>
        </div>
      );
    }

    if ((!this.props.isStyle)&&(!this.props.isUploaded)) {
      displayMain = (
        <div className="intro-main">
          <div>メイン</div>
        </div>
      );
    }

    console.log('イントロスタイル' + this.props.styleURL);
    console.log('イントロアップロード' + this.props.uploadedURL);
    console.log(this.props.isStyle);
    console.log(this.props.isUploaded);

    return(
      <div className="body-main">
        {displayStyleImg}
        {displayUploadedImg}
        {displayMain}
      </div>
    );
  }
}

export default Introduction;
