import React from 'react';

const Form = (props) => (
  <form onSubmit={props.getWeather}>
    <input type='text' name='city' placeholder='City' aria-label='City' />
    <input type='text' name='country' placeholder='Country' aria-label='Country' />
    <button>Display weather</button>
  </form>
);
export default Form;
