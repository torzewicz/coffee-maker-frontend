
// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
// }
//


// return {
//     data: [],
//     series: ['France', 'Italy', 'England', 'Sweden', 'Germany'],
//     labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'],
//     colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
// }


import React, {Component} from 'react';

class Chart extends Component {
    render() {

        let data = []


        for (let [i, d] of this.props.data.entries()) {

           data.push([d])
        }


        console.log("DATA", data)


        let self = this,
            layered = false,
            stacked = false,
            max = 0;

        for (let i = data.length; i--; ) {
            for (let j = data[i].length; j--; ) {
                if (data[i][j] > max) {
                    max = data[i][j];
                }
            }
        }


        return (
            <div className={ 'Charts' + (this.props.horizontal ? ' horizontal' : '' ) }>
                { data.map(function (serie, serieIndex) {


                    let sortedSerie = serie.slice(0),
                        sum;

                    sum = serie.reduce(function (carry, current) {
                        return carry + current;
                    }, 0);

                    return (
                        <div className={ 'Charts--serie ' + (self.props.grouping) }
                             key={ serieIndex }
                             style={{ height: self.props.height ? self.props.height: 'auto' }}
                        >
                            <label>{ self.props.labels[serieIndex] }</label>
                            { serie.map(function (item, itemIndex) {
                                let color = self.props.colors[itemIndex], style,
                                    size = item / (stacked ? sum : max) * 100;

                                style = {
                                    backgroundColor: color,
                                    zIndex: item
                                };

                                if (self.props.horizontal) {
                                    style['width'] = size + '%';
                                } else {
                                    style['height'] = size + '%';
                                }

                                if (layered && !self.props.horizontal) {
                                    //console.log(sortedSerie, serie, sortedSerie.indexOf(item));
                                    style['right'] = ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%';
                                    // style['left'] = (itemIndex * 10) + '%';
                                }

                                return (
                                    <div
                                        className={ 'Charts--item ' + (self.props.grouping) }
                                        style={ style }
                                        key={ itemIndex }
                                    >
                                        <b style={{ color: color }}>{ item }</b>
                                    </div>
                                );
                            }) }
                        </div>
                    );
                }) }
            </div>
        );
    }
}

export default Chart;
