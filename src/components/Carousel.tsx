import * as React from 'react';
import './styles/Carousel.sass'

interface CarouselProps {
  width: string
  maxWidth: string
  height: string
  className: string
  auto?: boolean
  aspect?: [number, number]
  children: React.ReactNode
}

export default class extends React.Component<
  CarouselProps,
  {
    activeOn: number
  }
> {
  state = {
    activeOn: 0,
  }
  forward: boolean = false
  length: number
  outerLength: number
  css: string
  auto: boolean = false
  interval: NodeJS.Timeout | null = null
  initial: boolean = true
  wrapper: React.RefObject<HTMLDivElement>

  constructor(props: CarouselProps) {
    super(props)

    this.wrapper = React.createRef()

    this.length = React.Children.count(props.children)
    this.outerLength = this.length + 2
    this.prevSlide = this.prevSlide.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
    this.nextPress = this.nextPress.bind(this)
    this.prevPress = this.prevPress.bind(this)
    this.resize = this.resize.bind(this)

    if (props.auto) {
      this.auto = true
    }

    this.css = ''
    const imgW = 100 / this.outerLength

    this.css += `@keyframes init { 0% {transform: translate(-${imgW}%, 0)} 100% {transform: translate(-${imgW}%, 0)}}\n`
    for (let i = 0; i < this.length; i++) {
      if (i === 0) {
        this.css += `@keyframes nextSlide-0 {`
        this.css += `0% { transform: translate(0, 0)}`
        this.css += `100% { transform: translate(-${imgW * (i + 1)}%, 0)}}\n`
      } else {
        this.css += `@keyframes nextSlide-${i} {`
        this.css += `0% { transform: translate(-${imgW * i}%, 0)}`
        this.css += `100% { transform: translate(-${imgW * (i + 1)}%, 0)}}\n`
      }

      if (i === this.length - 1) {
        this.css += `@keyframes prevSlide-${i} {`
        this.css += `0% { transform: translate(-${imgW * (this.outerLength - 1)}%, 0)}`
        this.css += `100% { transform: translate(-${imgW * (i + 1)}%, 0)}}\n`
      } else {
        this.css += `@keyframes prevSlide-${i} {`
        this.css += `0% { transform: translate(-${imgW * (i + 2)}%, 0)}`
        this.css += `100% { transform: translate(-${imgW * (i + 1)}%, 0)}}\n`
      }
    }
  }

  makeCarouselItem(child: any, key: any) {
    return (
      <div
        className="carousel-item"
        key={key}
        style={{ width: `${100 / this.length}%`, maxHeight: this.props.height }}
      >
        {child}
      </div>
    )
  }

  render() {
    const { children, width, height, maxWidth } = this.props
    const buttonWidth = '4em'
    const windowWidth = `calc(100% - 2 * ${buttonWidth})`

    const usableChildren = React.Children.toArray(children)

    const slides = usableChildren.map((e, i) => this.makeCarouselItem(e, `ci-${i}`))

    slides.unshift(
      this.makeCarouselItem(usableChildren[usableChildren.length - 1], 'ci-beg')
    )
    slides.push(this.makeCarouselItem(usableChildren[0], 'ci-end'))

    if (slides.length === 0) throw new Error('Carousel must have at least one child')

    const indicators: JSX.Element[] = []
    for (let i = 0; i < this.length; i++) {
      if (i === this.state.activeOn) {
        indicators.push(<li key={`c-li-${i}`} className="active" />)
      } else {
        indicators.push(<li key={`c-li-${i}`} />)
      }
    }

    const anim = this.forward
      ? `nextSlide-${this.state.activeOn}`
      : `prevSlide-${this.state.activeOn}`

    return (
      <div
        className="carousel"
        style={{
          width,
          height,
          maxWidth,
        }}
        ref={this.wrapper}
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
                width: `${100 * this.outerLength}%`,
                animationName: this.initial ? 'init' : anim,
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

  resize() {
    if (this.props.aspect) {
      const { aspect } = this.props
      const carousel = this.wrapper.current!
      const width = carousel.getBoundingClientRect().width
      carousel.style.height = `calc(${aspect[1] / aspect[0]} * ${width}px)`
    }
  }

  componentDidMount() {
    if (this.auto) {
      if (this.interval) {
        clearInterval(this.interval)
      }
      this.interval = setInterval(this.nextSlide, 3000)
    }
    this.initial = false

    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
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
