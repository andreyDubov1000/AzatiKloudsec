import React, { useState } from 'react';
import {
  AvatarEl,
  ButtonSimple,
  InputSearch,
  ModalPopUP,
  RiskButton,
  ToggleButton,
  PlanCard,
  TextTab,
  SecondMenu,
} from '@component/elements';

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
      <h1 style={{ textAlign: 'center' }}>Ui Kit</h1>
      <div className={s.kitList}>
        <UiKitCard title='Risk Button'>
          <RiskButton />
        </UiKitCard>
        <UiKitCard title='Simple Button'>
          <ButtonSimple title='Accept' />
        </UiKitCard>
        <UiKitCard title='Input Search'>
          <InputSearch />
        </UiKitCard>
        <UiKitCard title='Modal Popup'>
          <div>
            <ModalPopUP
              modalActive={modalActive}
              setModalActive={setModalActive}
              titleOne={'Exceptions'}
              titleTwo={'Do you want to see all the exceptions?'}
              buttons={buttons}
            />
            <ButtonSimple title='Open Modal' onClick={() => setModalActive(true)} />
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
        <UiKitCard bgColor='#ccc' title='Text Tab'>
          <SecondMenu items={menuNav} />
        </UiKitCard>
      </div>
    </div>
  );
};

export default UIKit;
