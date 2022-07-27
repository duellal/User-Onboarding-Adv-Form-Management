import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as yup from 'yup'

export default function Form(props) {
   const { submit, errors, disabled, values, change } = props

   const onSubmit = event => {
      event.preventDefault()
      submit()
   }


   return (
      <form className='form container' onSubmit={onSubmit}>
         <div className='form input'>
            <h2>Add User</h2>
            <label>
               Name
               <span className='name input-box'>
                  <input

                  />
               </span>
            </label>

            <label>
               Email
               <span className='email input-box'>
                  <input

                  />
               </span>
            </label>

            <label>
               Password
               <span className='password input-box'>
                  <input

                  />
               </span>
            </label>

            <label>
               Terms of Service
               <p>
                  Lorem Ipsum...
               </p>
               <span className='terms input-box'>
                  <p>I agree to the terms of service</p>
                  <input
                     type='checkbox'

                  />
               </span>
            </label>
         </div>

         <div className='submit-button'>
            <button className='submit'>Submit</button>
         </div>
      </form>
   )
}