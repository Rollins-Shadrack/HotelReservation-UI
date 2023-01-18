import './home.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import PropertyList from '../../components/propertyList/PropertyList'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
const Home = () =>{
    return(
        <div className='body'>
            <Navbar/>
            <Header/>
            <div className="homeContainer">
                <div className="homeContainer2">
                <Featured/>
                <h1 className="homeTitle">Browse by property type</h1>
                <PropertyList/>
                <h1 className="homeTitle">Homes Geusts Love </h1>
                < FeaturedProperties/>
                <MailList/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}
export default Home