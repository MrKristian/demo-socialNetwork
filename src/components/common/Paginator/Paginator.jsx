import React, { useState } from 'react';
import s from './Paginator.module.css';
import classNames from 'classnames';
import arrowRight from '../../../assets/images/arrowRight.png';
import arrowLeft from '../../../assets/images/arrowLeft.png'

const Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    };

    let potionCount = Math.ceil(pagesCount / pageSize);
    let [ portionNumer, setPortionNumer ] = useState(1);
    let leftPostionPageNumer = (portionNumer - 1) * portionSize + 1;
    let rightPostionPageNumer = portionNumer * portionSize;
    
    return <div className={classNames(s.paginator)}>
        {portionNumer > 1 &&
            <button className={s.arrows} onClick={() => { setPortionNumer(portionNumer - 1) }}><img src={arrowLeft} /></button>}
        {pages.filter(p => p >= leftPostionPageNumer && p <= rightPostionPageNumer)
            .map(p => {
                return <span className={classNames({ [s.selectedPage]: currentPage === p }, s.pageNumer)}
                    key={p} onClick={(e) => { onPageChanged(p) }}>{p}
                </span>
            })}
        {potionCount > portionNumer &&
            <button className={s.arrows} onClick={() => { setPortionNumer(portionNumer + 1) }}><img src={arrowRight} /></button>}
    </div>
};

export default Paginator;