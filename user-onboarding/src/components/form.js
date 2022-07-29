import React from 'react'

export default function Form(props) {
   const { submit, errors, disabled, values, change } = props

   const onSubmit = event => {
      event.preventDefault()
      submit()
   }

   const onChange = event => {
      const { name, value, checked, type } = event.target
      const valueToUse = type === 'checkbox' ? checked : value;
      change(name, valueToUse)
   }

   return (
      <form className='form container' onSubmit={onSubmit}>
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
                     />
                  </div>
                  <div className='error'>{errors.first_name}</div>
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
                     />
                  </div>
                  <div className='error'>{errors.last_name}</div>
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
                     />
                  </div>
                  <div className='error'>{errors.email}</div>
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
                     >
                        <option value=''>Select Role</option>
                        <option value='Back End Developer'>Back End Developer</option>
                        <option value='Data Scientist'>Data Scientist</option>
                        <option value='Front End Developer'>Front End Developer</option>
                        <option value='Team Lead'>Team Lead</option>
                        <option value='UX Designer'>UX Designer</option>
                     </select>
                  </div>
                  <div className='error'>{errors.role}</div>
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
                     />
                  </div>
                  <div className='error'>{errors.password}</div>
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
                     />
                  </div>
                  <div className='error'>{errors.confirmPassword}</div>
               </label>
            </div>
         </div>

         <div className='formTerms'>
            <h3>Terms of Service</h3>
            <div className='terms'>
               <p>
                  Lorem Ipsum...
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
                     />
                  </label>
               </div>
               <p>I agree to the terms of service</p>
            </div>
            <div className='error'>{errors.terms}</div>
         </div>


         <div className='submit-button'>
            <button className='submit' disabled={disabled}>Submit</button>
         </div>
      </form>
   )
}