import React from 'react';
import classNames from 'classnames';
import ArrowIcon from '../ArrowIcon';
import styles from './ExchangeIcon.module.scss';

const ExchangeIcon = ({ fill, className, onClick }) => {
    return (
      <div className={classNames(styles.exchangeIconContainer, className)} onClick={onClick}>
          <ArrowIcon fill={fill} className={classNames(styles.rightIcon, styles.arrowIcon)}/>
          <ArrowIcon fill={fill} className={classNames(styles.leftIcon, styles.arrowIcon)}/>
      </div>
    );
};

export default React.memo(ExchangeIcon);
