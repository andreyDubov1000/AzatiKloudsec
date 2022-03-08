import { ButtonSimple, InputField } from '@component/elements'
import { Formik, Form, FormikErrors } from 'formik'
import React from 'react'
import * as yup from 'yup'
import PasswordPattern from './PasswordPattern'

export interface SignupFormProps {}

const MySignupForm: React.FC<SignupFormProps> = () => {
  const handleFormSubmit = (values: any) => {
    console.log(values)
  }

  const initialValues = {
    full_name: '',
    email: '',
    passwordConfirmation: '',
    password: '',
  }
  const descriptions = [
    ' Must contain at least one upperCase character',
    ' Must contain at least one lowerCase character',
    ' Must contain at least one digits character',
    ' Must contain at least one special simbol character',
    ' Must contain 14 characters as min',
  ]

  const formSchema = yup.object().shape({
    full_name: yup.string().required('Required.'),
    password: yup
      .string()
      .matches(/[A-Z]/, descriptions[0])
      .matches(/[a-z]/, descriptions[1])
      .matches(/\d/, descriptions[2])
      .matches(/[<>{}"/|;:.,~!?@#$%^=&*\]()\/\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©_+]/, descriptions[3])
      .min(14, descriptions[4])
      .required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  })

  function ValidateSchema<FormState extends object>(
    // in case multipal errors messages, it should be taken into account that the function will return array of strings (errors messages)

    schema: yup.ObjectSchema<any>
  ): (values: FormState) => Promise<FormikErrors<FormState>> {
    return async function (values: FormState): Promise<FormikErrors<FormState>> {
      try {
        await schema.validate(values, { abortEarly: false, strict: false })
        return Promise.resolve({})
      } catch (errorObj) {
        const error = errorObj as yup.ValidationError
        return error.inner.reduce((commonValidationError, { path, message }) => {
          if (typeof path !== 'undefined') {
            return {
              ...commonValidationError,
              [path]: ((commonValidationError[path as keyof FormState] as string | string[]) || []).concat(`${message}`),
            }
          }
          return { ...commonValidationError }
        }, {} as FormikErrors<FormState>)
      }
    }
  }

  return (
    <Formik initialValues={initialValues} validate={ValidateSchema(formSchema)} onSubmit={handleFormSubmit}>
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <InputField
            name='full_name'
            placeholder='Full Name'
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.full_name || ''}
            isError={!!touched.full_name && !!errors.full_name}
            helperText={touched.full_name && errors.full_name}
          />
          <InputField
            name='email'
            type='email'
            placeholder='Email'
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email || ''}
            isError={!!touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          />
          <InputField
            name='password'
            type='password'
            placeholder='Password'
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password || ''}
            isError={!!touched.password && !!errors.password}
            visibilityIcon
          />
          <PasswordPattern descriptions={descriptions} value={values.password || ''} errors={errors.password} />

          <InputField
            name='passwordConfirmation'
            type='password'
            placeholder='Confirm password'
            onBlur={handleBlur}
            onChange={handleChange}
            visibilityIcon
            value={values.passwordConfirmation || ''}
            isError={!!touched.passwordConfirmation && !!errors.passwordConfirmation}
            helperText={touched.passwordConfirmation && errors.passwordConfirmation}
          />

          <ButtonSimple type='submit' disabled={isSubmitting}>
            Create Account
          </ButtonSimple>
        </Form>
      )}
    </Formik>
  )
}

export default MySignupForm
