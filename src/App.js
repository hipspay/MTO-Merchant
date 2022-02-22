import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import PublicRoute from 'routes/PublicRoute';

import Home from 'containers/Home';
import NotFound from 'containers/NotFound';
import ProfilePage from './containers/Profile';
import ProductsPage from './containers/Products';
import ProductDetailPage from './containers/ProductDetail';
import OrdersPage from './containers/Orders';
import OrderDetailPage from './containers/OrderDetail';
import DisputesPage from './containers/Disputes';
import DisputeDetailPage from './containers/DisputeDetail';
import PendingWithdrawPage from './containers/PendingWithdraw';
import './style/index.scss';

const App = (props) => (
    <SnackbarProvider maxSnack={3}>
        <Switch>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>

            <PublicRoute exact path="/home" component={Home} props={props} />

            <PublicRoute
                exact
                path="/products"
                component={ProductsPage}
                props={props}
            />

            <PublicRoute
                exact
                path="/products/:id"
                component={ProductDetailPage}
                props={props}
            />

            <PublicRoute
                exact
                path="/orders"
                component={OrdersPage}
                props={props}
            />

            <PublicRoute
                exact
                path="/orders/:id"
                component={OrderDetailPage}
                props={props}
            />

            <PublicRoute
                exact
                path="/disputes"
                component={DisputesPage}
                props={props}
            />

            <PublicRoute
                exact
                path="/disputes/:id"
                component={DisputeDetailPage}
                props={props}
            />

            <PublicRoute
                exact
                path="/profile"
                component={ProfilePage}
                props={props}
            />

            <PublicRoute
                exact
                path="/pending-withdraw"
                component={PendingWithdrawPage}
                props={props}
            />

            <Route component={NotFound} />
        </Switch>
    </SnackbarProvider>
);

export default withRouter(App);
