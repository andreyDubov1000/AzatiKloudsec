import React  from 'react';
import MenuItem from '../MenuItem/MenuItem';
import { MenuNav } from '../menuNav';
import { SecondMenuPropsTypes } from '../SecondMenu';

const MenuList = ({ items }: SecondMenuPropsTypes) => {
  return (
    <>
      {items.map((item: MenuNav, key: number) => (
        <MenuItem key={key} item={item}  />
      ))}
    </>
  );
};

export default MenuList;
