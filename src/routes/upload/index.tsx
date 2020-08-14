import React, { ReactElement } from 'react'
import { Grid, Input, Button } from '@material-ui/core'
import NavBar from '../../components/NavBar'
import { ENDPOINT } from '../../utils/config'
import FileInput from '../../components/FileInput'
import './main.sass'

const LabelInput = (props: {
  name: string
  label: string
  type?: string
  children?: ReactElement
  className?: string
}) => {
  return (
    <label className="dg-form-input MuiFormControlLabel-label MuiTypography-body1 MuiFormControlLabel-root">
      {`${props.label}: `}
      {props.children ?? <Input required type={props.type ?? 'text'} name={props.name} />}
    </label>
  )
}

class App extends React.Component<{ classes: any }> {
  state = {
    error: '',
  }

  toBase64(file: File): Promise<null | string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  normalizeData(event: React.ChangeEvent<any>) {
    const name = event.target.name.value.trim()
    const email = event.target.email.value.trim()
    const linkedIn = event.target.linkedin.value.trim()
    const gpa = event.target.gpa.value.trim()
    const major = event.target.major.value.trim()
    const standing = event.target.standing.value.trim()

    const info = {
      name,
      email,
      linkedIn,
      gpa,
      major,
      standing,
    }

    return info
  }

  handleSubmit = async (event: React.ChangeEvent<any>) => {
    event.preventDefault()
    event.stopPropagation()
    event.persist()

    const info = this.normalizeData(event)
    if (event.target.pdf.files.length === 0) {
      this.setState({ error: 'No file given' })
      return false
    }

    //Convert pdf to base64 since Netlify/AWS Lambda doesn't allow binary content
    let base64 = await this.toBase64(event.target.pdf.files[0])
    let formData = new FormData()

    formData.append('name', info.name)
    formData.append('email', info.email)
    formData.append('linkedin', info.linkedIn)
    formData.append('gpa', info.gpa)
    formData.append('major', info.major)
    formData.append('standing', info.standing)
    formData.append('pdf', base64 as string)

    const endpoint_url = `${ENDPOINT}/api/file`
    fetch(endpoint_url, {
      method: 'POST',
      body: formData,
    })
  }

  render() {
    const classes = this.props.classes
    return (
      <div className={classes.root}>
        <NavBar enableDrawer={false} classes={classes} />
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container alignItems="center" direction="column" justify="center">
            <p className="title">Upload Information</p>
            <span className="sub-text">*Note: all fields are required</span>
            {this.state.error !== '' ? (
              <span className="sub-text red">{this.state.error}</span>
            ) : null}
            <form
              className="dg-form"
              onSubmit={this.handleSubmit}
              encType="multipart/form-data"
            >
              <LabelInput name="name" label="Name" />
              <LabelInput name="email" label="Email" />
              <LabelInput name="linkedin" label="LinkedIn" />
              <LabelInput label="GPA" name="gpa">
                <Input
                  inputProps={{
                    step: 0.1,
                  }}
                  type="number"
                  name="gpa"
                  required
                />
              </LabelInput>
              <LabelInput name="major" label="Major" />
              <LabelInput name="standing" label="Standing" />
              <LabelInput label="Resume" name="pdf">
                <FileInput name="pdf" accept="application/pdf" />
              </LabelInput>
              <Button variant="contained" color="primary" type="submit">
                submit
              </Button>
            </form>
          </Grid>
        </div>
      </div>
    )
  }
}

export default App
