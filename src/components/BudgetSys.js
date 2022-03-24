import React, {useState, useEffect}  from 'react';
import { connect } from "react-redux";

import Dashboard from './components/dashboard/App'
import Transactions from './components/transactions/App'
import Calendar from './components/calendar/App'
import LayerUi from './components/others/LayerUi'
import TransactionForm from './components/transactions/components/TransactionForm/App'
import {actionDisplayLayer, actionDisplayTransactionForm} from '../actions/actionDisplay'

function BudgetSys(props){

  const [transactionLayerFormDisplay, setTransactionLayerFormDisplay] = useState(false)

  function displayTransactionForm(){
    props.dispatchDisplayTransactionForm(!props.uiVisibility.transForm_isVisible)
  }

  useEffect(()=>{
    setTransactionLayerFormDisplay(props.uiVisibility.transForm_isVisible)
  },[props.uiVisibility.transForm_isVisible])


  /********* STYLE ***********/
  let style_transaction_form_display_btn = {
    position: "fixed",
    bottom: '-50px',
    left: '50%',
    padding: '10px 45px 50px',
    color: 'white',
    backgroundColor: (transactionLayerFormDisplay)? '#e33e33':'#668925', /*red:green*/
    borderRadius: '50%',
    fontSize: '20pt',
    transform: 'translateX(-50%)',
    zIndex: '10'
  }
  /********* END STYLE ***********/

  return(
    <div id='app_wrapper'>

      {/* TODO : add drawer*/}

      <Dashboard />
      <Transactions />
      <Calendar />

      <LayerUi />
      <TransactionForm />

        <button id='transaction_form_display_btn' style={style_transaction_form_display_btn} onClick={displayTransactionForm}>{(transactionLayerFormDisplay) ? 'x' : '+'} </button>

    </div>
  )

}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  dispatchDisplayTransactionForm: (state)=> dispatch(actionDisplayTransactionForm(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetSys)

