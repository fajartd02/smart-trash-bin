import React from 'react';
import Header from './Header';
import Carousel from 'react-bootstrap/Carousel';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Header />
            <Carousel variant='dark'>
                <Carousel.Item>
                    <img
                    className="d-block text-center"
                    src="assets/accurate.png"
                    alt="Second slide"
                    width={500}
                    style={{marginLeft: 'auto', marginRight: 'auto', objectFit: 'cover'}}
                    />
                    <Carousel.Caption>
                    <h3 className='text-black'>Accuracy</h3>
                    <p className='text-black'>Guaranteed Accuration</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block text-center"
                    src="assets/trust.jpg"
                    alt="First slide"
                    width={500}
                    style={{marginLeft: 'auto', marginRight: 'auto',}}
                    />
                    <Carousel.Caption>
                    <h3 className='text-black'>Trustworthy</h3>
                    <p className='text-black'>Your trusted monitoring real time</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <Link to={"/monitor"}>
                <Button 
                variant="green" 
                className='d-block text-center w-25'
                style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '2%'}}
                >
                Monitor Trash
                </Button>{' '}
            </Link>
        </div>
    );
};

export default Home;