import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockFetch from '../../cypress/mocks/fetch';

describe('Testando app', () => {
  it('Testando os planetas maior que', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    render(<App />);

    const planeta1 = await screen.findByRole('cell', { name: /tatooine/i });
    expect(planeta1).toBeInTheDocument();

    const numeroDeLinhas = 11;
    let linhasTabela = screen.getAllByRole('row');
    expect(linhasTabela).toHaveLength(numeroDeLinhas);

    const campoDeTexto = screen.getByRole('textbox', { name: /nome do planeta/i });
    expect(campoDeTexto).toBeInTheDocument();
    userEvent.type(campoDeTexto, 'oo');

    const numeroDeLinhasFiltradas = 3;
    linhasTabela = screen.getAllByRole('row');
    expect(linhasTabela).toHaveLength(numeroDeLinhasFiltradas);

    const selectColuna = screen.getByTestId('column-filter');
    expect(selectColuna).toBeInTheDocument();

    const selectComparacao = screen.getByTestId('comparison-filter');
    expect(selectComparacao).toBeInTheDocument();

    const inputValor = screen.getByTestId('value-filter');
    expect(inputValor).toBeInTheDocument();

    userEvent.selectOptions(selectColuna, 'rotation_period');
    userEvent.selectOptions(selectComparacao, 'maior que');
    userEvent.type(inputValor, '20');

    const botao = screen.getByRole('button', { name: /filtrar/i });
    expect(botao).toBeInTheDocument();
    userEvent.click(botao);

    const numeroDeLinhasFiltrada = 3;
    linhasTabela = screen.getAllByRole('row');
    expect(linhasTabela).toHaveLength(numeroDeLinhasFiltrada);
  });

  it('Testando os planetas com menor que', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    render(<App />);

    const planeta1 = await screen.findByRole('cell', { name: /tatooine/i });
    expect(planeta1).toBeInTheDocument();

    const numeroDeLinhas = 11;
    let linhasTabela = screen.getAllByRole('row');
    expect(linhasTabela).toHaveLength(numeroDeLinhas);

    const selectColuna = screen.getByTestId('column-filter');
    expect(selectColuna).toBeInTheDocument();

    const selectComparacao = screen.getByTestId('comparison-filter');
    expect(selectComparacao).toBeInTheDocument();

    const inputValor = screen.getByTestId('value-filter');
    expect(inputValor).toBeInTheDocument();

    const botao = screen.getByRole('button', { name: /filtrar/i });
    expect(botao).toBeInTheDocument();

    userEvent.selectOptions(selectColuna, 'orbital_period');
    userEvent.selectOptions(selectComparacao, 'menor que');
    userEvent.type(inputValor, '305');

    userEvent.click(botao);

    const numeroDeLinhasFiltrada = 2;
    linhasTabela = screen.getAllByRole('row');
    expect(linhasTabela).toHaveLength(numeroDeLinhasFiltrada);
  });

  it('Testando os planetas com igual a', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    render(<App />);

    const planeta1 = await screen.findByRole('cell', { name: /tatooine/i });
    expect(planeta1).toBeInTheDocument();

    const numeroDeLinhas = 11;
    let linhasTabela = screen.getAllByRole('row');
    expect(linhasTabela).toHaveLength(numeroDeLinhas);

    const selectColuna = screen.getByTestId('column-filter');
    expect(selectColuna).toBeInTheDocument();

    const selectComparacao = screen.getByTestId('comparison-filter');
    expect(selectComparacao).toBeInTheDocument();

    const inputValor = screen.getByTestId('value-filter');
    expect(inputValor).toBeInTheDocument();

    const botao = screen.getByRole('button', { name: /filtrar/i });
    expect(botao).toBeInTheDocument();

    userEvent.selectOptions(selectColuna, 'diameter');
    userEvent.selectOptions(selectComparacao, 'igual a');
    userEvent.type(inputValor, '4900');

    userEvent.click(botao);

    const numeroDeLinhasFiltrada = 2;
    linhasTabela = screen.getAllByRole('row');
    expect(linhasTabela).toHaveLength(numeroDeLinhasFiltrada);
  });
});
