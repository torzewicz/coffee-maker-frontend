import React, {Component} from 'react';
import Chart from "./Chart";
import './Chart.scss'


class IngredientsLevels extends Component {
    render() {
        let data = this.props.ingredients;
        let series = ['Coffee', 'Sugar', 'Milk'];
        let colors = ['#43A19E', '#7B43A1', '#F2317A'];


        return (
            <div>
                {/*<ReactApexChart series={series} type="bar" height="350"/>*/}


                <Chart
                    data={data}
                    labels={series}
                    colors={colors}
                    height={250}
                />

            </div>
        );
    }
}

export default IngredientsLevels;
