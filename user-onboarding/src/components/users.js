import React from 'react'

export default function Users({ details }) {
   if (!details) {
      return (
         <h3>Fetching Users...</h3>
      )
   }

   const detailsArr = new Array(details)

   return (
      <div className='user container'>
         <h2>{details.first_name} {details.last_name}</h2>
         <p>Email: {details.email}</p>
         <p>Role: {details.role}</p>
         <p>Agreed to Terms?
            <span className='userTerms'>{detailsArr.map(item => {
               if (item.terms === true) {
                  return 'Yes'
               }
               else if (item.terms === false) {
                  return 'No'
               }
               else { return 'Unknown' }
            })}
            </span>
         </p>
      </div>
   )

}
