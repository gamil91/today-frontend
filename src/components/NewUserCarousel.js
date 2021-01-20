// import React from 'react';
import { useState, React } from 'react'
import { Carousel, Button } from 'react-bootstrap'

const NewUserCarousel = ({ close }) => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    return (
        <div>
            <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
                <Carousel.Item>
                <div className="pic-Div-Carousel"><img
                    className="d-block "
                    src="https://images.pexels.com/photos/3826667/pexels-photo-3826667.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Hello Greeting"
                    /></div>

                    <Carousel.Caption>
                    <h2>Welcome to Today!</h2>
                    <h4>Take a step back and reflect through writing check-ins.</h4>
                    </Carousel.Caption>
                    
                </Carousel.Item>
                <Carousel.Item>
                <div className="pic-Div-Carousel"><img
                    className="d-block "
                    src="https://images.pexels.com/photos/1209462/pexels-photo-1209462.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Upload photo"
                    /></div>

                    <Carousel.Caption>
                    <h2>Upload photos along with your check-ins.</h2>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <div className="pic-Div-Carousel"><img
                    className="d-block"
                    src="https://images.pexels.com/photos/1851415/pexels-photo-1851415.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt="Like, Comment"
                    /></div>
                    <Button variant="secondary" onClick={close}> Close </Button>

                    <Carousel.Caption>
                    <h2>View, like, and comment on other public check-ins as well.</h2>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default NewUserCarousel;
