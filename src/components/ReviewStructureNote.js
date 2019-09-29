import React from 'react';
// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getFromLocalStorage, setToLocalStorage } from '../utility/localstorage';
import { FIELDS_NAME } from '../constants';
import { Tooltip } from './Tooltip';
import { Popup } from './Popup';

class ReviewStructureNote extends React.Component {
  constructor(props) {
    super(props);
    this.toolTip = React.createRef();
    this.state = {
      ...Object.values(FIELDS_NAME).reduce((initialValues, field) => ({ ...initialValues, [field]: '' }), {}),
      dirty: {},
      showAddNote: false,
      showPopup: false,
      note: '',
      textOnPopup: '',
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (event.target.className !== 'tooltiptext' && !this.state.showPopup) {
      this.setState({ ...this.state.dirty });
      this.toolTip.current && this.toolTip.current.hide();
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.data !== this.props.data) {
      this.setState({ ...nextProps.data, dirty: nextProps.data });
    }
  }

  handleClickAdd = () => {
    this.setState({ showPopup: true });
  }

  handleHoverText = (event) => {
    let el = event.currentTarget;
    if (el != null) {
      this.toolTip.current.show({ x: event.clientX, y: event.clientY });
    }
    this.setState({ showAddNote: true })
  }

  handleOnMouseUp = (field, event) => {
    const fieldText = this.state[field];
    const selectedText = window.getSelection() && window.getSelection().getRangeAt(0);
    const startP = selectedText.startOffset;
    const endP = selectedText.endOffset;
    if (startP !== endP) {
      const modifieldText = fieldText.slice(0, startP) +
        "<a class='tooltipp' onhover=" + this.handleHoverText(event) + ">" + fieldText.slice(startP, endP) +
        "</a>" + fieldText.slice(endP);
      selectedText && this.setState({ [field]: modifieldText });
    }
  }

  handleMouseDown = (field) => {
    this.toolTip.current.hide();
  }

  handleClosePopUp = () => {
    this.setState({ showPopup: false, textOnPopup: '' })
  }

  handleLinkClick = (event) => {
    if (event.target.className === 'nt') {
      const notes = getFromLocalStorage('notes');
      debugger
      this.setState({ showPopup: true, textOnPopup: notes[parseInt(event.target.dataset.count, 0) + 1] })
    }
  }

  handleSubmit = () => {

    const existingNotes = getFromLocalStorage('notes');
    const existingReview = getFromLocalStorage('review');
    const count = existingNotes ? Object.keys(existingNotes).length : 0;
    const newReview = Object.entries(existingReview).reduce((newData, [key, value]) => {
      return {
        ...newData,
        [key]: typeof this.state[key] === "string" ?
          this.state[key].replace("class='tooltipp'", "class='nt' data-count=" + count)
          :
          value,
      }
    }, {})
    setToLocalStorage('review', newReview);
    setToLocalStorage('notes', { ...existingNotes, [count + 1]: this.state.note });
    document.location.reload()
  }


  render() {
    return (

      <div className='container'>
        <Tooltip ref={this.toolTip} onClick={this.handleClickAdd} />
        <Popup
          show={this.state.showPopup}
          closePopup={this.handleClosePopUp}
          onValueChange={(event) => this.setState({ note: event.target.value })}
          submit={this.handleSubmit}
          text={this.state.textOnPopup}
        />
        <label>Villa Name</label>
        <p>{this.state[FIELDS_NAME.VILLANAME]}</p>


        <label>Date of Visit</label>
        <p>{this.state[FIELDS_NAME.DATE_OF_VISIT]}</p>


        <label>Pincode</label>
        <p>{this.state[FIELDS_NAME.PINCODE]}</p>

        <label>Owner's Name</label>
        <p>{this.state[FIELDS_NAME.OWNERNAME]}</p>

        <label>A note about surrouding area of villa</label>
        <p
          className='notes'
          onMouseUp={(event) => this.handleOnMouseUp(FIELDS_NAME.SURROUDING_NOTE, event)}
          dangerouslySetInnerHTML={{ __html: this.state[FIELDS_NAME.SURROUDING_NOTE] }}
          onClick={this.handleLinkClick}
        >
        </p>

        <label>A note about the construction quality of the villa</label>
        <p
          className='notes'
          onMouseUp={(event) => this.handleOnMouseUp(FIELDS_NAME.CNSTRUCTION_QUALITY_NOTE, event)}
          dangerouslySetInnerHTML={{ __html: this.state[FIELDS_NAME.CNSTRUCTION_QUALITY_NOTE], onClick: this.handleLinkClick }}
          onClick={this.handleLinkClick}
        >
        </p>

        <label>A note about the villa decor</label>
        <p
          className='notes'
          onMouseUp={(event) => this.handleOnMouseUp(FIELDS_NAME.VILLA_DECOR, event)}
          onMouseDown={() => this.handleMouseDown(FIELDS_NAME.VILLA_DECOR)}
          dangerouslySetInnerHTML={{ __html: this.state[FIELDS_NAME.VILLA_DECOR] }}
          onClick={this.handleLinkClick}
        >
        </p>

      </div >
    )
  }
}

export default ReviewStructureNote;
