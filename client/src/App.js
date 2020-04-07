import React from 'react';
import {Route} from 'react-router-dom';

//components
import {AccessCont} from './components/AccessCont';
import {Header} from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Route path= '/'>
        <AccessCont />
      </Route>
    </div>
  );
}

export default App;
