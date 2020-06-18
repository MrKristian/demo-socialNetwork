import React from 'react';
import preloader from '../../../assets/images/5.svg';
import s from './Preloader.module.css';

let Preloader = () => {
    return <img src={preloader} className={s.preloader} />
};

export default Preloader;