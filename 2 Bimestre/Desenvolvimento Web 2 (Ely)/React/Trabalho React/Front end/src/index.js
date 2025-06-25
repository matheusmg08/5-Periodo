// Importa as bibliotecas principais do React e do Material UI
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Estilos globais da aplicação
import Aplicacao from './App'; // Componente principal da aplicação
import relatarMetricasWeb from './reportWebVitals'; // Métricas de performance (opcional)
import { ThemeProvider, CssBaseline } from '@mui/material'; // Provider de tema e reset de CSS do Material UI
import tema from './theme'; // Tema customizado

// Cria a raiz da aplicação React e renderiza o conteúdo na div 'root'
const raiz = ReactDOM.createRoot(document.getElementById('root'));
raiz.render(
  <React.StrictMode>
    {/* Aplica o tema customizado e o reset de CSS global do Material UI */}
    <ThemeProvider theme={tema}>
      <CssBaseline />
      <Aplicacao />
    </ThemeProvider>
  </React.StrictMode>
);

// Função para medir performance (opcional, pode ser removida se não for usar)
relatarMetricasWeb();
