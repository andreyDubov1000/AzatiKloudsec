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
  ActionButton,
  CommentForm,
  Calendar, Comment,
} from '@component/elements';
import { Link } from 'react-router-dom';

import s from './UIKit.module.scss';
import menuNav from '@component/elements/SecondMenu/menuNav';

interface UiKitCardPropsType {
  title: string;
  bgColor?: string;
  children: JSX.Element;
}

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
        <UiKitCard bgColor='#ececec' title='Second Menu'>
          <SecondMenu items={menuNav} />
        </UiKitCard>
        <UiKitCard title='Action Button'>
          <ActionButton icon='/assets/images/icons/assets/delete-user.svg'>Delete account</ActionButton>
        </UiKitCard>
        <UiKitCard bgColor='#E6F5F9' title='Comment'>
          <Comment onChange={(value) => console.log(value)} />
        </UiKitCard>
        <UiKitCard bgColor='#ececec' title='Calendar'>
          <Calendar onChange={(date) => console.log(date)}/>
        </UiKitCard>
      </div>
    </div>
  );
};

export default UIKit;
