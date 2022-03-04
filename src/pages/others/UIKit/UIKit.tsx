import React, { useState } from 'react';
import {
  AvatarEl,
  ButtonSimple,
  InputSearch,
  ModalPopUp,
  RiskButton,
  ToggleButton,
  PlanCard,
  TextTab,
  SecondMenu,
  SelectService,
  ActionButton,
  Calendar,
  Comment,
  InputField,
  SecurityTab,
  SingleSelect
} from '@component/elements'
import { Link } from 'react-router-dom'

import s from './UIKit.module.scss';
import menuNav from '@component/elements/SecondMenu/menuNav';

interface UiKitCardPropsType {
  title: string;
  bgColor?: string;
  children: JSX.Element;
}

const selectTestItems = [
  { id: 1, title: 'All accounts', value: 'all' },
  { id: 2, title: 'AWS', value: 'aws' },
  { id: 3, title: 'Azure', value: 'azure' },
  { id: 4, title: 'Alibaba cloud', value: 'alibaba' },
  { id: 5, title: 'Google cloud', value: 'google' },
  { id: 6, title: 'IBM cloud', value: 'ibm' },
]


const UiKitCard = ({ title, bgColor, children }: UiKitCardPropsType) => {
  return (
    <div style={{ background: bgColor }} className={s.card}>
      <div className={s.desc}>
        <p>{title}</p>
      </div>
      <div className={s.el}>{children}</div>
    </div>
  );
};

const UIKit = () => {
  const [modalActive, setModalActive] = useState(false);
  const [inputValue, setInputValue] = useState('error');

  const buttons = [
    {
      title: 'Yes',
      handler: () => {},
    },
    {
      title: 'No',
      handler: () => {},
    },
  ];

  return (
    <div className={s.kit}>
      <Link to={'/dashboard/risk-management'}>Back</Link>
      <h1 style={{ textAlign: 'center' }}>Ui Kit</h1>
      <div className={s.kitList}>
        <UiKitCard title='Risk Button'>
          <RiskButton />
        </UiKitCard>
        <UiKitCard title='Simple Button'>
          <ButtonSimple>Accept</ButtonSimple>
        </UiKitCard>
        <UiKitCard title='Input Search'>
          <InputSearch />
        </UiKitCard>
        <UiKitCard title='Modal Popup'>
          <div>
            <ModalPopUp
              modalActive={modalActive}
              setModalActive={setModalActive}
              titleOne={'Exceptions'}
              titleTwo={'Do you want to see all the exceptions?'}
              buttons={buttons}
            />
            <ButtonSimple onClick={() => setModalActive(true)}>Open Modal</ButtonSimple>
          </div>
        </UiKitCard>
        <UiKitCard title='Avatar'>
          <AvatarEl imgSrc='/assets/images/faces/testAvatar.png' size='big' />
        </UiKitCard>
        <UiKitCard title='Toggle Button'>
          <ToggleButton onChange={(state) => console.log(state)} />
        </UiKitCard>
        <UiKitCard title='Plan Card'>
          <PlanCard amount='$150' term='/per month' desc='For up to 100 resources' type='Developer' />
        </UiKitCard>
        <UiKitCard title='Text Tab'>
          <TextTab
            title='Overview'
            desc='The Kloudsec security allows you to run confidently your cloud related resources without ever worrying about security vulnerabilities. Whether you need to continuously run...'
          />
        </UiKitCard>
        <UiKitCard title='Select Service Type'>
          <SelectService />
        </UiKitCard>
        <UiKitCard bgColor='#ececec' title='Second Menu'>
          <SecondMenu items={menuNav} />
        </UiKitCard>
        <UiKitCard title='Action Button'>
          <div style={{ width: '100%' }}>
            <ActionButton type="icon" icon='/assets/images/icons/assets/delete-user.svg'>Icon Button</ActionButton>
            <br />
            <ActionButton type='outlined'>Outlined</ActionButton>
            <br />
            <ActionButton type='filled'>Filled</ActionButton>
            <br />
            <ActionButton disabled type="icon" icon='/assets/images/icons/assets/delete-user.svg'>Disabled Icon
              Button</ActionButton>
            <br />
            <ActionButton disabled type='outlined'>Disabled Outline</ActionButton>
            <br />
            <ActionButton disabled type='filled'>Disabled Fill</ActionButton>
          </div>
        </UiKitCard>
        <UiKitCard bgColor='#979797' title='Single Select'>
          <div style={{display: 'flex', width: '100%'}}>
            <SingleSelect
              type='filled'
              items={selectTestItems}
              onChange={(activeSelect) => console.log(activeSelect)} />
            <br />
            <SingleSelect
              type='outlined'
              items={selectTestItems}
              onChange={(activeSelect) => console.log(activeSelect)} />
          </div>
        </UiKitCard>
        <UiKitCard bgColor='#E6F5F9' title='Comment'>
          <Comment onChange={(value) => console.log(value)} />
        </UiKitCard>
        <UiKitCard bgColor='#979797' title='Calendar'>
          <Calendar onChange={(date) => console.log(date)} />
        </UiKitCard>
        <UiKitCard bgColor='#979797' title='Input Field'>
          <div>
            <form>
              <InputField
                type='email'
                placeholder='E-mail'
                margin='normal' onChange={(value) => console.log(value)} />
              <InputField
                type='password'
                placeholder='Password'
                margin='normal' visibilityIcon
                onChange={(value) => console.log(value)} />
              <InputField
                type='text'
                placeholder='Text'
                margin='normal'
                onChange={(value) => console.log(value)} />
              <InputField
                type='password'
                placeholder='Password'
                value={inputValue}
                error={inputValue === 'error'}
                helperText={inputValue === 'error' ? 'Incorrect Password' : 'Minimum 14 characters in upper and lower case'}
                visibilityIcon
                margin='normal'
                onChange={setInputValue} />
            </form>
          </div>
        </UiKitCard>
        <UiKitCard bgColor='#ececec' title='Security Tab'>
          <SecurityTab data={{ title: 'kloudsec-sandbox', accountId: '922706684423', server: 'AWS' }}
                       onClick={(state) => console.log(state)} />
        </UiKitCard>
      </div>
    </div>
  );
};

export default UIKit;
