import React, { useState } from 'react';
import propTypes from 'prop-types';
import MyContext from './myContext';

const INITIAL_STATE = {
  planetas: [],
  filters: [],
};

function Provider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);

  const fetchApi = async () => {
    const planetas = await fetch('https://swapi.dev/api/planets');
    const estrelas = await planetas.json();
    setState({
      ...state,
      planetas: estrelas.results,
    });
  };

  const valoresGlobais = {
    state, setState, fetchApi,
  };

  return (
    <MyContext.Provider value={ valoresGlobais }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
