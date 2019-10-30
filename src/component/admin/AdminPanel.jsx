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
            console.log("Received realtime alert");
            let alert = JSON.parse(data.body)

            let alertList = this.state.alerts;
            alertList.unshift(alert)

            this.setState({
                alerts: alertList
            })
        });


        this.state.sockClient.askForAlerts()

        this.state.sockClient.subscribeForIngredients((message) => {
            let ingredients = JSON.parse(message.body);

            let ingredientsList = [ingredients.currentCoffeeLevel, ingredients.currentSugarLevel, ingredients.currentMilkLevel]


            this.setState({
                ingredients: ingredientsList
            })
        })


        this.state.sockClient.askForIngredients();
    }

    render() {
        return (
            <div>

                <button type="button" onClick={this.receiveAlerts}>Refresh alerts</button>

                <IngredientsLevels ingredients={this.state.ingredients}/>

                <AlertList alerts={this.state.alerts}>

                </AlertList>

            </div>
        );
    }
}

export default AdminPanel;
