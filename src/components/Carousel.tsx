import React from 'react'
import './styles/Carousel.sass'

export default class extends React.Component<
  {
    width: string
    height: string
    className: string
    auto?: boolean
  },
  {
    activeOn: number
  }
> {
  state = {
    activeOn: 0,
  }
  forward: boolean = false
  length: number
  css: string
  auto: boolean = false
  interval: NodeJS.Timeout | null = null

  constructor(props: any) {
    super(props)
    this.length = React.Children.count(props.children)
    this.prevSlide = this.prevSlide.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
    this.nextPress = this.nextPress.bind(this)
    this.prevPress = this.prevPress.bind(this)

    if (props.auto) {
      this.auto = true
    }

    this.css = ''
    for (let i = 0; i < this.length; i++) {
      this.css += `@keyframes nextSlide-${i} {`
      this.css += `0% { transform: translate(-${(100 / this.length) * (i - 1)}%, 0)}`
      this.css += `100% { transform: translate(-${(100 / this.length) * i}%, 0)}}\n`
      if (i !== 0) {
        this.css += `@keyframes prevSlide-${i} {`
        this.css += `0% { transform: translate(-${(100 / this.length) * (i + 1)}%, 0)}`
        this.css += `100% { transform: translate(-${(100 / this.length) * i}%, 0)}}\n`
      } else {
        this.css += `@keyframes prevSlide-${i} {`
        this.css += `0% { transform: translate(-${(100 / this.length) * (i + 1)}%, 0)}`
        this.css += `100% { transform: translate(-${(100 / this.length) * i}%, 0)}}\n`
      }
    }
  }

  render() {
    const { children, width, height } = this.props
    const buttonWidth = '4em'
    const windowWidth = `calc(100% - 2 * ${buttonWidth})`

    const slides = React.Children.toArray(children).map((e) => {
      return (
        <div
          className="carousel-item"
          style={{ width: `${100 / this.length}%`, maxHeight: height }}
        >
          {e}
        </div>
      )
    })

    // slides.unshift(slides[slides.length - 1])

    if (slides.length === 0) throw new Error('Carousel must have at least one child')

    const indicators: JSX.Element[] = []
    for (let i = 0; i < this.length; i++) {
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
          width,
          height,
        }}
      >
        <style>{this.css}</style>
        <div className="top">
          <div className="button" onClick={this.prevPress}>
            <div className="left" />
          </div>
          <div className="items" style={{ flexBasis: windowWidth }}>
            <div
              className="photo-window"
              style={{
                width: `${100 * this.length}%`,
                animationName: this.forward
                  ? `nextSlide-${this.state.activeOn}`
                  : `prevSlide-${this.state.activeOn}`,
              }}
            >
              {slides}
            </div>
          </div>
          <div className="button" onClick={this.nextPress}>
            <div className="right" />
          </div>
        </div>
        <ul className="indicators">{indicators}</ul>
      </div>
    )
  }

  componentDidMount() {
    if (this.auto) {
      if (this.interval) {
        clearInterval(this.interval)
      }
      this.interval = setInterval(this.nextSlide, 3000)
    }
  }

  nextPress() {
    this.componentDidMount()
    this.nextSlide()
  }

  prevPress() {
    this.componentDidMount()
    this.prevSlide()
  }

  nextSlide() {
    this.forward = true
    this.setState({
      activeOn: (this.state.activeOn + 1) % this.length,
    })
  }

  prevSlide() {
    this.forward = false
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
