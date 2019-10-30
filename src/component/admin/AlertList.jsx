import React, {Component} from 'react';

import './AdminPanel.scss'

class AlertList extends Component {
    render() {

        let prettyAlerts = [];

        console.log(this.props.alerts)


        for (const [index, alert] of this.props.alerts.entries()) {

            let datetime = new Date(Date.parse(alert.timestamp));

            let formattedDate = datetime.getFullYear() + "-" + (datetime.getMonth() + 1) + "-" + datetime.getDate() + " " + datetime.getHours() + ":" + datetime.getMinutes() + ":" + datetime.getSeconds()

            prettyAlerts.push(
                <li key={index} className={"notification " + alert.alarmType.toLowerCase()}>

                    <span>
                        {formattedDate}
                    </span>
                    {alert.info}
                </li>)
        }


        return (
            <div>

                <ul>
                    {prettyAlerts}

                </ul>

            </div>
        );
    }
}

export default AlertList;
