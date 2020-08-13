import React from 'react'
import './styles/FileInput.sass'

export default class FileInput extends React.Component {
  wrapper: React.Ref<HTMLInputElement>
  state = {
    file: '',
  }

  constructor(props: any) {
    super(props)
    this.wrapper = React.createRef()
    this.selectFile = this.selectFile.bind(this)
    this.changeFile = this.changeFile.bind(this)
  }

  changeFile() {
    const input = (this.wrapper as any).current as HTMLInputElement
    if (input.value !== '') {
      const index = input.value.indexOf('fakepath') + 9
      this.setState({ file: input.value.substring(index) })
    }
  }

  selectFile() {
    const input = (this.wrapper as any).current as HTMLInputElement
    input.click()
  }

  render() {
    return (
      <div className="dg-file-input">
        <input
          type="file"
          onChange={this.changeFile}
          ref={this.wrapper}
          accept="application/pdf"
          hidden
        />
        <div className="dg-button" onClick={this.selectFile}>
          Select File
        </div>
        {this.state.file === '' ? null : <span>{this.state.file}</span>}
      </div>
    )
  }
}
