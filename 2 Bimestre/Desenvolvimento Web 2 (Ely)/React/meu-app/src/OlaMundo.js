import React from 'react';
export default class OlaMundo extends React.Component { 
    render() {
        return (
            <div>
                Olá, {this.props.nome} você tem {this.props.idade} anos.
            </div>
        );
    }
}
