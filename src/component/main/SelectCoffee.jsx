import React, {Component} from 'react';
import './CoffeeMaker.scss'

import {formatAsCurrency} from './../../utils/formatters'


class SelectCoffee extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedCoffee: null
        }

        this.handleOptionChange = this.handleOptionChange.bind(this)

    }

    handleOptionChange(event) {
        this.setState({
            selectedCoffee: event.target.value
        })
    }

    render() {

        const items = [];

        for (const [index, coffee] of this.props.coffeeList.entries()) {
            items.push(
                <div className="select-coffee-label" key={index}>

                    <input type="radio"
                           name="coffeeSelect"
                           id={"coffee" + index}
                           value={coffee.id}
                           onChange={this.handleOptionChange}
                           disabled={this.props.availableCredit < coffee.price}/>
                    <label htmlFor={"coffee" + index} className="radio-label">
                        <div className="coffee-label-container">
                            <span className="coffee-name">{coffee.name}</span>
                            <span className="coffee-price">{formatAsCurrency(coffee.price)} zł</span>
                        </div>

                    </label>

                </div>
            )
        }

        return (
            <div className="tile select-coffee-container">

                <span>Select Your Coffee</span>

                <ul>
                    {items}
                </ul>

                <button className="confirm-order-btn"
                        onClick={() => {
                            console.log("Selected: elo" + this.state.selectedCoffee);
                            this.props.onConfirmOrder(this.state.selectedCoffee)
                        }}
                >
                    Confirm order
                </button>

            </div>
        );
    }
}

export default SelectCoffee;
