import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { House, Style, CardTravel, AmpStories } from '@material-ui/icons';
import { useSelector } from 'react-redux';

import './style.scss';

const menuItems = [
    {
        title: 'Home',
        link: '/home',
        icon: <House />,
        authRequired: false,
    },
    {
        title: 'My Products',
        link: '/products',
        icon: <Style />,
        authRequired: true,
    },
    {
        title: 'My Orders',
        link: '/orders',
        icon: <CardTravel />,
        authRequired: true,
    },
    {
        title: 'Disputes',
        link: '/disputes',
        icon: <AmpStories />,
        authRequired: true,
    },
];

const Sidebar = ({ title, open }) => {
    const { connected } = useSelector((state) => state.web3);

    return (
        <div className={`app-sidebar ${open ? 'opened' : 'closed'}`}>
            <div className="logo">
                <span>{title}</span>
            </div>
            <div className="nav">
                {menuItems.map((menuItem, index) => {
                    if (menuItem.authRequired && connected) {
                        return (
                            <NavLink
                                className="nav-link"
                                to={menuItem.link}
                                activeClassName="active"
                                key={index}
                            >
                                {menuItem.icon}
                                <span>{menuItem.title}</span>
                            </NavLink>
                        );
                    }
                    if (!menuItem.authRequired) {
                        return (
                            <NavLink
                                className="nav-link"
                                to={menuItem.link}
                                activeClassName="active"
                                key={index}
                            >
                                {menuItem.icon}
                                <span>{menuItem.title}</span>
                            </NavLink>
                        );
                    }
                })}
            </div>
        </div>
    );
};
Sidebar.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
};

Sidebar.defaultProps = {
    title: '',
    open: true,
};

export default Sidebar;
