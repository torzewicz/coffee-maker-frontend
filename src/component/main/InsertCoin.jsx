import React, {Component} from 'react';
import Coin from "./Coin";

import {formatAsCurrency} from './../../utils/formatters'

class InsertCoin extends Component {

    constructor(props) {
        super(props);

        console.log(this.props)
    }

    handleInsertCoin(amount) {
        this.props.onCoinInserted(amount)
}


    render() {
        return (
            <div className="tile insert-coin">
                <span>Insert coins</span>

                <div className="amount">
                    <span>{formatAsCurrency(this.props.credit)}</span>

                    <span className="currency">zł</span>
                </div>

                <span>Click on a coin to insert it</span>

                <div className="coins">

                    <Coin amount={0.1} onClick={this.props.onCoinInserted}/>
                    <Coin amount={0.2} onClick={this.props.onCoinInserted}/>
                    <Coin amount={0.5} onClick={this.props.onCoinInserted}/>
                    <Coin amount={1} onClick={this.props.onCoinInserted}/>
                    <Coin amount={2} onClick={this.props.onCoinInserted}/>
                    <Coin amount={5} onClick={this.props.onCoinInserted}/>


                    <button className="return-coins-btn" onClick={this.props.onCoinReturn}>
                        Return coins
                    </button>


                </div>

            </div>
        );
    }
}

export default InsertCoin;
