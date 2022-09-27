import React, { useState, useContext } from 'react';
import context from '../context/myContext';

const Filter = () => {
  const { setState, state } = useContext(context);
  const [filtros, setFiltros] = useState(
    {
      column: 'population',
      comparison: 'maior que',
      value: '0',
    },
  );

  const handleChange = (event) => {
    setFiltros({
      ...filtros,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = () => {
    setState({
      ...state,
      filters: [...state.filters, filtros],
    });
  };

  return (
    <div>
      <select
        data-testid="column-filter"
        onChange={ handleChange }
        name="column"
        value={ filtros.column }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleChange }
        value={ filtros.comparison }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="text"
        data-testid="value-filter"
        name="value"
        onChange={ handleChange }
        value={ filtros.value }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>

    </div>
  );
};

export default Filter;
