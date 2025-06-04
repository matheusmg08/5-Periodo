import React, {Component} from 'react'
export default class App extends Component {
    state = {
        data: [],
    }
    //método executando quando o componente é inserido
    componentDidMount() {
        fetch('https://holidayapi.com/v1/holidays?pretty&key=098af81c-0cb5-47f7-9d01-97ef27b9859e&country=BR&year=2024&language=pt')
        .then((result) => result.json())
        .then((result) => {
            this.setState({
                data: result.holidays,
            })
        })
    }
    render() {
        const result = this.state.data.map((entry, index) => {
            return <option value={index}>{entry.name} | {entry.date}</option>
        })
        
        return <select>{result}</select>
    }
}
    //Alteração para exibir todos os pokemóns em um campo select
