// Função para medir e reportar métricas de performance da aplicação
// Pode ser usada para monitorar o desempenho do React em produção
const relatarMetricasWeb = aoReceberMetrica => {
  // Verifica se foi passada uma função para receber as métricas
  if (aoReceberMetrica && aoReceberMetrica instanceof Function) {
    // Importa dinamicamente o pacote web-vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Chama a função recebida para cada métrica de performance
      getCLS(aoReceberMetrica); // Deslocamento Cumulativo de Layout
      getFID(aoReceberMetrica); // Primeiro Atraso de Entrada
      getFCP(aoReceberMetrica); // Primeiro Paint com Conteúdo
      getLCP(aoReceberMetrica); // Maior Paint com Conteúdo
      getTTFB(aoReceberMetrica); // Tempo até o Primeiro Byte
    });
  }
};

export default relatarMetricasWeb;
