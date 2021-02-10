import React, { useContext, useMemo, useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { ExchangeContext } from '../../contexts/ExchangeContext';
import { ExchangeIcon } from '../../icons/ExchangeIcon';
import { Input } from '../Common/Input';
import { CurrencyInput } from '../CurrencyInput';
import styles from './ExchangeForm.module.scss';

const ExchangeForm = () => {
    const {
        state: { availableCurrencies, minimalAmountByCurrency, estimatedAmountByCurrency },
        actions: { getMinimalAmount, getEstimatedAmount }
    } = useContext(ExchangeContext);
    const [firstCurrency, setFirstCurrency] = useState({ amount: '', currencyValue: 'btc' });
    const [secondCurrency, setSecondCurrency] = useState({ amount: '', currencyValue: 'eth' });

    useEffect(() => {
        getMinimalAmount({ from: firstCurrency.currencyValue, to: secondCurrency.currencyValue });
    }, [firstCurrency.currencyValue, secondCurrency.currencyValue]);

    useEffect(() => {
        const minimalAmount = minimalAmountByCurrency[`${firstCurrency.currencyValue}_${secondCurrency.currencyValue}`];
        if (+firstCurrency.amount >= +minimalAmount) {
            getEstimatedAmount({
                from: firstCurrency.currencyValue,
                to: secondCurrency.currencyValue,
                amount: firstCurrency.amount
            });
        } else {
            setSecondCurrency(prev => {
                return { ...prev, amount: '-' };
            });
        }
    }, [firstCurrency.amount]);

    useEffect(() => {
        const minimalAmount = minimalAmountByCurrency[`${firstCurrency.currencyValue}_${secondCurrency.currencyValue}`];
        if (minimalAmount) {
            setFirstCurrency(prev => {
                return {
                    ...prev,
                    amount: minimalAmount
                };
            });
        }
    }, [minimalAmountByCurrency]);

    useEffect(() => {
        const estimatedAmount = estimatedAmountByCurrency[`${firstCurrency.currencyValue}_${secondCurrency.currencyValue}`];
        if (estimatedAmount) {
            setSecondCurrency(prev => {
                return {
                    ...prev,
                    amount: estimatedAmount
                };
            });
        }
    }, [estimatedAmountByCurrency]);

    const swapCurrencies = useCallback(()=>{
        setFirstCurrency(secondCurrency)
        setSecondCurrency(firstCurrency)
    },[firstCurrency,secondCurrency]);

    const options = useMemo(() => {
        if (typeof availableCurrencies !== 'object') return [];
        return availableCurrencies?.map(currency => {
            return {
                name: currency.ticker.toUpperCase(),
                value: currency.ticker,
                fullName: currency.name,
                image: currency.image
            };
        });
    }, [availableCurrencies]);

    if (!availableCurrencies) return null;

    return (
      <div className={styles.mainContainer}>
          <div className={styles.header}>
              <div className={styles.title}>Crypto Exchange</div>
              <div className={styles.titleDescription}>Exchange fast and easy</div>
          </div>
          <div className={styles.exchangerContainer}>
              <CurrencyInput options={options} setCurrency={setFirstCurrency} currency={firstCurrency}/>
              <ExchangeIcon fill="#11B3FE" className={styles.exchangeIcon} onClick={swapCurrencies}/>
              <CurrencyInput options={options}
                             setCurrency={setSecondCurrency}
                             currency={secondCurrency}
                             disabled={true}/>
          </div>
          <div className={styles.addressContainer}>
              <div>{`Your ${secondCurrency.currencyFullName} address`}</div>
              <div className={styles.addressInputContainer}>
                  <Input className={styles.addressInput}/>
                  <button className={styles.exchangeButton}>
                      EXCHANGE
                      <span className={classNames(styles.exchangeError, { hidden: secondCurrency.amount !== '-' })}>This pair is disabled now</span>
                  </button>
              </div>
          </div>
      </div>
    );
};

export default React.memo(ExchangeForm);
