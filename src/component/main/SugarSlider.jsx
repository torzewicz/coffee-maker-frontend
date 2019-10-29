import React, {Component} from 'react';
import './CoffeeMaker.scss'
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const StyledSlider = withStyles({
    root: {
        color: '#FBDD41',
    }
})(Slider);


class SugarSlider extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className="tile sugar-slider">

                <span>
                    Amount of sugar
                </span>

                <StyledSlider
                    onChange={this.props.onChange}
                    defaultValue={2}
                    aria-labelledby="discrete-slider"
                    // valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={5}
                />

            </div>
        );
    }
}

export default SugarSlider;
