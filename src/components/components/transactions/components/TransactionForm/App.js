import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import { v1 as uuidv1 } from 'uuid';

import db from '../../../../../configs/db.js'
import {actionDisplayTransactionForm} from '../../../../../actions/actionDisplay'


function TransactionForm(props){
  // States
  const [isFormVisibled, setIsFormVisibled] = useState(false)
  //form datas
  const [date, setDate] = useState(new Date().toISOString().slice(0, -14))
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('food')
  const [type, setType] = useState('expense')

  const categories = {
    income  : ['paycheck', 'savings', 'bonus'],
    expense : ['food', 'health', 'cleaning', 'cloths', 'furniture','utilities', 'transport', 'travel', 'other']
  }
  
  useEffect(()=>{
    // watch store and set FORM visibility
    setIsFormVisibled(props.uiVisibility.transForm_isVisible)
  }, [props.uiVisibility.transForm_isVisible])
  
  // Add New Record
  async function recordInsert(){
    // generate new id
    let parent = uuidv1()
    try{
      await db.record.add({date, parent})
      await db.items.add({price, description, parent})
      await db.type.add({type, parent})
      await db.category.add({category, parent})
    }catch (error) {
      alert(`ERROR: ${error}`)
      console.log(`ERROR: ${error}`);
    }
    // hide form
    props.dispatchDisplayTransactionForm(false)
    // reset inputs
    setPrice('')
    setDescription('')
    setCategory('food')
    setType('expense')
  }

  /*******************STYLE********************/
  let style_form = {
    display: (isFormVisibled)? 'block' :'none',
    position: 'absolute',
    top: '10%',
    left: '5%',
    width: '90%',
    padding: '8px 10px 0px',
    background: 'white',
    border: '1px lightgray solid',
    borderRadius: '8px',
    zIndex: '15'
  }
  let style_h1= {
    color: 'gray',
    textAlign: 'center',
    fontSize: '20pt'
  }
  let style_form_inputs = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
  let style_input_container = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    padding: '5px',
  }
  let style_label = {
    margin: '5px 0px 0px'
  }
  let style_input={
    width: '100%',
    padding: '8px',
    borderBottom: '1px lightgray solid',
    textAlign: 'center'
  }
  let styleAddBtn = {
    width: '100%',
    padding: '10px 0px',
    margin: '10px 0px 0px',
    background: 'lightgray',
    borderTopRightRadius: '8px',
    borderTopLeftRadius: '8px',
  }
  /********** END STYLE **********/


  return(
    <div>
        <div id='transaction_form' style={style_form}>

          <h1 style={style_h1}>Add Record</h1>

          <div id='transaction_form_inputs' style={style_form_inputs}>
            <div style={style_input_container}>
              <label for='date' style={style_label}>Date</label>
              <input id='date' style={style_input} name='date' type='date' onChange={e=> setDate(e.target.value)} value={date} />
            </div>
            <div style={style_input_container}>
              <label for='price' style={style_label}>Price</label>
              <input id='price' style={style_input} name='price' type='text' onChange={e=> setPrice(e.target.value)} placeholder='120 DA' value={price} />
            </div>
            <div style={style_input_container}>
              <label for='description' style={style_label}>Description</label>
              <input id='description' style={style_input} name='description' type='text' onChange={e=> setDescription(e.target.value)} placeholder='chawarma' value={description} />
            </div>
            <div style={style_input_container}>
              <label for='category' style={style_label}>Category</label>
              <select name="category" id="category" style={style_input} onChange={e=> setCategory(e.target.value)} value={category} >
                {/*generating categories list*/}
                {categories[type].map(el=>{
                   return <option value={el}>{el}</option>
                  })
                }
              </select>
            </div>
            <div style={style_input_container}>
              <label for='type' style={style_label}>Type</label>
              <select name="type" id="type" style={style_input} onChange={e=> setType(e.target.value)} value={type} >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <button id='transaction_add_record' style={styleAddBtn} onClick={recordInsert}>ADD</button>

        </div>

    </div>
  )
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  dispatchDisplayTransactionForm: (state)=> dispatch(actionDisplayTransactionForm(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm)
