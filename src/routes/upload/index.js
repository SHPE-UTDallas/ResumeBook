import React from 'react'
import { Grid, FormControlLabel, Input } from '@material-ui/core'
import NavBar from '../../components/NavBar'
import { ENDPOINT } from '../../utils/config'

class App extends React.Component {
  toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })

  handleSubmit = async event => {
    event.preventDefault()
    event.persist()
    //Convert pdf to base64 since Netlify/AWS Lambda doesn't allow binary content
    let base64 = await this.toBase64(event.target.pdf.files[0])
    let formData = new FormData()
    formData.append('name', event.target.name.value)
    formData.append('email', event.target.email.value)
    formData.append('linkedin', event.target.linkedin.value)
    formData.append('gpa', event.target.gpa.value)
    formData.append('major', event.target.major.value)
    formData.append('standing', event.target.standing.value)
    formData.append('pdf', base64)
    const endpoint_url = `${ENDPOINT}/api/file`
    fetch(`${endpoint_url}`, {
      method: 'POST',
      body: formData
    })
  }

  render () {
    const classes = this.props.classes
    return (
      <div className={classes.root}>
        <NavBar enableDrawer={false} classes={classes} />
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Grid
            container
            alignItems='center'
            direction='column'
            justify='center'
          >
            <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
              <Grid item>
                <FormControlLabel
                  className={classes.formEntry}
                  control={<Input type='text' name='name' />}
                  label='Name:'
                  labelPlacement='start'
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  className={classes.formEntry}
                  control={<Input type='email' name='email' />}
                  label='Email:'
                  labelPlacement='start'
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  className={classes.formEntry}
                  control={<Input type='text' name='linkedin' />}
                  label='LinkedIn:'
                  labelPlacement='start'
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  className={classes.formEntry}
                  control={<Input step='0.1' type='number' name='gpa' />}
                  label='GPA:'
                  labelPlacement='start'
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  className={classes.formEntry}
                  control={<Input type='text' name='major' />}
                  label='Major:'
                  labelPlacement='start'
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  className={classes.formEntry}
                  control={<Input type='text' name='standing' />}
                  label='Standing:'
                  labelPlacement='start'
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  className={classes.formEntry}
                  control={
                    <Input type='file' name='pdf' accept='application/pdf' />
                  }
                  label='PDF:'
                  labelPlacement='start'
                />
              </Grid>
              <Grid item>
                <Input type='submit' />
              </Grid>
            </form>
          </Grid>
        </div>
      </div>
    )
  }
}

export default App
