import {
  STORE_DATA_FROM_API,
  ADD_FILTER,
  REMOVE_FILTER,
  INCREASE_GPA,
  DECREASE_GPA,
  SORT_TABLE,
  FILTER_NAME_ADD,
  FILTER_NAME_DEL,
  TOGGLE_DRAWER,
} from '../actionTypes'

const initialState = {
  data: [],
  tableData: [],
  toggleTheme: false,
  mobileOpen: false,
  sort: {
    category: 'standing',
    direction: 'asc',
  },
  currentFilterOptions: {
    nameFilter: '',
    gpa: {
      min: 0,
    },
    standing: {
      'Graduate Student': true,
      Senior: true,
      Junior: true,
      Sophomore: true,
      Freshman: true,
    },
    major: {
      'Biomedical Engineering': true,
      'Computer Engineering': true,
      'Computer Science': true,
      'Electrical Engineering': true,
      'Mechanical Engineering': true,
      'Software Engineering': true,
      other: true,
    },
  },
}
/* Helper object */
let comparisonObj = {
  'Graduate Student': 0,
  Senior: 1,
  Junior: 2,
  Sophomore: 3,
  Freshman: 4,
  'Biomedical Engineering': 0,
  'Computer Engineering': 1,
  'Computer Science': 2,
  'Electrical Engineering': 3,
  'Mechanical Engineering': 4,
  'Software Engineering': 5,
  Other: 6,
}

/*-----------------Utility Functions-----------------------*/
const newTable = (state) => {
  return state.data.filter((entry) => {
    const { currentFilterOptions } = state
    const { major, standing } = entry

    //If the gpa doesn't match the filter, remove that entry
    if (entry.gpa < currentFilterOptions.gpa.min) return false

    //If the standing doesn't match the filters, remove that entry
    if (!currentFilterOptions.standing[standing]) return false

    //If their major is false (i.e. Computer Science or another pre-defined major) or if other is false and their major isn't already defined(comp sci, mech eng, ee, etc. => a major like ITS that isn't already listed), then remove it
    if (
      currentFilterOptions.major[major] === false ||
      (currentFilterOptions.major.other === false &&
        currentFilterOptions.major[major] === undefined)
    )
      return false
    //Checks if the entry matches our 4 filtering options: major, standing, gpa, and the search bar filter (nameFilter)
    return entry.name.toLowerCase().includes(currentFilterOptions.nameFilter)
  })
}

const updateTable = (state, filter, category) => {
  //state - current state
  //filter - specific filter like junior, senior, biomedical engineering, etc.
  //category - major, standing, gpa
  const { major } = state.currentFilterOptions
  return state.tableData.filter((entry) => {
    if (category !== 'gpa') {
      let str = entry[category]
      return str !== filter && (filter !== 'other' || major[str] !== undefined)
    } else {
      return entry.gpa >= filter
    }
  })
}

//Uses the comparisonObj to allow us to sort by Major and Standing
const compareValues = (category, order = 'asc') => {
  return (obj1, obj2) => {
    let varA = comparisonObj[obj1[category]]
    let varB = comparisonObj[obj2[category]]
    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return order === 'desc' ? comparison * -1 : comparison
  }
}

//function to filter by name
const filterByNames = (searchQuery, entry) => {
  const name = entry.name.toLowerCase()
  return name.includes(searchQuery)
}

/*----------------Reducers-------------------------------*/
export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_DATA_FROM_API: {
      const { data } = action.payload
      return {
        ...state,
        data: data,
        tableData: data.sort(compareValues(state.sort.category, state.sort.direction)),
      }
    }

    case ADD_FILTER: {
      const { category, filter } = action.payload
      const newState = {
        ...state,
        currentFilterOptions: {
          ...state.currentFilterOptions,
          [category]: {
            ...state.currentFilterOptions[category],
            [filter]: !state.currentFilterOptions[category][filter],
          },
        },
      }
      newState.tableData = newTable(newState)
      return newState
    }
    case REMOVE_FILTER: {
      const { category, filter } = action.payload
      return {
        ...state,
        currentFilterOptions: {
          ...state.currentFilterOptions,
          [category]: {
            ...state.currentFilterOptions[category],
            [filter]: !state.currentFilterOptions[category][filter],
          },
        },
        tableData: updateTable({ ...state }, filter, category),
      }
    }
    case INCREASE_GPA: {
      const { num } = action.payload
      return {
        ...state,
        currentFilterOptions: {
          ...state.currentFilterOptions,
          gpa: {
            min: num,
          },
        },
        tableData: updateTable({ ...state }, num, 'gpa'),
      }
    }
    case DECREASE_GPA: {
      const { num } = action.payload
      const newState = {
        ...state,
        currentFilterOptions: {
          ...state.currentFilterOptions,
          gpa: {
            min: num,
          },
        },
      }
      newState.tableData = newTable(newState)
      return newState
    }

    case SORT_TABLE: {
      const { category, direction } = action.payload
      return {
        ...state,
        sort: {
          category: category,
          direction: direction,
        },
        tableData: [...state.tableData].sort(compareValues(category, direction)),
      }
    }

    case FILTER_NAME_ADD: {
      let { search } = action.payload
      search = search.toLowerCase()
      return {
        ...state,
        currentFilterOptions: {
          ...state.currentFilterOptions,
          nameFilter: search,
        },
        tableData: [...state.tableData].filter((entry) => filterByNames(search, entry)),
      }
    }

    case FILTER_NAME_DEL: {
      let { search } = action.payload
      search = search.toLowerCase()
      const newState = {
        ...state,
        currentFilterOptions: {
          ...state.currentFilterOptions,
          nameFilter: search,
        },
      }
      newState.tableData = newTable(newState)
      return newState
    }

    case TOGGLE_DRAWER: {
      return {
        ...state,
        mobileOpen: !state.mobileOpen,
      }
    }
    default:
      return state
  }
}
