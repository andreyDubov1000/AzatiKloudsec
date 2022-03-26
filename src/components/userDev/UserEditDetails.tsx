import { ButtonSimple, InputField, ModalPopUp } from '@component/elements'
import { Formik, Form } from 'formik'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import styles from './UserEditDetails.module.scss'
import classNames from 'classnames'
import ScrollBar from 'react-perfect-scrollbar'
import PageTitle from '@component/atoms/PageTitle'
import { useStateSafe } from '@component/incidentsDev/hooks/useStateSafe'
import { ValidateSchema } from '@component/elements/PasswordPattern/MySignupForm'
import PasswordPattern from '@component/elements/PasswordPattern/PasswordPattern'
import RouteLeavingGuard from '@component/incidentsDev/RouteLeavingGuard'
import { useAppSelector } from '@redux/hooks'

interface UserEditDetailsPropType {}

const UserEditDetails: React.FC<UserEditDetailsPropType> = () => {
  const [loading, setLoading] = useStateSafe(true)
  const [pageBlocked, setPageBlocked] = useState(false)
  const [waitMail, setWaitMail] = useState<{ modal: boolean; email: string }>({ modal: false, email: '' })
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null)
  const { user } = useAppSelector((store) => store.auth)

  const refPhoto = useRef<HTMLDivElement>(null)
  const MAX_IMG_SIZE = 512000
  const SUPPORTED_IMG_FORMATS = ['image/jpeg', 'image/png']
  const buttonModal = [
    {
      title: 'Ok',
      handler: () => {
        setWaitMail((state) => ({ ...state, modal: false }))
      },
    },
  ]
  const initialValues = {
    img_file: null,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    new_password: '',
    passwordConfirmation: '',
  }

  const errorDescriptions = {
    fileSize: ' The file is too large',
    fileType: ' Unsupported file type',
    upperCase: ' Must contain at least one upperCase character',
    lowerCase: ' Must contain at least one lowerCase character',
    digits: ' Must contain at least one digits character',
    simbol: ' Must contain at least one special simbol character',
    min: ' Must contain 14 characters as min',
    invalid: ' Invalid email',
    passwordMatch: ' Passwords must match',
    required: ' Required',
  }

  const errorsPaswordArray = [
    errorDescriptions.upperCase,
    errorDescriptions.lowerCase,
    errorDescriptions.digits,
    errorDescriptions.simbol,
    errorDescriptions.min,
  ]

  const formSchema = yup.object().shape({
    img_file: yup
      .mixed()
      .test('fileSize', errorDescriptions.fileSize, (value) => {
        return value === null || (value && value.size <= MAX_IMG_SIZE)
      })
      .test('fileType', errorDescriptions.fileType, (value) => {
        return value === null || (value && SUPPORTED_IMG_FORMATS.includes(value.type))
      }),
    first_name: yup.string(),
    last_name: yup.string(),
    password: yup.string(),
    new_password: yup.string().when('password', {
      is: (value: string) => value !== '',
      then: (schema) =>
        schema
          .matches(/[A-Z]/, errorDescriptions.upperCase)
          .matches(/[a-z]/, errorDescriptions.lowerCase)
          .matches(/\d/, errorDescriptions.digits)
          .matches(/[<>{}"/|;:.,~!?@#$%^=&*\]()\/\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©_+]/, errorDescriptions.simbol)
          .min(14, errorDescriptions.min),
    }),
    email: yup.string().email(errorDescriptions.invalid),
    passwordConfirmation: yup.string().when('new_password', {
      is: (value: string) => value !== '',
      then: (schema) => schema.oneOf([yup.ref('new_password'), null], errorDescriptions.passwordMatch).required(''),
    }),
  })

  const handleFormSubmit = (values: typeof initialValues) => {
    console.log(values)
    if (!!values.email) {
      setWaitMail((state) => ({ ...state, modal: true, email: values.email }))
    }
  }

  const checkValuesToBlockPage = (values: typeof initialValues, event: ChangeEvent<HTMLInputElement>) => {
    const newValues = { ...values, [event.target.name]: event.target.value }
    const isPageBlocked =
      !!newValues.img_file ||
      !!newValues.first_name ||
      !!newValues.last_name ||
      !!newValues.email ||
      !!newValues.password ||
      !!newValues.new_password ||
      !!newValues.passwordConfirmation
    setPageBlocked(isPageBlocked)
  }

  const onAvatarInput =
    (setFieldValue: (field: string, value: any) => void, values: typeof initialValues) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        setFieldValue('img_file', event.target.files[0])
        reader.onload = () => {
          setAvatar(reader.result)
          checkValuesToBlockPage(values, event)
        }
      }
    }

  const onChangeValue =
    (setFieldValue: (field: string, value: any) => void, values: typeof initialValues) => (event: ChangeEvent<HTMLInputElement>) => {
      setFieldValue(event.target.name, event.target.value)
      checkValuesToBlockPage(values, event)
    }

  useEffect(() => {
    if (avatar && refPhoto.current) {
      refPhoto.current.style.backgroundImage = `url(${avatar})`
    }
  }, [avatar])

  return (
    <div className={styles.container}>
      <ModalPopUp
        modalActive={waitMail.modal}
        setModalActive={() => {
          setWaitMail((state) => ({ ...state, modal: false }))
        }}
        titleOne={'Confirm your email'}
        titleTwo={`For confirmation, we sent an email\n to ${waitMail.email.replace(/(.{2})(.+)(.{1}@.+$)/, '$1******$3')}`}
        buttons={buttonModal}
      />
      <RouteLeavingGuard isBlocked={pageBlocked} />
      {/* {loading && <Loader />} */}

      <PageTitle title={`Edit User information`} />
      <h2>Edit information</h2>
      <ScrollBar className={styles.main}>
        <Formik
          initialValues={initialValues}
          validate={ValidateSchema(formSchema)}
          onSubmit={(values, action) => {
            handleFormSubmit(values)
            action.setSubmitting(false)
          }}
        >
          {({ values, errors, touched, handleBlur, isSubmitting, setFieldValue }) => {
            return (
              <Form className={styles.form}>
                <div className={styles.main_header}>
                  <label htmlFor='user_edit_details_avatar'>
                    <div className={styles.main_header_photo} ref={refPhoto}>
                      {!avatar ? <div className={styles.main_header_photo_add} /> : ''}
                    </div>
                  </label>
                  <div className={styles.main_header_choose_file}>
                    <p>Max fil size is 500 kb</p>
                    <p>Acceptable format jpg. png.</p>
                    {!!errors.img_file ? <p className={styles.file_error}>{errors.img_file}</p> : null}
                    <label className={styles.main_header_choose_file_button} tabIndex={0}>
                      <input
                        type='file'
                        id='user_edit_details_avatar'
                        name='img_file'
                        accept='image/jpeg,image/png'
                        onChange={onAvatarInput(setFieldValue, values)}
                        onBlur={handleBlur}
                      />
                      Choose a file
                    </label>
                  </div>
                </div>
                <hr />

                <h3>Change account info</h3>
                <div className={styles.main_row}>
                  <label htmlFor='user_edit_details_first_name'>First name</label>
                  <InputField
                    className={styles.main_row_input}
                    id={'user_edit_details_first_name'}
                    name='first_name'
                    placeholder={user?.given_name || 'First name'}
                    onBlur={handleBlur}
                    onChange={onChangeValue(setFieldValue, values)}
                    value={values.first_name || ''}
                    isError={!!touched.first_name && !!errors.first_name}
                    helperText={touched.first_name && errors.first_name}
                  />
                </div>
                <div className={styles.main_row}>
                  <label htmlFor='user_edit_details_last_name'>Last name</label>
                  <InputField
                    className={styles.main_row_input}
                    id={'user_edit_details_last_name'}
                    name='last_name'
                    placeholder={user?.family_name || 'Last name'}
                    onBlur={handleBlur}
                    onChange={onChangeValue(setFieldValue, values)}
                    value={values.last_name || ''}
                    isError={!!touched.last_name && !!errors.last_name}
                    helperText={touched.last_name && errors.last_name}
                  />
                </div>
                <div className={styles.main_row}>
                  <label htmlFor='user_edit_details_email'>E-mail</label>
                  <InputField
                    className={styles.main_row_input}
                    id={'user_edit_details_email'}
                    name='email'
                    placeholder={user?.email ? user.email.replace(/(.{2})(.+)(.{1}@.+$)/, '$1******$3') : 'Email'}
                    onBlur={handleBlur}
                    onChange={onChangeValue(setFieldValue, values)}
                    value={values.email || ''}
                    isError={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />
                  <p>After saving changes, we will send a confirmation email to new email address.</p>
                </div>
                <hr />

                <h3>Change password</h3>
                <div className={styles.main_row}>
                  <label htmlFor='user_edit_details_password'>Current password</label>
                  <InputField
                    className={styles.main_row_input}
                    id={'user_edit_details_password'}
                    name='password'
                    type='password'
                    placeholder='Password'
                    onBlur={handleBlur}
                    onChange={onChangeValue(setFieldValue, values)}
                    value={values.password || ''}
                    isError={!!touched.password && !!errors.password}
                    visibilityIcon
                  />
                </div>
                <div className={styles.main_row}>
                  <label htmlFor='user_edit_details_new_password'>New password</label>
                  <InputField
                    className={styles.main_row_input}
                    id={'user_edit_details_new_password'}
                    name='new_password'
                    type='password'
                    placeholder='Enter new password'
                    onBlur={handleBlur}
                    onChange={onChangeValue(setFieldValue, values)}
                    value={values.new_password || ''}
                    isError={!!touched.new_password && !!errors.new_password}
                    visibilityIcon
                  />
                </div>
                {!!touched.new_password && !!errors.new_password ? (
                  <PasswordPattern
                    className={styles.main_pattern}
                    descriptions={errorsPaswordArray}
                    value={values.new_password || ''}
                    errors={errors.new_password}
                  />
                ) : null}
                <div className={styles.main_row}>
                  <label htmlFor='user_edit_details_passwordConfirmation'>Confirm password</label>
                  <InputField
                    className={styles.main_row_input}
                    id={'user_edit_details_passwordConfirmation'}
                    name='passwordConfirmation'
                    type='password'
                    placeholder='Confirm password'
                    onBlur={handleBlur}
                    onChange={onChangeValue(setFieldValue, values)}
                    visibilityIcon
                    value={values.passwordConfirmation || ''}
                    isError={!!touched.passwordConfirmation && !!errors.passwordConfirmation}
                    helperText={touched.passwordConfirmation && errors.passwordConfirmation}
                  />
                </div>
                <ButtonSimple className={styles.main_submit_button} type='submit' disabled={isSubmitting}>
                  Save changes
                </ButtonSimple>
              </Form>
            )
          }}
        </Formik>
      </ScrollBar>
    </div>
  )
}

export default UserEditDetails
// first_name: '',
// last_name: '',
// email: '',
// password: '',
// new_password: '',
// passwordConfirmation: '',
