import { createStore } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
    cart: {
      ids: [],
      numInCart: 0
    },
    data: {
      data: [],
      tableData: [],
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
  }
export default  function initializeStore(initialState) {
    return createStore(rootReducer, initialState, composeWithDevTools());
}
