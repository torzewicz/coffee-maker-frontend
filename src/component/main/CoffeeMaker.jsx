import React, {Component} from 'react';
import InsertCoin from "./InsertCoin";
import './CoffeeMaker.scss'
import SelectCoffee from "./SelectCoffee";

class CoffeeMaker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            credit: 0.0,
            selectedCoffeeId: null,
            coffeeList: [
                {
                    id: 0,
                    name: 'Espresso',
                    price: 1.5
                },
                {
                    id: 1,
                    name: 'Americano',
                    price: 2
                },
                {
                    id: 2,
                    name: 'Flat White',
                    price: 2.5
                },
                {
                    id: 3,
                    name: 'Cappuccino',
                    price: 2.5
                },
                {
                    id: 4,
                    name: 'Latte',
                    price: 3
                },
            ]
        };

        this.onCoinInserted = this.onCoinInserted.bind(this);
        this.onCoinReturn = this.onCoinReturn.bind(this);
        this.onCoffeeSelected = this.onCoffeeSelected.bind(this);

    }

    onCoinInserted(amount) {
        const newAmount = this.state.credit + amount;
        this.setState({credit: newAmount})
    }

    onCoinReturn() {
        this.setState({credit: 0.0})
    }

    onCoffeeSelected(id) {
        this.setState({selectedCoffeeId: id})
    }

    render() {
        return (
            <div>
                <InsertCoin
                    credit={this.state.credit}
                    onCoinInserted={this.onCoinInserted}
                    onCoinReturn={this.onCoinReturn}
                />


                <SelectCoffee
                    selectedCoffeeId={this.state.selectedCoffeeId}
                    coffeeList={this.state.coffeeList}
                    availableCredit={this.state.credit}
                />
            </div>
        );
    }
}

export default CoffeeMaker;
