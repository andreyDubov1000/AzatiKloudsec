import React from 'react';
import styles from './AvatarEl.module.scss';
import classNames from "classnames";

interface AvatarPropTypes {
    imgSrc: string,
    size?: 'small' | 'medium' | 'big' | 'max'
    onClick?: () => any
}

const AvatarEl = ({imgSrc, size = 'max', onClick}: AvatarPropTypes) => {
    return <img
        src={imgSrc}
        className={classNames(
            styles.avatar,
            styles[size]
        )}
        onClick={onClick} 
        alt=""/>
};

export default AvatarEl;
