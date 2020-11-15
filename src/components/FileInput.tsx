import * as React from 'react';
import { Button } from '@material-ui/core'
import './styles/FileInput.sass'

export default class FileInput extends React.Component<{
  name: string
  accept: string
}> {
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
          accept={this.props.accept}
          name={this.props.name}
          hidden
        />
        <Button variant="contained" onClick={this.selectFile} color="primary">
          Select File
        </Button>
        {this.state.file === '' ? null : <span>{this.state.file}</span>}
      </div>
    )
  }
}
