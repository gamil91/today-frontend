import '../css/ModalCarousel.css'
import { useState, React } from 'react'
import { Carousel, Button } from 'react-bootstrap'
import { connect } from 'react-redux';

const NewUserCarousel = ({ close, user }) => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
// debugger
    return (
        
        <div className="font-carousel">
            <Carousel activeIndex={index} onSelect={handleSelect} interval={3000}>
            {/* <Carousel activeIndex={index} onSelect={handleSelect} > */}
                <Carousel.Item >
                <div className="pic-Div-Carousel"><img
                    className="d-block "
                    src="https://images.pexels.com/photos/3826667/pexels-photo-3826667.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Hello Greeting"
                    /></div>

                    <Carousel.Caption>
                    <h2>Hi {user.name}, Welcome to  <p id="logo-font">Today!</p></h2>
                    <h4>Take a step back and reflect through writing check-ins.</h4>
                    </Carousel.Caption>
                    
                </Carousel.Item> 
                <Carousel.Item>
                <div className="pic-Div-Carousel"><img
                    className="d-block "
                    src="https://images.pexels.com/photos/1209462/pexels-photo-1209462.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Upload "
                    /></div>

                    <Carousel.Caption>
                    <h2>Upload a photo along with your check-ins.</h2>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <div className="pic-Div-Carousel"><img
                    className="d-block"
                    src="https://images.pexels.com/photos/1851415/pexels-photo-1851415.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Like, Comment"
                    /></div>

                    <Carousel.Caption id="caption">
                    <h2 id="caption">View, Like, & Comment on check-ins</h2>
                    <Button variant="light" onClick={close}> Get started Today! </Button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default connect(state => ({user:state.user}))(NewUserCarousel);
