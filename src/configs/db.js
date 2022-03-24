import Dexie from 'dexie'

const db = new Dexie('BudgetSys');

db.version(1).stores({
  //  wallet     : "++id, name",
  record     : "++id, date, parent",
  items      : "++id, price, description, parent",
  type       : "++id, type, parent",
  category   : "++id, category, parent"
})

/*db.open().catch((err=>{
  console.log(err.stack || err)
}))
*/
/*setTimeout(()=>{
  alert('timer is running')
   db.items.add({
      price: 120,
      description: 'wdfd'
   })

}, 2000)
*/
export default(db)
