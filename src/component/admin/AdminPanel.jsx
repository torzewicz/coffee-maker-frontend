import React, {Component} from 'react';
import {AdminClientService} from "../../service/AdminClientService";
import AlertList from "./AlertList";
import IngredientsLevels from "./IngredientsLevels";

class AdminPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ingredients: [0, 0, 0],
            sockClient: {},
            alerts: []
        }

        this.initConnection = this.initConnection.bind(this);
        this.receiveAlerts = this.receiveAlerts.bind(this);
        this.setAlerts = this.setAlerts.bind(this);
        this.refillIngredients = this.refillIngredients.bind(this);
    }

    componentDidMount() {
        this.initConnection()
    }

    componentWillUnmount() {
        // this.state.sockClient.disconnect();
    }

    initConnection() {
        let adminClientService = new AdminClientService();
        adminClientService.connect(() => {
            this.receiveAlerts();
        });
        this.setState({
            sockClient: adminClientService
        });
    }

    setAlerts(alertList) {
        this.setState({
            alerts: alertList
        })
    }


    receiveAlerts() {
        this.state.sockClient.subscribeForAllAlerts((data) => {
            console.log("Received alerts");
            let alertList = JSON.parse(data.body)
            this.setAlerts(alertList)
        });


        this.state.sockClient.subscribeForRealTimeAlerts((data) => {
            console.log(data.body)
            let alert = JSON.parse(data.body)
            console.log("Received realtime alert", alert);

            let alertList = this.state.alerts;
            alertList.unshift(alert)

            this.setState({
                alerts: alertList
            })
        });


        this.state.sockClient.askForAlerts()

        let ingredientsCallback = (message) => {
            let ingredients = JSON.parse(message.body);
            console.log("Received ingredients", ingredients)

            let ingredientsList = [ingredients.currentCoffeeLevel, ingredients.currentSugarLevel, ingredients.currentMilkLevel]

            ingredientsList = ingredientsList.map(num => Math.round(num * 100) / 100);

            this.setState({
                ingredients: ingredientsList
            })
        };

        this.state.sockClient.subscribeForAdminIngredients(ingredientsCallback)
        this.state.sockClient.subscribeForIngredients(ingredientsCallback)


        this.state.sockClient.askForIngredients();
    }

    refillIngredients() {
        let ingredients = {
            currentCoffeeLevel: 1,
            currentSugarLevel: 1,
            currentMilkLevel: 1,
        };

        console.log(this)

        this.state.sockClient.updateIngredients(ingredients)
    }

    render() {
        return (
            <div>

                <button type="button" onClick={this.receiveAlerts}>Connect to alerts</button>

                <IngredientsLevels ingredients={this.state.ingredients}/>

                <AlertList alerts={this.state.alerts} refill={this.refillIngredients}>

                </AlertList>

            </div>
        );
    }
}

export default AdminPanel;
