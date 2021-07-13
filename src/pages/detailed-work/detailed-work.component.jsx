import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Loader from '../../components/utilities/loader.component';
import parse from 'html-react-parser';
import './detailed-work.styles.scss';

class DetailedWork extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    renderRow = apiData => {

        if(apiData.content.rendered || apiData.acf.specials) {
            return(
                <Row className="my-5">
                    <Col>
                        <h5 className="border-bottom pb-2">Description</h5>
                        { parse(apiData.content.rendered) }
                    </Col>
                    <Col>
                        <h5 className="border-bottom pb-2">Specials</h5>
                        <p>{ apiData.acf.specials }</p>
                    </Col>
                </Row>
            );
        }
    }

    renderSingleBrewery = apiData => {

        if(!Object.keys(apiData).length > 0) {
            return <Loader />;
        }
        else {
            return(
                <React.Fragment>
                    <Container key={apiData.id}>
                        <Row className="my-5">
                            <Col md="8">
                                <h1 className="display-4">{parse(apiData.title.rendered)}</h1>
                            </Col>
                            <Col md="4">
                                <h4 className="border-bottom pb-2">Location</h4>
                                <p>{apiData.acf.location.address}</p>
                                <p>{apiData.acf.location.city}, Colorado {apiData.acf.location.zip_code}</p>
                                <p>{apiData.acf.location.phone_number}</p>
                            </Col>
                        </Row>
                        <Row className="my-5">
                            <Col>
                                <h5 className="border-bottom pb-2">Description</h5>
                                ${ parse(apiData.content.rendered) }
                            </Col>
                            <Col>
                                <h5 className="border-bottom pb-2">Specials</h5>
                                <p>${ apiData.acf.specials }</p>
                            </Col>
                        </Row>
                        <Row className="my-5">
                            <Col md="6">
                                <h6 className="border-bottom pb-2">On Tap</h6>
                                <p>${ apiData.acf.beers }</p>
                            </Col>
                            <Col md="6">
                                <h6 className="border-bottom pb-2">Food Truck Schedule</h6>
                                <p>${ apiData.acf.foodtrucks }</p>
                            </Col>
                        </Row>
                    </Container>
                </React.Fragment> 
            );
        }
    }

    componentDidMount () {
        this._isMounted = true;
        this.getSingleBrewery();
        this.setState({isLoading: false});
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {

        const { breweries } = this.state;

        return(
            <section className='detailed-listing'>
                {this.renderSingleBrewery(breweries)}
            </section>
        );
    }
}

export default DetailedWork;