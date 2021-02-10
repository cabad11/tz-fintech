import React, { useCallback, useEffect, useState } from 'react';
import ChangeNowController from '../controllers/changeNowController';

const ExchangeContext = React.createContext({});

const ExchangeContextProvider = ({ children }) => {
    const [availableCurrencies, setAvailableCurrencies] = useState();
    const [minimalAmountByCurrency, setMinimalAmountByCurrency] = useState({});
    const [estimatedAmountByCurrency, setEstimatedAmountByCurrency] = useState({});

    useEffect(async() => {
        const currencies = await ChangeNowController.getAvailableCurrencies();
        setAvailableCurrencies(currencies);
    }, []);

    const getMinimalAmount = useCallback(async({ from, to }) => {
        const { minAmount } = await ChangeNowController.getMinimalCurrencyAmount({ from, to });

        setMinimalAmountByCurrency(prev => {
            return {
                ...prev,
                [`${from}_${to}`]: minAmount || ''
            };
        });
    }, []);

    const getEstimatedAmount = useCallback(async({ from, to, amount }) => {
        const { estimatedAmount } = await ChangeNowController.getEstimatedCurrencyAmount({ amount, from, to });

        setEstimatedAmountByCurrency(prev => {
            return {
                ...prev,
                [`${from}_${to}`]: estimatedAmount || '-'
            };
        });
    }, []);

    const actions = { getMinimalAmount, getEstimatedAmount };

    return (
      <ExchangeContext.Provider
        value={{
            actions,
            state: {
                availableCurrencies,
                minimalAmountByCurrency,
                estimatedAmountByCurrency
            }
        }}
      >
          {children}
      </ExchangeContext.Provider>
    );
};
export {
    ExchangeContext,
    ExchangeContextProvider
};
