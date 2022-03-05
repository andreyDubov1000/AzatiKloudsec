import { ButtonSimple, InputField } from '@component/elements'
import { Formik, Form, FormikErrors } from 'formik'
import { ReactComponent as IconError } from 'assets/icons/IconsError.svg'
import { ReactComponent as IconNoneError } from 'assets/icons/IconsErrorNone.svg'
import React from 'react'
import styles from './PasswordValidShema.module.scss'

import * as yup from 'yup'

export interface SignupFormProps {}

const MySignupForm: React.FC<SignupFormProps> = () => {
  const handleFormSubmit = async (values: any) => {
    console.log(values)
  }

  const initialValues = {
    full_name: '',
    email: '',
    mobile_phone_number: '',
    password: '',
  }
  const descriptions = [
    ' Must contain at least one upperCase character.',
    ' Must contain at least one lowerCase character.',
    ' Must contain at least one digits character.',
    ' Must contain at least one special simbol character.',
    ' Must contain 14 characters as min.',
  ]

  const formSchema = yup.object().shape({
    full_name: yup.string().required('Required.'),
    password: yup
      .string()
      .matches(/[A-Z]/, descriptions[0])
      .matches(/[a-z]/, descriptions[1])
      .matches(/\d/, descriptions[2])
      .matches(/[@$!%*#?&`(){}[\]\//^;:'",.]/, descriptions[3])
      .min(14, descriptions[4])
      .required('required.'),
    email: yup.string().email('Invalid email.').required('Required.'),
    mobile_phone_number: yup.string().required('Required.'),
  })

  function asyncValidateSchema<FormState extends object>(
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

  const StrengthClass = (value: string) => {
    const Strength = ['', 'Weak', 'Fair', 'Good', 'Strong']
    return Strength[value.length % 5].trim()
  }

  const checkDescription = (description: string, value: string | string[] | undefined) => {
    return value ? value.includes(description) : true
  }

  return (
    <Formik initialValues={initialValues} validate={asyncValidateSchema(formSchema)} onSubmit={handleFormSubmit}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form>
          <InputField
            name='full_name'
            placeholder='Full Name'
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.full_name || ''}
            error={!!touched.full_name && !!errors.full_name}
            helperText={touched.full_name && errors.full_name}
          />
          <InputField
            name='email'
            type='email'
            placeholder='Email'
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email || ''}
            error={!!touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          />
          <InputField
            name='password'
            type='password'
            placeholder='Password'
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password || ''}
            error={!!touched.password && !!errors.password}
            helperText={touched.password && errors.password}
            visibilityIcon
          />
          <div className={styles.password_pattern}>
            <div className={styles.strength}>
              <div className={`${styles.bars} ${styles[StrengthClass(values.password)]}`}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={`${styles.label} ${styles[StrengthClass(values.password)]}`}>
                <span>Password Strength:</span>
                <span>{StrengthClass(values.password) || 'Very Weak'}</span>
              </div>
              <div className={styles.description}>
                {descriptions.map((desc) => (
                  <div key={desc}>
                    {checkDescription(desc, errors.password) ? <IconError /> : <IconNoneError />}
                    <span>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <InputField
            name='mobile_phone_number'
            placeholder='+33XXXXXXXXX'
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.mobile_phone_number || ''}
            error={!!touched.mobile_phone_number && !!errors.mobile_phone_number}
            helperText={touched.mobile_phone_number && errors.mobile_phone_number}
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
