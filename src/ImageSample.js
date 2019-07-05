import React from 'reacr';

class ImageSapmle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isImage: false};
  }

  render() {
    let modal;
    if(this.state.isImage) {
      modal = (
        <div>
          <img src=""
        </div>
      );
    }
  };
}
