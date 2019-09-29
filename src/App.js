import React from 'react';
// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { setToLocalStoragePromise, getFromLocalStoragePromise, deleteKeyFromLocalStoragePromise, deleteKeyFromLocalStorage } from './utility/localstorage';
import ReviewStructureNote from './components/ReviewStructureNote';

import { FIELDS_NAME } from './constants';


class MyVilla extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...Object.values(FIELDS_NAME).reduce((initialValues, field) => ({ ...initialValues, [field]: '' }), {}),
      isDataInLocalStorage: true,
    }
  }

  componentDidMount = () => {
    getFromLocalStoragePromise('review').then((data) => !data ?
      this.setState({ isDataInLocalStorage: false })
      :
      this.setState({ ...data, isDataInLocalStorage: true })
    );
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = () => {
    setToLocalStoragePromise('review', this.state);
  }

  handleDeleteReview = () => {
    deleteKeyFromLocalStoragePromise('review').then(
      (flag) => {
        flag && deleteKeyFromLocalStorage('notes');
        flag && this.setState({
          isDataInLocalStorage: false,
          ...Object.values(FIELDS_NAME).reduce((initialValues, field) => ({ ...initialValues, [field]: '' }), {})
        });
      }
    )
  }

  render() {
    return (

      <div className='container'>
        <h1>My villa app</h1>


        {!this.state.isDataInLocalStorage ?
          <React.Fragment>
            <div className="form-group">
              <label id="usernameLabel">Villa Name</label>
              <input className="form-control"
                type="text"
                name={FIELDS_NAME.VILLANAME}
                ref="username"
                value={this.state.villaName}
                onChange={this.handleChange}
                required />
              <div className="error" id="usernameError" />

              <label id="usernameLabel">Date of Visit</label>
              <input className="form-control"
                type="text"
                name={FIELDS_NAME.DATE_OF_VISIT}
                ref="username"
                value={this.state.dateOfVisit}
                onChange={this.handleChange}
                required />
              <div className="error" id="usernameError" />


              <label id="usernameLabel">Pincode</label>
              <input className="form-control"
                type="text"
                name={FIELDS_NAME.PINCODE}
                ref="username"
                value={this.state.pincode}
                onChange={this.handleChange}
                required />
              <div className="error" id="usernameError" />


              <label id="usernameLabel">Owner's Name</label>
              <input className="form-control"
                type="text"
                name={FIELDS_NAME.OWNERNAME}
                ref="username"
                value={this.state.ownersName}
                onChange={this.handleChange}
                required />
              <div className="error" id="usernameError" />


              <label id="usernameLabel">A note about surrouding area of villa</label>
              <textarea className="form-control"
                type="text"
                name={FIELDS_NAME.SURROUDING_NOTE}
                ref="username"
                value={this.state.surroundingNote}
                onChange={this.handleChange}
                required />
              <div className="error" id="usernameError" />

              <label id="usernameLabel">A note about the construction quality of the villa</label>
              <textarea className="form-control"
                type="text"
                name={FIELDS_NAME.CNSTRUCTION_QUALITY_NOTE}
                ref="username"
                value={this.state.constructionQualityNote}
                onChange={this.handleChange}
                required />
              <div className="error" id="usernameError" />

              <label id="usernameLabel">A note about the villa decor</label>
              <textarea className="form-control"
                type="text"
                name={FIELDS_NAME.VILLA_DECOR}
                ref="username"
                value={this.state.villaDecor}
                onChange={this.handleChange}
                required />
              <div className="error" id="usernameError" />

            </div>
            <button
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Save
          </button>
          </React.Fragment>
          :
          <div>
            <ReviewStructureNote data={this.state} />
            <button className="btn btn-primary"
              onClick={this.handleDeleteReview}>Delete Review</button>
          </div>
        }
      </div>
    )
  }
}

export default MyVilla;
