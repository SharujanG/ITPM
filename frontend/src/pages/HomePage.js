
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';


const HomePage = () => {
const history = useHistory();

const donationform = async(e) => {
  history.push("/donation");
}

    return (
      <div>

   
       
    <Carousel>
      
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{maxHeight:'93vh'}}
          src="https://res.cloudinary.com/dgmrua3dm/image/upload/v1678868749/home_slide_4_eqk2vx.webp"
          alt="First slide"
        />

        <Carousel.Caption>
        <Button variant="success"  style={{width:"500px",height:"100px",opacity:"0.7",backgroundColor:"#98F516",fontSize:"60px"}} onClick={(e)=>donationform()}>Donations
        </Button>
                
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{maxHeight:'93vh'}}
          src="https://res.cloudinary.com/dgmrua3dm/image/upload/v1678868579/home_slide_0_yeuvp6.webp"
          alt="Second slide"
        />

        <Carousel.Caption>
        <Button variant="success"  style={{width:"500px",height:"100px",opacity:"0.7",backgroundColor:"#98F516",fontSize:"60px"}} onClick={donationform}> Donations
        </Button>
                
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{maxHeight:'93vh'}}
          src="https://res.cloudinary.com/dgmrua3dm/image/upload/v1678866364/home_slide_myjbkt.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
        <Button variant="success" style={{width:"500px",height:"100px",opacity:"0.7",backgroundColor:"#98F516",fontSize:"60px",}} onClick={donationform}>Donations
        </Button>
                
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
   
     </div>

    );
  }

export default HomePage;

