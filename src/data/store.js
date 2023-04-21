import { createStore } from 'redux';

const initialState = {
    ingredientArray: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_OBJECT':
      return {
        ...state,
        ingredientArray: [...state.ingredientArray, action.payload], 
        
      };
    case 'UPDATE_OBJECT':   
      //console.log(action.payload);
      const index = state.ingredientArray.findIndex((item)=>item.id == action.payload.id);
      state.ingredientArray[index] = action.payload;
      //console.log(state.ingredientArray);
      return {
        ...state,
        ingredientArray: state.ingredientArray, 
        
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;