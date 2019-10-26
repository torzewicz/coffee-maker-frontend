import React, {Component} from 'react';
import Coin from "./Coin";


/**
 * @return {string}
 */
function formatAsCurrency(amount) {
    let i = parseFloat(amount);
    if(isNaN(i)) { i = 0.00; }
    let minus = '';
    if(i < 0) { minus = '-'; }
    i = Math.abs(i);
    i = parseInt((i + .005) * 100);
    i = i / 100;
    let s = String(i);
    if(s.indexOf('.') < 0) { s += '.00'; }
    if(s.indexOf('.') === (s.length - 2)) { s += '0'; }
    s = minus + s;
    return s;
}


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
                    <Coin amount={3} onClick={this.props.onCoinInserted}/>


                    <button className="return-coins-btn" onClick={this.props.onCoinReturn}>
                        Return coins
                    </button>


                </div>

            </div>
        );
    }
}

export default InsertCoin;
