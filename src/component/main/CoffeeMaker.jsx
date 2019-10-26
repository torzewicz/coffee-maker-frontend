import React, {Component} from 'react';
import InsertCoin from "./InsertCoin";
import './CoffeeMaker.scss'

class CoffeeMaker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            credit: 0.0
        }

        this.onCoinInserted = this.onCoinInserted.bind(this);
        this.onCoinReturn = this.onCoinReturn.bind(this);
    }

    onCoinInserted(amount) {
        const newAmount = this.state.credit + amount;
        this.setState({credit: newAmount})
    }

    onCoinReturn() {
        this.setState({credit: 0.0})
    }

    render() {
        return (
            <div>
                <InsertCoin
                    credit={this.state.credit}
                    onCoinInserted={this.onCoinInserted}
                    onCoinReturn={this.onCoinReturn}
                />
            </div>
        );
    }
}

export default CoffeeMaker;
