import * as yup from 'yup'

export default yup.object().shape({
   first_name: yup.string()
      .min(3, 'First name must be at least 3 characters long')
      .required('First name is required'),

   last_name: yup.string()
      .min(3, 'Last name must be at least 2 characters long'),

   email: yup.string()
      .email('Enter a valid email')
      .required('Enter an email'),

   role: yup.string(),

   password: yup.string()
      .required('Enter a password')
      .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
         "Password must contain at least 8 characters, one uppercase, one number and one special case character"),

   confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords do not match')
      .required('Enter above password'),

   terms: yup.boolean()
})
