import React from 'react';

export class Tooltip extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      x: 0,
      y: 0,
    }
    this.hideTooltip = this.hideTooltip.bind(this)
    this.showTooltip = this.showTooltip.bind(this)
  }

  show = (hoverRect) => {
    this.setState({ visible: true, x: hoverRect.x, y: hoverRect.y - 40 });
  }

  hide = () => {
    this.setState({ visible: false })
  }

  hideTooltip() {
    this.setState({ displayTooltip: false })

  }
  showTooltip() {
    this.setState({ displayTooltip: true })
  }

  render() {
    let style = {
      left: ((this.state.x) + 'px'),
      top: ((this.state.y) + 'px')
    };
    console.log(style)
    return (
      this.state.visible ? <button style={style} className='tooltiptext' onClick={this.props.onClick}>Add Note</button> : null
    )
  }
}
