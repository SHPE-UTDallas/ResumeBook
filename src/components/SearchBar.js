import TextField from '@material-ui/core/TextField'
import { filterNameAdd, filterNameDel } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

function SearchBar(props) {
  const search = useSelector((state) => state.data.search)
  const dispatch = useDispatch()

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={search}
        margin="dense"
        className={props.classes.searchBar}
        onChange={(e) => {
          const updatedSearch = e.target.value
          updatedSearch.length > search.length
            ? dispatch(filterNameAdd(updatedSearch))
            : dispatch(filterNameDel(updatedSearch))
        }}
      />
    </div>
  )
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default SearchBar
