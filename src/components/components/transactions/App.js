import React, {useState, useEffect}  from 'react';
import Dexie from 'dexie'

import data from '../../../configs/mock-data.json'
import db from '../../../configs/db.js'

function Transactions(){
  const [tableType, setTableType] = useState('expense')
  const [tableData, setTableData] = useState([])
  const [tableDataHtml, setTableDataHtml] = useState('')
  const [btnTransSpec, setBtnTransSpec] = useState({btnInnerText: 'Expenses', color: 'red'})

  useEffect(()=>{
    tableDataHtmlGenerator(tableData)
  }, [tableData])

  const btnTransAllSpecs = [{btnInnerText: 'Expenses', color: '#e33e33'}, {btnInnerText: 'Incomes', color: '#668925'}]

  function handleTransTable(e){
    (btnTransSpec.btnInnerText == 'Expenses') ? setBtnTransSpec(btnTransAllSpecs[1]) : setBtnTransSpec(btnTransAllSpecs[0]);
  }
  
  /***************************/
  async function tableClear(){
    await db.record.clear();
    await db.items.clear();
    await db.category.clear();
    await db.type.clear();
    alert('Table Cleared');
  }
  
  function tableDataHtmlGenerator(data){
    let generatedHtml = data.map((result)=>{
     return (<tr>
              <td>{result.date}</td>
              <td>{result.price}</td>
              <td>{result.description}</td>
              <td>{result.category}</td>
            </tr>)
    })
    setTableDataHtml(generatedHtml)
  }
  
  
    // MANUAL JOINING BETWEEN TABLES
    var all = Dexie.Promise.all;
    function joinRecords (recordsCollection) {
    // Start by getting all records as an array of record objects
    return recordsCollection.toArray(function(records) {
        // Query related properties:
        var rootPromises = records.map(function (record) {
            return db.record.where('parent').anyOf(record.parent || []).toArray()
        });
        var itemsPromises = records.map(function (record) {
            return db.items.where('parent').anyOf(record.parent || []).toArray();
        });
        var categoryPromises = records.map(function (record) {
            return db.category.where('parent').anyOf(record.parent || []).toArray();
        });
        // Await record and items and category queries:
        return all ([
            all(rootPromises),
            all(itemsPromises),
            all(categoryPromises)
        ]).then(function (recordItemsCategory) {
            // Now we have all foreign keys resolved and
            // we can put the results onto the records array
            // before returning it:
            records.forEach(function (record, i) {
                record.date = recordItemsCategory[0][i][0].date;
                record.price = recordItemsCategory[1][i][0].price;
                record.description = recordItemsCategory[1][i][0].description;
                record.category = recordItemsCategory[2][i][0].category;
            });
            return records;
        });
    });
    }
    // Query and join:
    joinRecords(db.type.where('type').anyOf([tableType])).then(function (records) {
      console.log(records);
      setTableData(records)
    }).catch (function (error) {
      alert ("Oops: " + error);
    });
    
  
  return(
    <div id='transactions_container'>

      <h1 id='title'> Transactions</h1>

      <button className='btn btn_trans' style={{background: btnTransSpec.color}} onClick={handleTransTable}>Table : {btnTransSpec.btnInnerText}</button>
      
      <div>
        <button style={{background: 'red'}}onClick={tableClear}>Table Clear</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {/*display transactions in table*/}
          {tableDataHtml}
        </tbody>
      </table>

    </div>
  )

}

export default(Transactions)

