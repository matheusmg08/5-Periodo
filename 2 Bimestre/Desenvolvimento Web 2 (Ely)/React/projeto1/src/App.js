import Formulario from "./Formulario";
import Lista from "./Lista"
import Feriado from "./Feriado";

function App(){
  return(
    <div>
      <h1>Formulário</h1>
      <Formulario/>
      <h1>Lista de Pokemóns</h1>
      <Lista/>
      <h1>Lista de Feriados</h1>
      <Feriado/>
    </div>
  )
}

export default App;