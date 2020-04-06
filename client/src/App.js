import React from 'react';
import {Route} from 'react-router-dom';

//components
import {AccessCont} from './components/AccessCont';
import {Header} from './components/Header';

function App() {
  return (
    <div className="App">
      {console.log('API URL: ', process.env.REACT_APP_API_URL)}
      <Header />
      <Route path= '/'>
        <AccessCont />
      </Route>
    </div>
  );
}

export default App;
