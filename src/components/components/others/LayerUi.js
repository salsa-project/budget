import React, {useState, useEffect} from 'react'
import { connect } from "react-redux";

import {actionDisplayLayer, actionDisplayTransactionForm} from './../../../actions/actionDisplay'


function LayerUi(props){
  
  const [layer_isVisible, setLayer_isVisible] = useState(false)

  useEffect(()=>{
    let {uiVisibility} = props;
    for(const key in uiVisibility){
      if (uiVisibility.hasOwnProperty(key)) {
        if(key != 'layer_isVisible'){
          if(uiVisibility[key]){
            if(uiVisibility['layer_isVisible']){
              break;
            }else{
              setLayer_isVisible(true)
              break;
            }
            return;
          }
            setLayer_isVisible(false)
        }
      }
    }
  }, [props.uiVisibility])

  /********** STYLE **********/
  let style_transaction_form_layer = {
    display: (layer_isVisible)? 'block' :'none',
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100vw',
    height: '100vh',
    background: 'rgba(100,100,100, 0.8)',
    zIndex: '5'
  }
  
  return(
    <div style={style_transaction_form_layer}></div>
  )
}

const mapStateToProps = state => ({
  ...state
});
/*
const mapDispatchToProps = dispatch => ({
  dispatchDisplayLayer: (state)=> dispatch(actionDisplayLayer(state)),
  dispatchDisplayTransactionForm: (state)=> dispatch(actionDisplayTransactionForm(state))

})
*/
export default connect(mapStateToProps)(LayerUi)