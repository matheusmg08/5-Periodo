import React from "react";

export default class Formulario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nota: 0,
            situacao: ""
        };
    }

    render(){
        return (
            <div>
                <h3>Notas</h3>
                <label>Nota:
                    <input id="nota" onChange={this.handleInputChange.bind(this)} value = {this.state.nota} />

                    <button onClick={this.calcular.bind(this)}>Calcular</button>

                    <div>{this.state.situacao}</div>
                </label>
            </div>
        )
    }

    handleInputChange(e) {
        this.setState({
            [e.target.id] : e.target.value
        });
    }
    calcular() {
        let s;
        if (this.state.nota >= 70) {
            s = "Aprovado";
        } else {
            s = "Reprovado";
        }
        this.setState({situacao: s});
    }
}
