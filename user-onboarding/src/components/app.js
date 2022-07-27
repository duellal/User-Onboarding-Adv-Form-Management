import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import axios from 'axios'

import Form from './form'
import schema from './formSchema'

const initialFormValues = {
   name: '',
   email: '',
   password: '',
   confirmPassword: '',
   terms: '',
}

const initialFormErrors = {
   name: '',
   email: '',
   password: '',
   confirmPassword: '',
   terms: ''
}

const initialDisabled = true
const initialUser = []

function App() {
   const [user, setUser] = useState(initialUser)
   const [formValues, setFormValues] = useState(initialFormValues)
   const [errors, setErrors] = useState(initialFormErrors)
   const [disabled, setDisabled] = useState(initialDisabled)

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
   }

   const postNewUser = (newUser) => {
      axios
         .post()
         .then(res => {
            setUser([...user, res.data])
            setFormValues(initialFormValues)
         })
         .catch(err => {
            console.log(err)
         })
   }

   const submitForm = () => {
      const newUser = {
         name: formValues.name.trim().toLowerCase(),
         email: formValues.email.trim().toLowerCase(),
         password: formValues.password.trim(),
         terms: formValues.terms.trim()
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
      </div>
   );
}

export default App;
