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
         <h2 className='userName'>{details.first_name} {details.last_name}</h2>
         <p className='userEmail'>Email: {details.email}</p>
         <p className='userRole'>Role: {details.role}</p>
         <div className='userTermsDiv'>
            <p className='userTerms question'>Agreed to Terms?</p>
            <p className='userTerms answer'>
               {detailsArr.map(item => {
                  if (item.terms === true) {
                     return 'Yes'
                  }
                  else if (item.terms === false) {
                     return 'No'
                  }
                  else { return 'Unknown' }
               })}
            </p>
         </div>
      </div>
   )

}
