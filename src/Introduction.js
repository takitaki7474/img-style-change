import React from 'react';

class Introduction extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let displayStyleImg;
    let displayUploadedImg;
    let displayChangedImg;
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
    if (this.props.isLoading) {
      displayChangedImg = (
        <div className="changing-text">Changing Image ...</div>
      )
    }else if (this.props.isChanged) {
      displayChangedImg = (
        <div className="selected-img">
          <p className="selected-img-text">Changed Image</p>
          <img className="display-img" src={this.props.changedURL}/>
        </div>
      );
    }

    if ((!this.props.isStyle)&&(!this.props.isUploaded)) {
      displayMain = (
        <div className="intro-main">
          <div className="selected-img">
            <p className="selected-img-text">Style</p>
            <img className="display-img" src="/src/images/cat.png"/>
          </div>
          <div className="operator-box"><p className="operator">×</p></div>
          <div className="selected-img">
            <p className="selected-img-text">Target Image</p>
            <img className="display-img" src="/src/images/index.jpeg"/>
          </div>
          <div className="operator-box"><p className="operator">=</p></div>
          <div className="selected-img">
            <p className="selected-img-text">Changed Image</p>
            <img className="display-img" src="/src/images/cat_index.gif"/>
          </div>
        </div>
      );
    }

    return(
      <div className="body-main">
        {displayStyleImg}
        {displayUploadedImg}
        {displayChangedImg}
        {displayMain}
      </div>
    );
  }
}

export default Introduction;
