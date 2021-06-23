import React, { Component } from 'react';
import { 
    Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Modal, ModalHeader, ModalBody,
    Form, FormGroup ,Label, Input, Button
} from 'reactstrap';
import { NavLink, Link} from 'react-router-dom';
import './header.styles.scss';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            className:""
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount(){
        window.addEventListener("scroll", this.handleScroll);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        console.log(`Username: ${this.username.value} Password: ${this.password.value} Remember: ${this.remember.checked}`);
        this.toggleModal();
        event.preventDefault();
    }

    handleScroll = () => {

        if (window.pageYOffset > 80) {
            if( ! this.state.className) {
                this.setState({ className: "scroll-background" });   
            }
        } else {
            this.setState({ className: "" });
        }
    }

    //fix this
    handleMapHeader = () => {

        console.log('hello');
        this.setState({ className: "scroll-background" }); 
    }

    render() {

        const {isNavOpen, isModalOpen} = this.state;

        return(
            <React.Fragment>
                <Navbar role="navigation" sticky="top" color="light" expand="md" fixed="true" className={this.state.className}>
                    <div className="container-fluid">
                        <NavbarBrand className="mr-auto" href="/">Colorado Beer Map</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={isNavOpen} navbar>
                            <Nav navbar className="navbar-nav ml-auto">
                                <UncontrolledDropdown>
                                    <DropdownToggle className="nav-link" caret>
                                        Cities
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <Link to={{
                                                pathname: "/city-listing/boulder",
                                                state: { 
                                                    cityName: 'Boulder',
                                                    cityId: 164
                                                }
                                            }}
                                            >
                                            Boulder
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to={{
                                                    pathname: "/city-listing/colorado-springs",
                                                    state: { 
                                                        cityName: 'Colorado Springs',
                                                        cityId: 162
                                                    }
                                                }}
                                            >
                                            Colorado Springs
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to={{
                                                    pathname: "/city-listing/denver",
                                                    state: { 
                                                        cityName: 'Denver',
                                                        cityId: 161
                                                    }
                                                }}
                                            >
                                            Denver
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to={{
                                                    pathname: "/city-listing/durango",
                                                    state: { 
                                                        cityName: 'Durango',
                                                        cityId: 166
                                                    }
                                                }}
                                            >
                                            Durango
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to={{
                                                    pathname: "/city-listing/ft-collins",
                                                    state: { 
                                                        cityName: 'Fort Collins',
                                                        cityId: 163
                                                    }
                                                }}
                                            >
                                            Ft. Collins
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to={{
                                                    pathname: "/city-listing/pueblo",
                                                    state: { 
                                                        cityName: 'Pueblo',
                                                        cityId: 167
                                                    }
                                                }}
                                            >
                                            Pueblo
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to={{
                                                    pathname: "/city-listing/summit-county",
                                                    state: { 
                                                        cityName: 'Summit County',
                                                        cityId: 165
                                                    }
                                                }}
                                            >
                                            Summit County
                                            </Link>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <NavItem>
                                    <NavLink className="map-page nav-link" to={{ pathname: "/map"}}>Map</NavLink>
                                </NavItem>
                                <span className="navbar-text ml-auto">
                            </span>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

                <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" innerRef={input => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" innerRef={input => this.password = input } />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember" innerRef={input => this.remember = input } />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="Submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </React.Fragment>
        );
    }
}
    
export default Header;