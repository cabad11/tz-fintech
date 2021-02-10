const CHANGE_NOW_API = 'https://api.changenow.io/v1';
const GET_LIST_OF_CURRENCIES_LINK = `${CHANGE_NOW_API}/currencies?active=true`;
const GET_ESTIMATED_CURRENCY_AMOUNT_LINK = `${CHANGE_NOW_API}/exchange-amount`;
const GET_MIN_CURRENCY_AMOUNT_LINK = `${CHANGE_NOW_API}/min-amount`;

class ChangeNowController {
    constructor(apikey) {
        this.apiKey = apikey;
    }

    getAvailableCurrencies = async() => {
        const response = await fetch(GET_LIST_OF_CURRENCIES_LINK, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    };

    getEstimatedCurrencyAmount = async({ amount, from, to }) => {
        let link = GET_ESTIMATED_CURRENCY_AMOUNT_LINK + `/${amount}/${from}_${to}?api_key=${this.apiKey}`;
        const response = await fetch(link, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    };

    getMinimalCurrencyAmount = async({ from, to }) => {
        let link = GET_MIN_CURRENCY_AMOUNT_LINK + `/${from}_${to}?api_key=${this.apiKey}`;
        const response = await fetch(link, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    };
}

export default new ChangeNowController(process.env.API_KEY);
