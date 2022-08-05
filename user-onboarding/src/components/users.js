import React from 'react'

export default function Users({ details }) {
   //If the app can't find the details, it will show this header
   if (!details) {
      return (
         <h3>Fetching Users...</h3>
      )
   }

   //Making an array of the details in order to map over it to change the answer of if the user agreed to the terms of agreement on their card (see line 23-31)
   const detailsArr = new Array(details)

   //Returning "html" for the Users component in order to pass it to the app component
   return (
      <div className={`user container`}>
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
