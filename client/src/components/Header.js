import React from 'react';
import {NavLink} from 'react-router-dom';

//styles
import './Header.scss';

export const Header = () => {
  return (
    <header>
      <div className= 'logoCont'>LOGO HERE</div>
      <nav>
        <ul>
          <li><NavLink to= '/'>Nav Item</NavLink></li>
          <li><NavLink to= '/'>Nav Item</NavLink></li>
          <li><NavLink to= '/'>Nav Item</NavLink></li>
          <li><NavLink to= '/'>Nav Item</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}// end Header
