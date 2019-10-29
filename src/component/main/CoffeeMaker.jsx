import React, {Component} from 'react';
import InsertCoin from "./InsertCoin";
import './CoffeeMaker.scss'
import SelectCoffee from "./SelectCoffee";
import {CoffeeClientService} from "../../service/CoffeeClientService";
import {MixingContainer} from "../../service/MixingContainer";
import SugarSlider from "./SugarSlider";

class CoffeeMaker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sockClient: {},
            credit: 0.0,
            sugar: 0.04,
            // selectedCoffeeId: null,
            coffeeList: [
                {
                    id: 0,
                    name: 'Espresso',
                    price: 1.5,
                    ingredients: {
                        coffee: 0.04,
                        sugar: 0.02,
                        milk: 0.0
                    }
                },
                {
                    id: 1,
                    name: 'Americano',
                    price: 2,
                    ingredients: {
                        coffee: 0.06,
                        sugar: 0.02,
                        milk: 0.0
                    }
                },
                {
                    id: 2,
                    name: 'Flat White',
                    price: 2.5,
                    ingredients: {
                        coffee: 0.04,
                        sugar: 0.02,
                        milk: 0.04
                    }
                },
                {
                    id: 3,
                    name: 'Cappuccino',
                    price: 2.5,
                    ingredients: {
                        coffee: 0.03,
                        sugar: 0.02,
                        milk: 0.05
                    }
                },
                {
                    id: 4,
                    name: 'Latte',
                    price: 3,
                    ingredients: {
                        coffee: 0.04,
                        sugar: 0.02,
                        milk: 0.06
                    }
                },
            ]
        };

        this.onCoinInserted = this.onCoinInserted.bind(this);
        this.onCoinReturn = this.onCoinReturn.bind(this);
        this.onCoffeeSelected = this.onCoffeeSelected.bind(this);

        this.initConnection = this.initConnection.bind(this);
        this.askForIngredients = this.askForIngredients.bind(this);
        this.confirmOrderHandler = this.confirmOrderHandler.bind(this);
        this.handleSugarChange = this.handleSugarChange.bind(this);



    }

    componentDidMount() {
        this.initConnection()
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

    initConnection() {
        let coffeeClientService = new CoffeeClientService();
        coffeeClientService.connect();

        this.setState({
            sockClient: coffeeClientService
        });
    }

    askForIngredients(callback) {
        this.state.sockClient.subscribeForIngredients(callback);
        this.state.sockClient.askForIngredients()
    }


    confirmOrderHandler(selectedCoffeeId) {
        console.log("Order confirmed");
        console.log("Selected coffee", selectedCoffeeId);

        let selectedCoffee = this.state.coffeeList.filter((coffee) => {
            return coffee.id.toString() === selectedCoffeeId.toString();
        });

        selectedCoffee = selectedCoffee[0];

        selectedCoffee.ingredients.sugar = this.state.sugar;



        this.askForIngredients((message) => {

            const cupDispensed = this.cupWasDispensed();



            if (!cupDispensed) {
                // todo send alert and display message

            } else {
                let ingredients = JSON.parse(message.body);

                let mixingContainer = new MixingContainer(ingredients);

                mixingContainer.onCompleted(() => {
                    console.log("Coffee Done");
                });

                mixingContainer.onIngredientsAdded((remainingIngredients) => {
                    this.state.sockClient.updateIngredients(remainingIngredients)
                });

                mixingContainer.makeCoffee(selectedCoffee)
            }



        });


    }


    cupWasDispensed() {
        return true;
    }


    handleSugarChange(_, value) {
        value = value / 50;
        this.setState({
            sugar: value
        })
    }

    render() {
        return (
            <div>
                <InsertCoin
                    credit={this.state.credit}
                    onCoinInserted={this.onCoinInserted}
                    onCoinReturn={this.onCoinReturn}
                />

                <SugarSlider onChange={this.handleSugarChange}/>


                <SelectCoffee
                    selectedCoffeeId={this.state.selectedCoffeeId}
                    coffeeList={this.state.coffeeList}
                    availableCredit={this.state.credit}
                    onConfirmOrder={this.confirmOrderHandler}
                />
            </div>
        );
    }
}

export default CoffeeMaker;
