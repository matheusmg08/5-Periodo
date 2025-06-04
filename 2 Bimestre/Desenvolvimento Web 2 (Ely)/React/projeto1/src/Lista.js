import React, {Component} from 'react'
export default class App extends Component {
    state = {
        data: [],
    }
    //método executando quando o componente é inserido
    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100.json')
        .then((result) => result.json())
        .then((result) => {
            this.setState({
                data: result.results,
            })
        })
    }
    render() {
        const result = this.state.data.map((entry, index) => {
            return <option value={index}>{entry.name}</option>
        })
        
        return <select>{result}</select>
    }
}
    //Alteração para exibir todos os pokemóns em um campo select
