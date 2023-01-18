import './footer.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter,faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons"
const Footer = () =>{
    return(
        <div className="footer">
<Row>
    <Col sm className="footer-col">
    <h4>company</h4>
    <ul>
        <li><a href="#">about us</a></li>
        <li><a href="#">our services</a></li>
        <li><a href="#">privacy policy</a></li>
        <li><a href="#">affiliate program</a></li>
    </ul>
    </Col>
    <Col sm className="footer-col">
    <h4>get help</h4>
        <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">shipping</a></li>
            <li><a href="#">returns</a></li>
            <li><a href="#">order status</a></li>
            <li><a href="#">payment options</a></li>
        </ul>
    </Col>
    <Col sm className="footer-col">
    <h4>online shop</h4>
    <ul>
        <li><a href="#">watch</a></li>
        <li><a href="#">bag</a></li>
        <li><a href="#">shoes</a></li>
        <li><a href="#">dress</a></li>
    </ul>
    </Col>
    <Col sm className="footer-col">
    <h4>follow us</h4>
    <div class="social-links">
        <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
        <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
        <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
        <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
    </div>
    </Col>

</Row>
    <div className="fText">Copyright &copy; 2022</div>
        </div>
    )
}
 export default Footer