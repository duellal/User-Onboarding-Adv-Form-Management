import React from 'react'

export default function Users({ details }) {
   if (!details) {
      return (
         <h3>Fetching Users...</h3>
      )
   }

   return (
      <div className='user container'>
         <h2>{details.first_name} {details.last_name}</h2>
         <p>Email: {details.email}</p>
         <p>Agreed to Terms? {details.terms}</p>
      </div>
   )

}
