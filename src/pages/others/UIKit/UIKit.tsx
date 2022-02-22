import React, { useState } from 'react';
import { ButtonSimple, InputSearch, ModalPopUP, RiskButton } from '@component/elements';
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
  ]

  return (
    <div className={s.kit}>
      <h1 style={{textAlign: 'center'}}>Ui Kit</h1>
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
      </div>
    </div>
  );
};

export default UIKit;
