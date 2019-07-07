import React from 'react';

class SelectStyleBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isModalOpen: false};
    this.handleClickStyle = this.handleClickStyle.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
  }

  handleClickStyle() {
    this.setState({isModalOpen: true});
  }

  handleClickClose() {
    this.setState({isModalOpen: false});
  }

  render() {
    let modal;
    if(this.state.isModalOpen) {
      modal = (
        <div className="modal">
          <div className="modal-inner">
            <button className="modal-close-btn" onClick={this.handleClickClose}>とじる</button>
            <div className="modal-style-box">
              <div className="modal-style-title">タイトル</div>
              <img className="modal-style-img" src="/src/style/style_1.png"/>
            </div>
          </div>
        </div>
      );
    }

    return(
      <div>
        <div onClick={this.handleClickStyle}>
          <p>スタイルを選択</p>
        </div>
        {modal}
      </div>
    );
  }
}

export default SelectStyleBtn;
