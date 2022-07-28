import * as yup from 'yup'

export default yup.object().shape({
   nameFirst: yup.string()
      .min(3, 'First name must be at least 3 characters long')
      .required('First name is required'),

   nameLast: yup.string()
      .min(3, 'Last name must be at least 2 characters long'),

   email: yup.string()
      .email('Enter a valid email')
      .required('Enter an email'),

   password: yup.string()
      .required('Enter a password')
      .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
         "Password must contain at least 8 characters, one uppercase, one number and one special case character"),

   confirmPassword: yup.string()
      .required('Enter above password')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),

   terms: yup.boolean()
})
