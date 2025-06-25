// Importa função para criar temas do Material UI
import { createTheme } from '@mui/material/styles';

// Cria um tema customizado para toda a aplicação
const tema = createTheme({
  palette: {
    mode: 'dark', // Ativa o modo escuro
    primary: {
      main: '#2196f3', // Azul vibrante para botões e destaques
    },
    background: {
      default: '#23272f', // Fundo principal (cinza escuro suave)
      paper: '#2c313a', // Fundo dos cards/tabelas
    },
    secondary: {
      main: '#ff4081', // Rosa para botões de ação
    },
  },
  shape: {
    borderRadius: 14, // Bordas arredondadas para cards e botões
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove textura padrão
          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)', // Sombra suave
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: '#262b33', // Linhas alternadas na tabela
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none', // Não deixa tudo maiúsculo
          borderRadius: 10,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 14, // Bordas arredondadas na tabela
        },
      },
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial', // Fonte moderna
    h4: {
      fontWeight: 700,
      letterSpacing: 1,
    },
  },
});

export default tema; 