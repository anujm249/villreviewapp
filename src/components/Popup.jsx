import React from 'react';

export class Popup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      this.setState({ show: nextProps.show })
    }
  }

  closePopup = () => {

  }

  handleSubmit = () => {

  }

  render() {
    return (

      this.props.show
        ? <div className='popup'>
          <div className='popup_inner'>
            <div className="container">
              <h1>{this.props.text ? '' : 'Add '}Review Note</h1>
              {this.props.text ?
                <p>{this.props.text}</p> :
                <React.Fragment>
                  <input className="form-control"
                    type="text"
                    name="reviewnote"
                    onChange={this.props.onValueChange}
                    required />
                  <br />
                  <button className="btn btn-primary" onClick={this.props.submit}>Submit</button>
                </React.Fragment>
              }
              &nbsp;
              <button className="btn btn-primary" onClick={this.props.closePopup}>close</button>
            </div>
          </div>
        </div> : null

    );
  }
}