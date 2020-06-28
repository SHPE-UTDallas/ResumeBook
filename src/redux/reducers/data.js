import {
  STORE_DATA_FROM_API,
  ADD_FILTER,
  REMOVE_FILTER,
  INCREASE_GPA,
  DECREASE_GPA,
  SORT_TABLE,
  TOGGLE_DRAWER
} from '../actionTypes'

/*TODO:
Fix mapping of 'Graduate Student' => grad and make the mappings for majors more intuitive/fast (Map structure? extra data but faster runtime than doing string splitting)
*/
const initialState = {
  data: [],
  tableData: [],
  mobileOpen: false,
  sort: {
    category: 'standing',
    direction: 'asc'
  },
  passingTags: {
    gpa: {
      min: 0
    },
    standing: {
      grad: true,
      senior: true,
      junior: true,
      sophomore: true,
      freshman: true
    },
    major: {
      be: true,
      ce: true,
      cs: true,
      ee: true,
      me: true,
      se: true,
      other: true
    }
  }
}
//Filter algorithm from: https://medium.com/better-programming/creating-a-multi-filter-function-to-filter-out-multiple-attributes-javascript-react-rails-5aad8e272142
const newTable = (state, filter, category) => {
  const collectedTrueKeys = {
    major: [],
    standing: []
  }
  const { gpa, major, standing } = state.passingTags
  if (category === 'major') {
    major[filter] = !major[filter]
  } else if (category === 'standing') {
    standing[filter] = !standing[filter]
  } else if (category === 'gpa') {
    gpa.min = filter
  }
  for (let majorKey in major) {
    if (major[majorKey]) collectedTrueKeys.major.push(majorKey)
  }
  for (let standingKey in standing) {
    if (standing[standingKey]) collectedTrueKeys.standing.push(standingKey)
  }
  return multiPropsFilter(gpa, [...state.data], collectedTrueKeys)
}
const multiPropsFilter = (gpa, products, filters) => {
  const filterKeys = Object.keys(filters)
  return products.filter(product => {
    return filterKeys.every(key => {
      let str = product[key].split(' ')
      if (str.length > 1) {
        if (str[0] === 'Graduate')
          //Will be fixed/mapped better in a later version
          str = 'grad'
        else str = (str[0].charAt(0) + str[1].charAt(0)).toLowerCase()
      } else {
        str = str[0].toLowerCase()
      }
      return filters[key].includes(str) && product.gpa >= gpa.min
    })
  })
}
const updateTable = (state, filter, category) => {
  return state.tableData.filter(product => {
    if (category !== 'gpa') {
      let str = product[category].split(' ')
      if (str.length > 1) {
        if (str[0] === 'Graduate')
          //Will be fixed/mapped better in a later version
          str = 'grad'
        else str = (str[0].charAt(0) + str[1].charAt(0)).toLowerCase()
      } else {
        str = str[0].toLowerCase()
      }
      return str !== filter
    } else {
      return product.gpa >= filter
    }
  })
}

//Reference: https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
const compareValues = (category, order = 'asc') => {
  let myMap = new Map()
  if (category === 'standing') {
    myMap.set('Graduate Student', 0)
    myMap.set('Senior', 1)
    myMap.set('Junior', 2)
    myMap.set('Sophomore', 3)
    myMap.set('Freshman', 4)
  } else {
    myMap.set('Biomedical Engineering', 0)
    myMap.set('Computer Engineering', 1)
    myMap.set('Computer Science', 2)
    myMap.set('Electrical Engineering', 3)
    myMap.set('Mechanical Engineering', 4)
    myMap.set('Software Engineering', 5)
    myMap.set('Other', 6)
  }
  return function innerSort (obj1, obj2) {
    let varA = myMap.get(obj1[category])
    let varB = myMap.get(obj2[category])
    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return order === 'desc' ? comparison * -1 : comparison
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_DATA_FROM_API: {
      const { data } = action.payload
      return {
        ...state,
        data: data,
        tableData: data.sort(
          compareValues(state.sort.category, state.sort.direction)
        )
      }
    }

    case ADD_FILTER: {
      const { category, filter } = action.payload
      return {
        ...state,
        passingTags: {
          ...state.passingTags,
          [category]: {
            ...state.passingTags[category],
            [filter]: !state.passingTags[category][filter]
          }
        },
        tableData: newTable({ ...state }, filter, category).sort(
          compareValues(state.sort.category, state.sort.direction)
        )
      }
    }
    case REMOVE_FILTER: {
      const { category, filter } = action.payload
      return {
        ...state,
        passingTags: {
          ...state.passingTags,
          [category]: {
            ...state.passingTags[category],
            [filter]: !state.passingTags[category][filter]
          }
        },
        tableData: updateTable({ ...state }, filter, category)
      }
    }
    case INCREASE_GPA: {
      const { num } = action.payload
      return {
        ...state,
        passingTags: {
          ...state.passingTags,
          gpa: {
            min: num
          }
        },
        tableData: updateTable({ ...state }, num, 'gpa')
      }
    }
    case DECREASE_GPA: {
      const { num } = action.payload
      return {
        ...state,
        passingTags: {
          ...state.passingTags,
          gpa: {
            min: num
          }
        },
        tableData: newTable({ ...state }, num, 'gpa')
      }
    }
    case SORT_TABLE: {
      const { category, direction } = action.payload
      return {
        ...state,
        sort: {
          category: category,
          direction: direction
        },
        tableData: [...state.tableData].sort(compareValues(category, direction))
      }
    }
    case TOGGLE_DRAWER: {
      return {
        ...state,
        mobileOpen: !state.mobileOpen
      }
    }
    default:
      return state
  }
}
