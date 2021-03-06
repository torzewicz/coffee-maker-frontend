import React, {Component} from 'react';
import {CoffeeClientService} from "../service/CoffeeClientService";


class WsExample extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sockClient: {},
            name: ""
        };

        this.initConnection = this.initConnection.bind(this);
        this.askForIngredients = this.askForIngredients.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);

    }


    initConnection() {
        let coffeeClientService = new CoffeeClientService();
        coffeeClientService.connect();

        this.setState({
            sockClient: coffeeClientService
        });
    }


    askForIngredients() {
        // this.state.sockClient.sendName(this.state.name)
        this.state.sockClient.subscribeForIngredients();
        this.state.sockClient.askForIngredients()
        // this.state.sockClient.sendName(this.state.name)
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }


    render() {
        return (
            <div id="main-content" className="container">
                <div className="row">
                    <div className="col-md-6">
                        <form className="form-inline">
                            <div className="form-group">
                                <button type="button" onClick={this.initConnection}>Connect</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <form className="form-inline">
                            {/*<div className="form-group">*/}
                            {/*    <input type="text" id="name" className="form-control"*/}
                            {/*           placeholder="Your name here..." onChange={this.handleNameChange} value={this.state.name}/>*/}
                            {/*</div>*/}
                            <button onClick={this.askForIngredients} type="button">Ask for ingredients</button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table id="conversation" className="table table-striped">
                            <thead>
                            <tr>
                                <th>Greetings</th>
                            </tr>
                            </thead>
                            <tbody id="greetings">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}

export default WsExample;
