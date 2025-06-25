// Importa React e hooks necessários
import React, { useEffect, useState } from 'react';
// Importa componentes do Material UI para a interface
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Snackbar, Alert, IconButton, Dialog, DialogTitle, DialogActions, Box, AppBar, Toolbar, Fab, Zoom
} from '@mui/material';
// Importa ícones do Material UI
import AddIcon from '@mui/icons-material/Add'; // Ícone de adicionar
import EditIcon from '@mui/icons-material/Edit'; // Ícone de editar
import DeleteIcon from '@mui/icons-material/Delete'; // Ícone de deletar
import StorefrontIcon from '@mui/icons-material/Storefront'; // Ícone de loja para o header
// Importa o componente de formulário de vendedor
import FormularioVendedor from './VendedorForm';

// Componente principal da aplicação
function Aplicacao() {
  // Estado para armazenar a lista de vendedores
  const [vendedores, setVendedores] = useState([]);
  // Estado para controlar o carregamento
  const [carregando, setCarregando] = useState(false);
  // Estado para mensagens de erro
  const [erro, setErro] = useState(null);
  // Estado para mensagens de sucesso
  const [sucesso, setSucesso] = useState(null);
  // Estado para controlar se o formulário está aberto
  const [formularioAberto, setFormularioAberto] = useState(false);
  // Estado para armazenar os dados do vendedor em edição
  const [dadosEdicao, setDadosEdicao] = useState(null);
  // Estado para armazenar o ID do vendedor a ser excluído
  const [idExcluir, setIdExcluir] = useState(null);
  // Estado para controlar se o modal de confirmação está aberto
  const [confirmacaoAberta, setConfirmacaoAberta] = useState(false);

  // Função para buscar a lista de vendedores do backend
  const buscarVendedores = async () => {
    setCarregando(true); // Ativa o loading
    setErro(null); // Limpa erros anteriores
    try {
      const resposta = await fetch('/vendedor'); // Chama a API Flask para buscar vendedores
      if (!resposta.ok) throw new Error('Erro ao buscar vendedores'); // Se der erro, lança exceção
      const dados = await resposta.json(); // Converte resposta em JSON
      setVendedores(dados); // Atualiza o estado com os vendedores
    } catch (e) {
      setErro(e.message); // Exibe mensagem de erro
    } finally {
      setCarregando(false); // Desativa o loading
    }
  };

  // useEffect executa buscarVendedores ao carregar o componente
  useEffect(() => {
    buscarVendedores(); // Busca vendedores ao abrir a página
  }, []);

  // Abre o formulário para cadastrar novo vendedor
  const abrirNovo = () => {
    setDadosEdicao(null); // Limpa dados de edição
    setFormularioAberto(true); // Abre o modal
  };

  // Abre o formulário para editar um vendedor existente
  const abrirEdicao = (vendedor) => {
    setDadosEdicao(vendedor); // Preenche o formulário com os dados do vendedor
    setFormularioAberto(true); // Abre o modal
  };

  // Função para inserir ou editar vendedor
  const aoSubmeter = async (formulario) => {
    setCarregando(true); // Ativa o loading
    setErro(null); // Limpa erros anteriores
    try {
      let resposta;
      if (dadosEdicao) {
        // Se dadosEdicao existe, é edição
        resposta = await fetch(`/vendedor/${dadosEdicao.idvendedor}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formulario)
        });
      } else {
        // Senão, é cadastro
        resposta = await fetch('/vendedor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formulario)
        });
      }
      if (!resposta.ok) throw new Error('Erro ao salvar vendedor'); // Se der erro, lança exceção
      setSucesso(dadosEdicao ? 'Vendedor alterado com sucesso!' : 'Vendedor cadastrado com sucesso!'); // Mensagem de sucesso
      setFormularioAberto(false); // Fecha o modal
      buscarVendedores(); // Atualiza a lista
    } catch (e) {
      setErro(e.message); // Exibe mensagem de erro
    } finally {
      setCarregando(false); // Desativa o loading
    }
  };

  // Abre o modal de confirmação de exclusão
  const abrirExclusao = (id) => {
    setIdExcluir(id); // Define o ID do vendedor a ser excluído
    setConfirmacaoAberta(true); // Abre o modal de confirmação
  };

  // Confirma e executa a exclusão do vendedor
  const confirmarExclusao = async () => {
    setCarregando(true); // Ativa o loading
    setErro(null); // Limpa erros anteriores
    try {
      const resposta = await fetch(`/vendedor/${idExcluir}`, { method: 'DELETE' }); // Chama API para deletar
      if (!resposta.ok) throw new Error('Erro ao excluir vendedor'); // Se der erro, lança exceção
      setSucesso('Vendedor excluído com sucesso!'); // Mensagem de sucesso
      setConfirmacaoAberta(false); // Fecha o modal
      buscarVendedores(); // Atualiza a lista
    } catch (e) {
      setErro(e.message); // Exibe mensagem de erro
    } finally {
      setCarregando(false); // Desativa o loading
    }
  };

  // Renderização da interface
  return (
    // Box principal com fundo escuro
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header fixo com ícone e título */}
      <AppBar position="fixed" color="primary" elevation={4}>
        <Toolbar>
          <StorefrontIcon sx={{ mr: 2, fontSize: 32 }} /> {/* Ícone de loja */}
          <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 2 }}>
            Gestão de Vendedores
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Espaço para o header não sobrepor o conteúdo */}
      <Toolbar />
      {/* Container centralizado para o conteúdo */}
      <Container maxWidth="md" sx={{ pt: 4, pb: 6 }}>
        {/* Título e botão de recarregar */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
            Vendedores
          </Typography>
          <Button variant="outlined" onClick={buscarVendedores} sx={{ borderRadius: 8, fontWeight: 600 }}>
            Recarregar Lista
          </Button>
        </Box>
        {/* Indicador de carregamento */}
        {carregando && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />}
        {/* Mensagens de erro e sucesso */}
        {erro && <Snackbar open autoHideDuration={4000} onClose={() => setErro(null)}><Alert severity="error">{erro}</Alert></Snackbar>}
        {sucesso && <Snackbar open autoHideDuration={4000} onClose={() => setSucesso(null)}><Alert severity="success">{sucesso}</Alert></Snackbar>}
        {/* Tabela de vendedores */}
        <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 4, mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.dark' }}>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>ID</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Nome</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Telefone</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Cidade</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 700 }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Renderiza cada vendedor em uma linha da tabela */}
              {vendedores.map((v) => (
                <TableRow key={v.idvendedor} hover sx={{ transition: 'background 0.2s' }}>
                  <TableCell>{v.idvendedor}</TableCell>
                  <TableCell>{v.nome}</TableCell>
                  <TableCell>{v.telefone}</TableCell>
                  <TableCell>{v.email}</TableCell>
                  <TableCell>{v.cidade}</TableCell>
                  <TableCell align="center">
                    {/* Botão de editar */}
                    <IconButton color="primary" onClick={() => abrirEdicao(v)} sx={{ mr: 1 }}>
                      <EditIcon />
                    </IconButton>
                    {/* Botão de excluir */}
                    <IconButton color="error" onClick={() => abrirExclusao(v.idvendedor)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Formulário de cadastro/edição de vendedor */}
        <FormularioVendedor
          aberto={formularioAberto}
          aoFechar={() => setFormularioAberto(false)}
          aoSubmeter={aoSubmeter}
          dadosIniciais={dadosEdicao}
        />
        {/* Modal de confirmação de exclusão */}
        <Dialog open={confirmacaoAberta} onClose={() => setConfirmacaoAberta(false)}>
          <DialogTitle>Deseja realmente excluir este vendedor?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setConfirmacaoAberta(false)}>Cancelar</Button>
            <Button onClick={confirmarExclusao} color="error" variant="contained">Excluir</Button>
          </DialogActions>
        </Dialog>
        {/* Botão flutuante para adicionar novo vendedor */}
        <Zoom in style={{ transitionDelay: '200ms' }}>
          <Fab color="secondary" aria-label="add" onClick={abrirNovo} sx={{ position: 'fixed', bottom: 32, right: 32, boxShadow: 6 }}>
            <AddIcon />
          </Fab>
        </Zoom>
      </Container>
    </Box>
  );
}

export default Aplicacao;
