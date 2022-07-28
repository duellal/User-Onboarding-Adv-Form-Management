import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import axios from 'axios'

import Form from './form'
import schema from './formSchema'
import Users from './users'

const initialFormValues = {
   nameFirst: '',
   nameLast: '',
   email: '',
   password: '',
   confirmPassword: '',
   terms: '',
}

const initialFormErrors = {
   nameFirst: '',
   nameLast: '',
   email: '',
   password: '',
   confirmPassword: '',
   terms: ''
}

const initialDisabled = true
const initialUsers = []

function App() {
   const [users, setUsers] = useState(initialUsers)
   const [formValues, setFormValues] = useState(initialFormValues)
   const [errors, setErrors] = useState(initialFormErrors)
   const [disabled, setDisabled] = useState(initialDisabled)

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


   useEffect(() => {
      schema.isValid(formValues).then(valid => {
         setDisabled(!valid)
      })
   }, [formValues])

   const changeInput = (name, value) => {
      yup
         .reach(schema, name)
         .validate(value)
         .then(() => {
            setErrors({ ...errors, [name]: '' })
         })
         .catch(err => {
            setErrors({ ...errors, [name]: err.errors })
         })

      setFormValues({ ...formValues, [name]: value })
   }

   const postNewUser = (newUser) => {
      axios
         .post(`https://reqres.in/api/users`, newUser)
         .then(res => {
            setUsers([...users, res.data.data])
            setFormValues(initialFormValues)
         })
         .catch(err => {
            console.log(err)
         })
   }

   const submitForm = () => {
      const newUser = {
         nameFirst: formValues.nameFirst.trim().toLowerCase(),
         nameLast: formValues.nameLast.trim().toLowerCase(),
         email: formValues.email.trim().toLowerCase(),
         password: formValues.password.trim(),
         terms: formValues.terms
      }
      postNewUser(newUser)
   }

   return (
      <div className='first container'>
         <header><h1>User Onboarding</h1></header>
         <Form
            submit={submitForm}
            disabled={disabled}
            errors={errors}
            change={changeInput}
            values={formValues}
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
      </div>
   );
}

export default App;
