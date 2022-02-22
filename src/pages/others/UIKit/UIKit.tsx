import React from 'react';
import { ButtonSimple, InputSearch, RiskButton } from '@component/elements';
import AvatarEl from '@component/elements/AvatarEl/AvatarEl';
import ToggleButton from '@component/elements/ToggleButton/ToggleButton';

import s from './UIKit.module.scss';

interface UiKitCardPropsType {
  title: string;
  children: JSX.Element;
}

const UiKitCard = ({ title, children }: UiKitCardPropsType) => {
  return (
    <div className={s.card}>
      <div className={s.desc}>
        <p>{title}</p>
      </div>
      <div className={s.el}>{children}</div>
    </div>
  );
};

const UIKit = () => {
  return (
    <div className={s.kit}>
      <h1>Ui Kit</h1>
      <UiKitCard title='Risk Button'>
        <RiskButton />
      </UiKitCard>
      <UiKitCard title='Simple Button'>
        <ButtonSimple title='Accept' />
      </UiKitCard>
      <UiKitCard title='Input Search'>
        <InputSearch />
      </UiKitCard>
      <UiKitCard title='Avatar'>
        <AvatarEl imgSrc='/assets/images/faces/testAvatar.png' size='big' />
      </UiKitCard>
      <UiKitCard title='Toggle Button'>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <ToggleButton onChange={(state) => console.log(state)} />
        </div>
      </UiKitCard>
    </div>
  );
};

export default UIKit;
