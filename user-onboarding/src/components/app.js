import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import axios from 'axios'

import Form from './form'
import formSchema from './formSchema'
import Users from './users'

const initialFormValues = {
   first_name: '',
   last_name: '',
   email: '',
   role: '',
   password: '',
   confirmPassword: '',
   terms: false
}

const initialFormErrors = {
   first_name: '',
   last_name: '',
   email: '',
   role: '',
   password: '',
   confirmPassword: '',
   terms: false
}

const initialDisabled = true
const initialUsers = []

function App() {
   const [users, setUsers] = useState(initialUsers)
   const [formValues, setFormValues] = useState(initialFormValues)
   const [errors, setErrors] = useState(initialFormErrors)
   const [disabled, setDisabled] = useState(initialDisabled)
   const [dupEmailErr, setDupEmailErr] = useState()

   //Getting the users from the backend api and putting it into an array of objects
   const getUsers = () => {
      axios
         .get(`https://reqres.in/api/users`)
         .then(res => {
            setUsers(res.data.data)
         })
         .catch(err => {
            console.log(err)
         })
   }

   useEffect(() => {
      getUsers()
   }, [])

   //once all the values of the form is entered, the boolean goes from false -> true in order to make the submit button active or not
   useEffect(() => {
      formSchema.isValid(formValues).then(valid => {
         setDisabled(!valid)
      })
   }, [formValues])

   //When there is change in the input, yup looks at what is needed and will throw an error if what is required is not met - this also resets the errors once the condition is met
   const changeInput = (name, value) => {
      yup
         .reach(formSchema, name)
         .validate(value)
         .then(() => {
            setErrors({ ...errors, [name]: '' })
         })
         .catch(err => {
            setErrors({ ...errors, [name]: err.errors })
         })

      setFormValues({ ...formValues, [name]: value })
      setDupEmailErr()
   }

   //this function adds the new user to the backend api once the user hits sumbit
   const postNewUser = (newUser) => {
      axios
         .post(`https://reqres.in/api/users`, newUser)
         .then(res => {
            setUsers([res.data, ...users])
         })
         .finally(setFormValues(initialFormValues))
         .catch(err => {
            console.log(err)
         })
   }

   //This function gets the form values from the form and creates a new user only if the email is not a duplicate email - if the email is a duplicate, then this function returns the error
   const submitForm = event => {
      event.preventDefault()

      const newUser = {
         first_name: formValues.first_name.trim(),
         last_name: formValues.last_name.trim(),
         email: formValues.email.trim().toLowerCase(),
         role: formValues.role.trim(),
         password: formValues.password.trim(),
         confirmPassword: formValues.confirmPassword.trim(),
         terms: formValues.terms
      }

      for (let i = 0; i < users.length; i++) {
         if (newUser.email === users[i].email) {
            const emailErr = 'That email already exists, please enter a new email'

            setDupEmailErr(emailErr)

            return dupEmailErr
         }
         else (postNewUser(newUser))
      }
      return dupEmailErr
   }

   //This returns the "html" for the app, along with passing props to the Form and Users components
   return (
      <div className='first container'>
         <header><h1>User Onboarding</h1></header>
         <Form
            submit={submitForm}
            disabled={disabled}
            errors={errors}
            change={changeInput}
            values={formValues}
            duplicateErr={dupEmailErr}
         />

         <div className='user-container container'>
            {
               users.map(elem => {
                  return (
                     <Users key={elem.id} details={elem} />
                  )
               })
            }
         </div>
      </div >
   );
}

export default App;
