// Importa React e hooks necessários
import React, { useEffect, useState } from 'react';
// Importa componentes do Material UI para a interface
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Snackbar, Alert, IconButton, Dialog, DialogTitle, DialogActions, Box, AppBar, Toolbar, Fab, Zoom, Fade, Stack, Card, CardActionArea, CardContent, CardActions
} from '@mui/material';
// Importa ícones do Material UI
import AddIcon from '@mui/icons-material/Add'; // Ícone de adicionar
import EditIcon from '@mui/icons-material/Edit'; // Ícone de editar
import DeleteIcon from '@mui/icons-material/Delete'; // Ícone de deletar
import StorefrontIcon from '@mui/icons-material/Storefront'; // Ícone de loja para o header
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// Importa o componente de formulário de vendedor
import FormularioVendedor from './VendedorForm';

// Componente principal da aplicação
function Aplicacao() {
  // Estado para controlar a tela atual: 'menu', 'listar', 'cadastrar', 'editar'
  const [tela, setTela] = useState('menu');
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
    if (tela === 'listar') {
      buscarVendedores(); // Busca vendedores ao abrir a página
    }
  }, [tela]);

  // Abre o formulário para cadastrar novo vendedor
  const abrirNovo = () => {
    setDadosEdicao(null); // Limpa dados de edição
    setFormularioAberto(true); // Abre o modal
  };

  // Função para inserir ou editar vendedor
  const aoSubmeter = async (formulario) => {
    setCarregando(true);
    setErro(null);
    try {
      let resposta;
      if (dadosEdicao) {
        resposta = await fetch(`/vendedor/${dadosEdicao.idvendedor}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formulario)
        });
      } else {
        resposta = await fetch('/vendedor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formulario)
        });
      }
      if (!resposta.ok) throw new Error('Erro ao salvar vendedor');
      setSucesso(dadosEdicao ? 'Vendedor alterado com sucesso!' : 'Vendedor cadastrado com sucesso!');
      setFormularioAberto(false);
      setTela('listar');
      await buscarVendedores(); // Atualiza a lista automaticamente
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
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
      await buscarVendedores(); // Atualiza a lista automaticamente
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
        {/* MENU INICIAL COM CARDS */}
        <Fade in={tela === 'menu'} unmountOnExit>
          <Box display={tela === 'menu' ? 'flex' : 'none'} flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh" gap={4}>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
              Seja bem-vindo!
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
              {/* Card para Listar Vendedores */}
              <Card sx={{ minWidth: 260, boxShadow: 6, borderRadius: 4, transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'scale(1.05)', boxShadow: 12 }, cursor: 'pointer', bgcolor: 'background.paper' }} onClick={() => setTela('listar')}>
                <CardActionArea>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                    <ListAltIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Listar Vendedores
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              {/* Card para Cadastrar Vendedor */}
              <Card sx={{ minWidth: 260, boxShadow: 6, borderRadius: 4, transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'scale(1.05)', boxShadow: 12 }, cursor: 'pointer', bgcolor: 'background.paper' }} onClick={() => setTela('cadastrar')}>
                <CardActionArea>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                    <PersonAddAltIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Cadastrar Vendedor
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Stack>
          </Box>
        </Fade>
        {/* LISTAGEM DE VENDEDORES */}
        <Fade in={tela === 'listar'} unmountOnExit>
          <Box display={tela === 'listar' ? 'block' : 'none'}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                Vendedores
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="secondary" onClick={() => setTela('menu')} sx={{ borderRadius: 8, fontWeight: 600 }}>
                  Voltar ao Menu
                </Button>
              </Stack>
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
                        <IconButton color="primary" onClick={() => { setDadosEdicao(v); setFormularioAberto(true); }} sx={{ mr: 1 }}>
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
              <Fab color="secondary" aria-label="add" onClick={() => { setDadosEdicao(null); setFormularioAberto(true); }} sx={{ position: 'fixed', bottom: 32, right: 32, boxShadow: 6 }}>
                <AddIcon />
              </Fab>
            </Zoom>
            {/* Formulário de cadastro/edição de vendedor */}
            <FormularioVendedor
              aberto={formularioAberto}
              aoFechar={() => setFormularioAberto(false)}
              aoSubmeter={aoSubmeter}
              dadosIniciais={dadosEdicao}
            />
          </Box>
        </Fade>
        {/* CADASTRO DE NOVO VENDEDOR */}
        <Fade in={tela === 'cadastrar'} unmountOnExit>
          <Box display={tela === 'cadastrar' ? 'block' : 'none'}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                Cadastrar Vendedor
              </Typography>
              <Button variant="contained" color="secondary" onClick={() => setTela('menu')} sx={{ borderRadius: 8, fontWeight: 600 }}>
                Voltar ao Menu
              </Button>
            </Box>
            <FormularioVendedor
              aberto={true}
              aoFechar={() => setTela('menu')}
              aoSubmeter={aoSubmeter}
              dadosIniciais={null}
            />
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}

export default Aplicacao;
