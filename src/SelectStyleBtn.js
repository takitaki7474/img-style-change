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
          <h2>aaaaa</h2>
          <button onClick={this.handleClickClose}>閉じる</button>
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
