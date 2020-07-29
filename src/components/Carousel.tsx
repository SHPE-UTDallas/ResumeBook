import React from 'react'
import './styles/Carousel.sass'

export default class extends React.Component<
  {
    width: string
    height: string
    className: string
  },
  {
    activeOn: number
  }
> {
  state = {
    activeOn: 0,
  }
  render() {
    const { children, width, height } = this.props

    const slides = React.Children.toArray(children).map((e) => {
      return <div className="carousel-item">{e}</div>
    })

    if (slides.length === 0) throw new Error('Carousel must have at least one child')

    const indicators: JSX.Element[] = []
    for (let i = 0; i < slides.length; i++) {
      if (i === this.state.activeOn) {
        indicators.push(<li className="active" />)
      } else {
        indicators.push(<li />)
      }
    }

    return (
      <div
        className="carousel"
        style={{
          width: width,
          height: height,
        }}
      >
        <div className="top">
          <div className="button">
            <div className="left" />
          </div>
          <div className="items">{slides}</div>
          <div className="button">
            <div className="right" />
          </div>
        </div>
        <ul className="indicators">{indicators}</ul>
      </div>
    )
  }
}
