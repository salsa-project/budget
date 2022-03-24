import React  from 'react';

import BudgetSys from './components/BudgetSys';
import './App.css'

function App(){

  return(
    <div style={{width: '100vw'}}>

      <BudgetSys />
      
      <script src="node_modules/eruda/eruda.js"></script>
      <script>eruda.init();</script> 

    </div>
  )

}

export default (App)

