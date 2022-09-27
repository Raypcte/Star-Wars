import React, { useContext, useEffect, useState } from 'react';
import myContext from '../context/myContext';

const Table = () => {
  const { fetchApi, state } = useContext(myContext);
  const [nome, setNome] = useState('');

  useEffect(() => {
    fetchApi();
  }, []); // Com array vazio, significa componentDidMount

  const salvarNome = (event) => {
    setNome(event.target.value);
  };

  const filtraPlanetas = (planetas) => {
    let planetasFiltrados = [...planetas];
    state.filters.forEach(({ column, comparison, value }) => {
      if (comparison === 'maior que') {
        planetasFiltrados = planetasFiltrados
          .filter((planeta) => +planeta[column] > +value);
      } else if (comparison === 'menor que') {
        planetasFiltrados = planetasFiltrados
          .filter((planeta) => +planeta[column] < +value);
      } else {
        planetasFiltrados = planetasFiltrados
          .filter((planeta) => +planeta[column] === +value);
      }
    });
    return planetasFiltrados;
  };

  return (
    <div>
      <label htmlFor="name">
        Nome do planeta
        <input
          type="text"
          data-testid="name-filter"
          id="name"
          value={ nome }
          onChange={ salvarNome }
        />
      </label>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>rotation_period</th>
            <th>orbital_period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface_water</th>
            <th>population</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>
          </tr>

        </thead>
        <tbody>
          { state.planetas.length > 0
          && filtraPlanetas(state.planetas)
            .filter((item) => item.name.includes(nome))
            .map((item) => (
              <tr key={ item.name }>
                <td>{item.name}</td>
                <td>{item.rotation_period}</td>
                <td>{item.orbital_period}</td>
                <td>{item.diameter}</td>
                <td>{item.climate}</td>
                <td>{item.gravity}</td>
                <td>{item.terrain}</td>
                <td>{item.surface_water}</td>
                <td>{item.population}</td>
                <td>{item.films}</td>
                <td>{item.created}</td>
                <td>{item.edited}</td>
                <td>{item.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
