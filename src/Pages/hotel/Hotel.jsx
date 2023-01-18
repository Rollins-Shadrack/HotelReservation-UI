import './hotel.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import Reserve from '../../components/reserve/Reserve'
import {useState,useContext} from 'react'
import {faLocationDot,faCircleXmark,faCircleArrowLeft,faCircleArrowRight} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from '../../context/AuthContext'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const Hotel = () =>{
    const location = useLocation()
    const id = location.pathname.split("/")[2];
    
    const { data, loading, error } = useFetch(`https://booking-a.herokuapp.com/api/hotels/find/${id}`);
    const {dates, options} = useContext(SearchContext)
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
    }
    const days = (dayDifference(dates[0].endDate, dates[0].startDate))
    const [slideNumber,setSlideNumber] = useState(0)
    const [open,setOpen] = useState(false)
    const [openModal,setOpenModal] = useState(false)
    const handleOpen =(i) =>{
        setSlideNumber(i);
        setOpen(true)
    }
    const handleMove = (direction) =>{
        let newSlideNumber;
        if (direction === "l") {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
        newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }
    
        setSlideNumber(newSlideNumber)
    }
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleClick = () =>{
        // if(user || !user){
        //     setOpenModal(true)
        // }else{
        //     navigate("/login")
        // }
        setOpenModal(true)
    }
    return(
        <div>
            <Navbar/>
            <Header type='list'/>
                { loading ? ("Loading Please wait" ): (<div className="hotelContainer">
                {open && <div className="slider">
                    <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={()=> setOpen(false)}/>
                    <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove('l')}/>
                    <div className="sliderWrapper">
                        <img src={data.photos[slideNumber].src} alt="" className="sliderImg" />
                    </div>
                    <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove('r')}/>
                </div>}
                <Container className="hotelWrapper">
                    <h1 className="hotelTitle">{data.name}</h1>
                    <div className="hotelAddress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{data.address}</span>
                    </div>
                    <span className="hotelDistance">
                        Excellent Location - {data.distance} from center
                    </span>
                    <span className="hotelPriceHighlight">
                        Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
                    </span>
                    <div className="hotelImages">
                        {data.photos?.map((photo,i) =>(
                            <div className="hotelImgWrapper">
                                <img onClick={()=> handleOpen(i)} src={photo} alt="" className="hotelImg" />
                            </div>
                        ))}
                    </div>
                    <Row>
                <div className="hotelDetails">
                <Col sm>
                <div className="hotelDetailsTexts">
    <h1 className="hotelTitle">{data.title}</h1>
    <p className="hotelDesc">
                    {data.desc}
    </p>
</div>
                </Col>
                
            
            <Col sm className="hotelDetailsPrice">
    <h1>Perfect for a {days}-night stay!</h1>
    <span>
    Located in the real heart of Krakow, this property has an
    excellent location score of {data.rating}!
    </span>
    <h2>
    <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
    </h2>
    <button onClick={handleClick}>Reserve or Book Now!</button>
</Col>
                
        </div>
        </Row>
                </Container>
                <MailList/>
                <Footer />
            </div>)}
            {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
        </div>
    )
}
export default Hotel