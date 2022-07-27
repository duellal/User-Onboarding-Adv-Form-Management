import * as yup from 'yup'

export default yup.object().shape({
   name: yup.string()
      .min(3, 'Name must be at least 3 characters long')
      .required('Name is required'),

   email: yup.string()
      .email('Enter a valid email')
      .required('Enter an email'),

   password: yup.string()
      .password()
      .required(),

   terms: yup.boolean()
})
