// Importa funções de teste do React Testing Library
import { render, screen } from '@testing-library/react';
// Importa o componente principal Aplicacao
import Aplicacao from './App';

// Teste simples para verificar se o texto "Vendedores" aparece na tela
// Isso garante que o componente Aplicacao está renderizando corretamente
// e que a interface principal está sendo exibida

test('renderiza o título Vendedores', () => {
  render(<Aplicacao />); // Renderiza o componente Aplicacao
  const titulo = screen.getByText(/Vendedores/i); // Procura pelo texto "Vendedores"
  expect(titulo).toBeInTheDocument(); // Verifica se o texto está presente no DOM
});
