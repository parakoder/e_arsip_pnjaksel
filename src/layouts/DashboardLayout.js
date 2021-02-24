import React from 'react'
import { Route, Switch } from "react-router-dom";
import routes from "../configs/routes";
import Sidebar from '../components/sidebar/Sidebar'
import '../styles/sidebar.scss'

function DashboardLayout(props) {

    const getRoutes = routeList => {
        return routeList.map((prop, key) => {
            // console.log('prop.layout', prop.layout)
            if (prop.layout === "/sys") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                        layout={prop.layout}
                    // role={prop.role}
                    />
                );
            } else {
                return null;
            }
        });
    };


    return (
        <div className="c-layout">
            <Sidebar history={props.history}/>
            <div className="c-wrapper-content">
                <Switch>{getRoutes(routes)}</Switch>
            </div>
        </div>
    )
}

export default DashboardLayout
