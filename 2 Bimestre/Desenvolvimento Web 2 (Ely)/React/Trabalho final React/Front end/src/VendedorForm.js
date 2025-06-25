// Importa React e os hooks useState e useEffect
import React, { useState, useEffect } from 'react';
// Importa componentes do Material UI para o formulário
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';

// Componente de formulário reutilizável para cadastro e edição de vendedor
export default function FormularioVendedor({ aberto, aoFechar, aoSubmeter, dadosIniciais }) {
  // Estado local do formulário, armazena os valores dos campos
  const [formulario, setFormulario] = useState({ nome: '', telefone: '', email: '', cidade: '' });

  // Atualiza o formulário quando abre ou quando recebe dados para edição
  useEffect(() => {
    if (dadosIniciais) {
      setFormulario(dadosIniciais); // Preenche com dados do vendedor para editar
    } else {
      setFormulario({ nome: '', telefone: '', email: '', cidade: '' }); // Limpa para novo cadastro
    }
  }, [dadosIniciais, aberto]);

  // Atualiza o estado do formulário conforme o usuário digita
  const aoAlterar = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value }); // Atualiza o campo correspondente
  };

  // Ao submeter o formulário, chama a função recebida por props
  const aoEnviar = (e) => {
    e.preventDefault(); // Evita recarregar a página
    aoSubmeter(formulario); // Chama a função de submit do App
  };

  return (
    // Modal do Material UI
    <Dialog open={aberto} onClose={aoFechar}>
      {/* Título do modal muda conforme é edição ou cadastro */}
      <DialogTitle>{dadosIniciais ? 'Editar Vendedor' : 'Novo Vendedor'}</DialogTitle>
      {/* Formulário controlado */}
      <form onSubmit={aoEnviar}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Campos do formulário */}
            <TextField label="Nome" name="nome" value={formulario.nome} onChange={aoAlterar} required />
            <TextField label="Telefone" name="telefone" value={formulario.telefone} onChange={aoAlterar} required />
            <TextField label="Email" name="email" value={formulario.email} onChange={aoAlterar} required type="email" />
            <TextField label="Cidade" name="cidade" value={formulario.cidade} onChange={aoAlterar} required />
          </Box>
        </DialogContent>
        <DialogActions>
          {/* Botão de cancelar fecha o modal */}
          <Button onClick={aoFechar}>Cancelar</Button>
          {/* Botão de submit cadastra ou salva */}
          <Button type="submit" variant="contained" color="primary">{dadosIniciais ? 'Salvar' : 'Cadastrar'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
