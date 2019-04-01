import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';

import classify from '@magento/venia-concept/esm/classify';
import { Link, resourceUrl, Route } from 'src/drivers';
import Icon from '@magento/venia-concept/esm/components/Icon';
import SearchIcon from 'react-feather/dist/icons/search';
import MenuIcon from 'react-feather/dist/icons/menu';
import CartTrigger from '@magento/venia-concept/esm/components/Header/cartTrigger';
import NavTrigger from '@magento/venia-concept/esm/components/Header/navTrigger';
import SearchTrigger from '@magento/venia-concept/esm/components/Header/searchTrigger';

const SearchBar = React.lazy(() => import('@magento/venia-concept/esm/components/SearchBar'));

import defaultClasses from '@magento/venia-concept/esm/components/Header/header.css';
import Logo from '../Logo';

class Header extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            logo: PropTypes.string,
            primaryActions: PropTypes.string,
            root: PropTypes.string,
            open: PropTypes.string,
            closed: PropTypes.string,
            secondaryActions: PropTypes.string,
            toolbar: PropTypes.string
        }),
        searchOpen: PropTypes.bool,
        toggleSearch: PropTypes.func.isRequired
    };

    get searchIcon() {
        return <Icon src={SearchIcon} />;
    }

    render() {
        const { searchOpen, classes, toggleSearch } = this.props;

        const rootClass = searchOpen ? classes.open : classes.closed;

        return (
            <header className={rootClass}>
                <div className={classes.toolbar}>
                    <Link to={resourceUrl('/')}>
                        <Logo classes={{ logo: classes.logo }} />
                    </Link>
                    <div className={classes.primaryActions}>
                        <NavTrigger>
                            <Icon src={MenuIcon} />
                        </NavTrigger>
                    </div>
                    <div className={classes.secondaryActions}>
                        <SearchTrigger
                            searchOpen={searchOpen}
                            toggleSearch={toggleSearch}
                        >
                            {this.searchIcon}
                        </SearchTrigger>
                        <CartTrigger />
                    </div>
                </div>
                <Suspense fallback={this.searchIcon}>
                    <Route
                        render={({ history, location }) => (
                            <SearchBar
                                isOpen={searchOpen}
                                history={history}
                                location={location}
                            />
                        )}
                    />
                </Suspense>
            </header>
        );
    }
}

export default classify(defaultClasses)(Header);