import React from 'react'
import ReactDOM from 'react-dom'
import jQuery from 'jquery'
import Base from './components/Base.jsx'

jQuery(function() {
  ReactDOM.render(
    <Base />,
    document.getElementById('app')
  );
})
