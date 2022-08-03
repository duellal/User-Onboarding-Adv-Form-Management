import React from 'react'
import { termsText1, termsText2, termsText3, termsText4, termsText5 } from './termsText'

export default function Form(props) {
   const { submit, errors, disabled,
      values, change, duplicateErr } = props

   //This checks for the name and value of what is being changed
   const onChange = event => {
      const { name, value, checked, type } = event.target
      //This allows the checkbox to be clicked on and off
      const valueToUse = type === 'checkbox' ? checked : value;
      change(name, valueToUse)
   }

   //'HTML' for the form component
   return (
      <form className='form container' onSubmit={submit}>
         <h2>Add User</h2>
         <div className='name'>
            <div className='first-name'>
               <label>
                  First Name
                  <div className='input-box'>
                     <input
                        type='text'
                        value={values.first_name}
                        onChange={onChange}
                        name='first_name'
                        id='firstName'
                     />
                  </div>
                  <div className='error-first'>{errors.first_name}</div>
               </label>
            </div>

            <div className='last-name'>
               <label>
                  Last Name
                  <div className='input-box'>
                     <input
                        type='text'
                        value={values.last_name}
                        onChange={onChange}
                        name='last_name'
                        id='lastName'
                     />
                  </div>
                  <div className='error-last'>{errors.last_name}</div>
               </label>
            </div>
         </div>

         <div className='email-role'>
            <div className='email'>
               <label>
                  Email
                  <div className='input-box'>
                     <input
                        type='text'
                        name='email'
                        value={values.email}
                        onChange={onChange}
                        id='email'
                     />
                  </div>
                  <div className='error-email'>
                     {errors.email}
                     {duplicateErr}
                  </div>

               </label>
            </div>

            <div className='role'>
               <label>
                  Role
                  <div className='input-box'>
                     <select
                        name='role'
                        value={values.role}
                        onChange={onChange}
                        id='role'
                     >
                        <option value=''>Select Role</option>
                        <option value='Back End Developer'>Back End Developer</option>
                        <option value='Data Scientist'>Data Scientist</option>
                        <option value='Front End Developer'>Front End Developer</option>
                        <option value='Team Lead'>Team Lead</option>
                        <option value='UX Designer'>UX Designer</option>
                     </select>
                  </div>
                  <div className='error-role'>{errors.role}</div>
               </label>
            </div>
         </div>

         <div className='password-confirm'>
            <div className='password'>
               <label>
                  Password
                  <div className='input-box'>
                     <input
                        type='text'
                        name='password'
                        value={values.password}
                        onChange={onChange}
                        id='password'
                     />
                  </div>
                  <div className='error-pw'>{errors.password}</div>
               </label>
            </div>

            <div className='password'>
               <label>
                  Confirm Password
                  <div className='input-box'>
                     <input
                        type='text'
                        name='confirmPassword'
                        value={values.confirmPassword}
                        onChange={onChange}
                        id='confirmPassword'
                     />
                  </div>
                  <div className='error-confirmPw'>{errors.confirmPassword}</div>
               </label>
            </div>
         </div>

         <div className='formTerms'>
            <h3>Terms of Service</h3>
            <div className='terms'>
               <p>
                  {termsText1}
               </p>
               <p>
                  {termsText2}
               </p>
               <p>
                  {termsText3}
               </p>
               <p>
                  {termsText4}
               </p>
               <p>
                  {termsText5}
               </p>
            </div>
            <div className='checkbox input-box'>
               <div className='box'>
                  <label>
                     <input
                        type='checkbox'
                        name='terms'
                        checked={values.terms}
                        onChange={onChange}
                        id='terms'
                     />
                  </label>
               </div>
               <p>I agree to the terms of service</p>
            </div>
            <div className='error-terms'>{errors.terms}</div>
         </div>


         <div className='submit-button'>
            <button className='submit' disabled={disabled}>Submit</button>
         </div>
      </form>
   )
}