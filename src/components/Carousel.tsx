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
    xoff: number
  }
> {
  state = {
    activeOn: 0,
    xoff: 0,
  }
  length: number

  constructor(props: any) {
    super(props)
    this.length = React.Children.count(props.children)
    this.prevSlide = this.prevSlide.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
  }

  render() {
    const { children, width, height } = this.props

    const slides = React.Children.toArray(children).map((e) => {
      return (
        <div className="carousel-item" style={{ width }}>
          {e}
        </div>
      )
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
          <div className="button" onClick={this.prevSlide}>
            <div className="left" />
          </div>
          <div className="items">
            <div
              className="photo-window"
              style={{
                width: `calc(${width} * ${this.length}`,
                left: `calc(${-this.state.activeOn} * ${width})`,
              }}
            >
              {slides}
            </div>
          </div>
          <div className="button" onClick={this.nextSlide}>
            <div className="right" />
          </div>
        </div>
        <ul className="indicators">{indicators}</ul>
      </div>
    )
  }

  nextSlide() {
    this.setState({
      activeOn: (this.state.activeOn + 1) % this.length,
    })
  }

  prevSlide() {
    if (this.state.activeOn !== 0) {
      this.setState({
        activeOn: (this.state.activeOn - 1) % this.length,
      })
    } else {
      this.setState({
        activeOn: this.length - 1,
      })
    }
  }
}
