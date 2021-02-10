import React, { useRef, useEffect, useCallback } from 'react';
import { useSelect } from 'react-select-search';
import classNames from 'classnames';
import filterCurrency from '../../helpers/filterCurrency';
import CloseIcon from '../../icons/CloseIcon';
import DropdownIcon from '../../icons/DropdownIcon';
import { Input } from '../Common/Input';
import styles from './CurrencyInput.module.scss';

const CurrencyInput = ({ currency: { amount, currencyValue }, options, setCurrency, disabled }) => {
    const searchInput = useRef();
    const [snapshot, valueProps, optionProps, setValue] = useSelect({
        options, value: currencyValue, search: true, filterOptions: filterCurrency
    });

    useEffect(() => {
        if (searchInput.current) {
            searchInput.current.focus();
        }
    }, [searchInput.current]);

    useEffect(() => {
        if (snapshot.option) {
            setCurrency({
                amount,
                currencyValue: snapshot.option.value,
                currencyFullName: snapshot.option.fullName
            });
        }
        if (searchInput.current) {
            searchInput.current.blur();
        }
    }, [snapshot.displayValue]);

    const clearSearch = useCallback((ev) => {
        searchInput.current.value = '';
        valueProps.onChange({
            target: {
                value: ''
            }
        });
        ev.preventDefault();
    }, [searchInput.current]);

    const onAmountChange = useCallback((ev) => {
        const value = ev.target.value;

        if (value && isNaN(parseFloat(value))) return ev.preventDefault();
        setCurrency({ amount: parseFloat(value), currencyValue });
    }, [currencyValue]);

    return (
      <div className={styles.currencyInputContainer}>
          {!snapshot.focus && <div className={styles.inputContainer}>
              <Input className={styles.input}
                     value={amount}
                     type={disabled ? 'text' : 'number'}
                     onChange={onAmountChange}
                     disabled={disabled}
              />
              <div className={styles.partition}/>
              <div {...valueProps} className={styles.currencySelectContainer}>
                  <img src={snapshot.option?.image}/>
                  <div className={styles.currentCurrencyName}>{snapshot.displayValue}</div>
                  <DropdownIcon className={styles.dropdownIcon}/>
              </div>
          </div>}
          {snapshot.focus && <div {...valueProps} className={styles.inputContainer}>
              <Input {...valueProps} className={styles.input}
                     placeholder={'Search'}
                     ref={searchInput}/>
              <CloseIcon className={styles.closeIcon} onMouseDown={clearSearch}/>
          </div>}
          {snapshot.focus && <div className={classNames(styles.currencies, 'scrollable')}>
              {snapshot.options.map((option) => {
                  if (option.name === snapshot.displayValue) return null;
                  return <button onMouseDown={setValue.bind(this, option)}
                                 value={option.value}
                                 className={styles.currencyButton}
                                 key={'currencyRow' + option.name}>
                      <img src={option?.image}/>
                      <span className={styles.currencyShortName}>{option.name}</span>
                      <span className={styles.currencyFullName}>{option?.fullName}</span>
                  </button>;
              })}
          </div>}
      </div>
    );
};

export default React.memo(CurrencyInput);
