import React from 'react'
import Navbar from '../../components/NavBar'
import Table from '../../components/CartTable'
import PropTypes from 'prop-types'

function App(props) {
  const classes = props.classes
  return (
    <>
      <Navbar enableDrawer={false} classes={classes} />
      <div className={classes.toolbar} />
      <div style={{ justifyContent: 'center' }} className={classes.root}></div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <h1 style={{ textAlign: 'center' }}>Members</h1>
        <Table
          classes={classes}
          data={[
            {
              _id: 1,
              name: 'Mahmud Bouda',
              linkedin: 'http://dummyimage.com/199x136.bmp/dddddd/000000',
              gpa: 1.0,
              major: 'Biomedical Engineering',
              standing: 'Senior',
              resume:
                'https://engineering.utdallas.edu/engineering/files/IPP-Resume-Tips-Samples-2019.pdf',
            },
            {
              _id: 2,
              name: 'Libbi Worman',
              linkedin: 'http://dummyimage.com/217x234.jpg/cc0000/ffffff',
              gpa: 3.7,
              major: 'Other',
              standing: 'Junior',
              resume: 'https://www.mccc.edu/programs/engr_sci_as/pdf/resume.pdf',
            },
            {
              _id: 3,
              name: 'Derry de Broke',
              linkedin: 'http://dummyimage.com/139x182.bmp/dddddd/000000',
              gpa: 1.3,
              major: 'Computer Science',
              standing: 'Freshman',
              resume: 'https://www.mccc.edu/programs/engr_sci_as/pdf/resume.pdf',
            },
            {
              _id: 4,
              name: 'Britni De Ath',
              linkedin: 'http://dummyimage.com/192x114.jpg/cc0000/ffffff',
              gpa: 0.3,
              major: 'Computer Science',
              standing: 'Graduate Student',
              resume:
                'https://engineering.utdallas.edu/engineering/files/IPP-Resume-Tips-Samples-2019.pdf',
            },
            {
              _id: 5,
              name: 'Kimberly Pellett',
              linkedin: 'http://dummyimage.com/248x153.bmp/cc0000/ffffff',
              gpa: 2.8,
              major: 'Computer Engineering',
              standing: 'Senior',
              resume: 'https://www.mccc.edu/programs/engr_sci_as/pdf/resume.pdf',
            },
          ]}
        />
      </main>
    </>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default App
