const initState = {
  uiVisibility: {
    layer_isVisible: false,
    transForm_isVisible: false
  }
}

const rootReducer = (state = initState, action)=>{
	switch (action.type) {
    case "display layer form":
      return {
        uiVisibility:{
          ...state.uiVisibility,
          layer_isVisible: action.payload,
          transForm_isVisible: action.payload
        }
      };
    case "display layer":
      return {
        uiVisibility:{
          ...state.uiVisibility,
          layer_isVisible: action.payload
        }
      };
    case "display transaction form":
      return {
        uiVisibility:{
          ...state.uiVisibility,
          transForm_isVisible: action.payload
        }
      };
    default:
      return state;
  }
}

export default(rootReducer)
