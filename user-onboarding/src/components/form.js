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
      const valueToUse = type === 'checkbox' ? checked : value;
      change(name, valueToUse)
   }


   return (
      <form className='form container' onSubmit={onSubmit}>
         <div className='form input'>
            <h2>Add User</h2>
            <label>
               First Name
               <span className='first-name input-box'>
                  <input
                     type='text'
                     value={values.nameFirst}
                     onChange={onChange}
                     name='nameFirst'
                  />
               </span>
               <div className='error'>{errors.nameFirst}</div>
            </label>

            <label>
               Last Name
               <span className='last-name input-box'>
                  <input
                     type='text'
                     value={values.nameLast}
                     onChange={onChange}
                     name='nameLast'
                  />
               </span>
               <div className='error'>{errors.nameLast}</div>
            </label>

            <label>
               Email
               <span className='email input-box'>
                  <input
                     type='text'
                     name='email'
                     value={values.email}
                     onChange={onChange}
                  />
               </span>
               <div className='error'>{errors.email}</div>
            </label>

            <label>
               Password
               <span className='password input-box'>
                  <input
                     type='text'
                     name='password'
                     value={values.password}
                     onChange={onChange}
                  />
               </span>
               <div className='error'>{errors.password}</div>
            </label>

            <label>
               Confirm Password
               <span className='password input-box'>
                  <input
                     type='text'
                     name='confirmPassword'
                     value={values.confirmPassword}
                     onChange={onChange}
                  />
               </span>
               <div className='error'>{errors.confirmPassword}</div>
            </label>

            <label>
               Terms of Service
               <div className='terms'>
                  <p>
                     Lorem Ipsum...
                  </p>
               </div>
               <span className='terms input-box'>
                  <p>I agree to the terms of service</p>
                  <input
                     type='checkbox'
                     name='terms'
                     checked={values.terms}
                     onChange={onChange}
                  />
               </span>
               <div className='error'>{errors.terms}</div>
            </label>
         </div>

         <div className='submit-button'>
            <button className='submit' disabled={disabled}>Submit</button>
         </div>
      </form>
   )
}