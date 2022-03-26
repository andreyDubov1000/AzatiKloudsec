import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import styles from './UserInformation.module.scss'
import classNames from 'classnames'
import UserInformationCard from './UserInfoCard'
import { ReactComponent as AddPhoto } from 'assets/icons/AddPhoto-normal.svg'
import { ActionButton, InputField, ToggleButton } from '@component/elements'
import ReactAvatarEditor from 'react-avatar-editor'
import { cloudList } from '@data/constants'
import ScrollBar from 'react-perfect-scrollbar'

interface UserInformationPropType {}

const UserInformation: React.FC<UserInformationPropType> = ({}) => {
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>('')
  const [avatarCanvas, setAvatarCanvas] = useState<string | null>(null)
  const refDiv = useRef<HTMLDivElement>(null)

  const onAvatarInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      console.log(event.target.files[0])
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = () => {
        setAvatar(reader.result)
      }

      // const canvas = document.createElement('canvas')
      // const img = new Image()
      // img.src = URL.createObjectURL(event.target.files[0])
      // img.onload = () => {
      //   const context = canvas.getContext('2d')

      //   if (refDiv.current) {
      //     const rec = refDiv.current.getBoundingClientRect()
      //     canvas.width = rec.width
      //     canvas.height = rec.height
      //   }
      //   context?.drawImage(img, 0, 0)
      //   const avatarUrl = canvas.toDataURL()
      //   console.log(avatarUrl)
      //   setAvatarCanvas(avatarUrl)
      // }
      // const src = URL.createObjectURL(event.target.files[0])
      // console.log(src)
      // setAvatar(src)
    }
  }

  useEffect(() => {
    if (avatar && refDiv.current) {
      refDiv.current.style.backgroundImage = `url(${avatar})`
    }
    if (avatarCanvas && refDiv.current) {
      // refDiv.current.style.backgroundImage = `url(${avatarCanvas})`
    }
  }, [avatar, avatarCanvas])

  const clouds = cloudList().slice(1)

  return (
    <ScrollBar className={styles.user_cards}>
      <UserInformationCard className={styles.card_auth} toPage={'/user/personal'}>
        <div className={styles.card_auth_header}>
          <label htmlFor='avatar'>
            <div className={styles.card_auth_header_addPhoto} ref={refDiv}>
              <input type='file' id='avatar' name='avatar' accept='image/*' onChange={onAvatarInput} />
              {!avatar ? <AddPhoto className={styles.card_auth_header_addPhoto_empty} /> : ''}
            </div>
          </label>
          <div>
            <p>First name</p>
            <p>Last name</p>
          </div>
        </div>
        <InputField name='email' type='email' placeholder='Email' disabled />
        <InputField name='password' type='password' placeholder='Password' disabled />
      </UserInformationCard>
      <UserInformationCard className={styles.card_payment} toPage={'/user/personal'}>
        <h3>Payments history</h3>
        <div className={styles.card_payment_box}>
          <p>Payments history is empty</p>
        </div>
      </UserInformationCard>
      <UserInformationCard className={styles.card_accounts} toPage={'/user/personal'}>
        <h3>Accounts management</h3>
        <div className={styles.card_accounts_icons}>
          {new Array(10).fill(0).map((_, i) => {
            const iconClass = clouds[i]?.title || 'normal'

            return <div key={i} className={classNames(styles.card_accounts_icon, styles[iconClass])}></div>
          })}
        </div>
      </UserInformationCard>
      <UserInformationCard className={styles.card_notifications} toPage={'/user/personal'}>
        <h3>Notifications</h3>
        <div className={styles.card_notifications_list}>
          {new Array(3).fill(0).map((item, i) => (
            <div className={styles.card_notifications_list_item} key={i}>
              <span>Description of the notification</span>
              <ToggleButton />
            </div>
          ))}
        </div>
      </UserInformationCard>
      <UserInformationCard className={styles.card_plan} toPage={'/user/personal'}>
        <h3>Current plan</h3>
        <div className={styles.card_plan_box}>
          <p>Choose a tariff plan</p>
        </div>
      </UserInformationCard>
      <UserInformationCard className={styles.card_other} toPage={'/user/personal'}>
        <h3>Other actions</h3>
        <div className={styles.card_other_box}>
          <ActionButton className={styles.card_other_box_button} disabled type='icon' icon='/assets/images/icons/assets/delete-user.svg'>
            Delete account
          </ActionButton>
          <ActionButton
            className={styles.card_other_box_button}
            disabled
            type='icon'
            icon='/assets/images/icons/assets/Icons for left menu.svg'
          >
            Logout
          </ActionButton>
        </div>
      </UserInformationCard>
    </ScrollBar>
  )
}

export default UserInformation
