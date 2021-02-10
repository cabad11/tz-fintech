import React from "react";
import { ExchangeForm } from './components/ExchangeForm';
import "./styles/styles.css"
import "./styles/remote.scss"
import { ExchangeContextProvider } from './contexts/ExchangeContext';

const App = ()=> {
        return (
          <div className='mainContainer'>
              <ExchangeContextProvider>
                  <ExchangeForm/>
              </ExchangeContextProvider>
          </div>
        );
}

export default App;
