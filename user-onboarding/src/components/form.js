import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as yup from 'yup'

export default function Form(props) {
   const { submit, errors, disabled, values, change } = props

   const onSubmit = event => {
      event.preventDefault()
      submit()
   }

   const onChange = event => {
      const { name, value, checked, type } = event
      const valueToUse = type === 'checkbox' ? checked : value
      change(name, valueToUse)
   }


   return (
      <form className='form container' onSubmit={onSubmit}>
         <div className='form input'>
            <h2>Add User</h2>
            <label>
               Name
               <span className='name input-box'>
                  <input
                     type='text'
                     value={values.name}
                     onChange={onChange}
                     name='name'
                  />
               </span>
            </label>

            <label>
               Email
               <span className='email input-box'>
                  <input
                     type={'text'}
                     name='email'
                     value={values.email}
                     onChange={onChange}
                  />
               </span>
            </label>

            <label>
               Password
               <span className='password input-box'>
                  <input
                     type={'text'}
                     name='password'
                     value={values.password}
                     onChange={onChange}
                  />
               </span>
            </label>

            <label>
               Confirm Password
               <span className='password input-box'>
                  <input
                     type={'text'}
                     name='confirmPassword'
                     value={values.confirmPassword}
                     onChange={onChange}
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
                     name='terms'
                     checked={values.terms}
                     onChange={onChange}
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