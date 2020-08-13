import React, { ReactElement } from 'react'
import { Grid, Input } from '@material-ui/core'
import NavBar from '../../components/NavBar'
import { ENDPOINT } from '../../utils/config'
import './main.sass'
import FileInput from '../../components/FileInput'

const LabeledInputGI = (props: {
  name: string
  label: string
  type?: string
  children?: ReactElement
  className?: string
}) => {
  const wrapper = React.createRef()
  return (
    <div className="dg-form-input">
      <label
        htmlFor={props.name}
        className="MuiFormControlLabel-label MuiTypography-body1 MuiFormControlLabel-root"
      >
        {`${props.label}: `}
      </label>
      {props.children ?? (
        <Input ref={wrapper} type={props.type ?? 'text'} name={props.name} />
      )}
    </div>
  )
}

/* <FormControlLabel
  control={
    props.children ?? <Input type={props.type ?? 'text'} name={props.name ?? ''} />
  }
  label={`${props.label}: `}
  labelPlacement="start"
  className={props.className ?? ''}
/> */

class App extends React.Component<{ classes: any }> {
  toBase64 = (file: any): any =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  handleSubmit = async (event: any) => {
    event.preventDefault()
    event.persist()
    //Convert pdf to base64 since Netlify/AWS Lambda doesn't allow binary content
    let base64: any = await this.toBase64(event.target.pdf.files[0])
    let formData = new FormData()
    formData.append('name', event.target.name.value)
    formData.append('email', event.target.email.value)
    formData.append('linkedin', event.target.linkedin.value)
    formData.append('gpa', event.target.gpa.value)
    formData.append('major', event.target.major.value)
    formData.append('standing', event.target.standing.value)
    formData.append('pdf', base64 as Blob)
    const endpoint_url = `${ENDPOINT}/api/file`
    fetch(`${endpoint_url}`, {
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
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
              <LabeledInputGI name="name" label="Name" />
              <LabeledInputGI name="email" label="Email" />
              <LabeledInputGI name="linkedin" label="LinkedIn" />
              <LabeledInputGI label="GPA" name="gpa">
                <Input
                  inputProps={{
                    step: 0.1,
                  }}
                  type="number"
                  name="gpa"
                />
              </LabeledInputGI>
              <LabeledInputGI name="major" label="Major" />
              <LabeledInputGI name="standing" label="Standing" />
              <input type="file" hidden accept="application/pdf" name="pdf" />
              <LabeledInputGI label="Resume" name="pdf">
                <FileInput />
              </LabeledInputGI>
              <Grid item>
                <Input type="submit" />
              </Grid>
            </form>
          </Grid>
        </div>
      </div>
    )
  }
}

// App.propTypes = {
//   classes: PropTypes.object.isRequired,
// }
export default App
