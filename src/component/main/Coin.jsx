import React, {Component} from 'react';
import './CoffeeMaker.scss'



function formatAsCoinValue(amount) {
    let i = parseFloat(amount);
    if(isNaN(i)) { i = 0; }
    let s = String(i);
    if (i < 1) {
        if(s.indexOf('.') === (s.length - 2)) { s += '0'; }
        s = s.slice(1)
    }
    return s;
}

class Coin extends Component {

    render() {
        return (
            <div className="coin" onClick={() => {this.props.onClick(this.props.amount)}}>
                {formatAsCoinValue(this.props.amount)}
            </div>
        );
    }
}

export default Coin;
