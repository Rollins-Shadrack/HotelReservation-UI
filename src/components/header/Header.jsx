import {
faBed,
faCalendarDays,
faCar,
faPerson,
faPlane,
faTaxi,faChair, faMusic, faPlateWheat
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'

const Header = ({ type }) => {
const [destination, setDestination] = useState("");
const [openDate, setOpenDate] = useState(false);
const [dates, setDates] = useState([
    {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
    },
]);
const [openOptions, setOpenOptions] = useState(false);
const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
});

const navigate = useNavigate();
const { user } = useContext(AuthContext);


const handleOption = (name, operation) => {
    setOptions((prev) => {
    return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
    };
    });
};

const { dispatch } = useContext(SearchContext);

const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
};

return (
    <div className="header">
    <div
        className={
        type === "list" ? "headerContainer listMode" : "headerContainer"
        }
    >
        <Navbar  expand="lg">
    <Container>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" >
        <Nav className="me-auto ">
        <Nav.Link style={{color:"orange"}} href="/">Stay <FontAwesomeIcon icon={faBed} /></Nav.Link>
        <Nav.Link style={{color:"orange"}} href="#link">Chairs <FontAwesomeIcon icon={faChair} /></Nav.Link>
        <Nav.Link style={{color:"orange"}} href="#link">Dj's <FontAwesomeIcon icon={faMusic} /></Nav.Link>
        <Nav.Link style={{color:"orange"}} href="#link">Outside Catering <FontAwesomeIcon icon={faPlateWheat} /></Nav.Link>
        </Nav>
    </Navbar.Collapse>
    </Container>
</Navbar>
        {type !== "list" && (
        <>
            <Container>
            <h1 className="headerTitle">
            A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
            Get rewarded for your travels – unlock instant savings of 10% or
            more with a free Lamabooking account
            </p>
            <Link to="/login">
            {!user && <button className="btn_submit">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Sign in / Register
            </button>}
            </Link>
            </Container>
            <div className="headerSearch">
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                type="text"
                placeholder="Where are you going?"
                className="headerSearchInput"
                onChange={(e) => setDestination(e.target.value)}
                />
            </div>
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                onClick={() => setOpenDate(!openDate)}
                className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                />
                )}
            </div>
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                onClick={() => setOpenOptions(!openOptions)}
                className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                <div className="options">
                    <div className="optionItem">
                    <span className="optionText">Adult</span>
                    <div className="optionCounter">
                        <button
                        disabled={options.adult <= 1}
                        className="optionCounterButton"
                        onClick={() => handleOption("adult", "d")}
                        >
                        -
                        </button>
                        <span className="optionCounterNumber">
                        {options.adult}
                        </span>
                        <button
                        className="optionCounterButton"
                        onClick={() => handleOption("adult", "i")}
                        >
                        +
                        </button>
                    </div>
                    </div>
                    <div className="optionItem">
                    <span className="optionText">Children</span>
                    <div className="optionCounter">
                        <button
                        disabled={options.children <= 0}
                        className="optionCounterButton"
                        onClick={() => handleOption("children", "d")}
                        >
                        -
                        </button>
                        <span className="optionCounterNumber">
                        {options.children}
                        </span>
                        <button
                        className="optionCounterButton"
                        onClick={() => handleOption("children", "i")}
                        >
                        +
                        </button>
                    </div>
                    </div>
                    <div className="optionItem">
                    <span className="optionText">Room</span>
                    <div className="optionCounter">
                        <button
                        disabled={options.room <= 1}
                        className="optionCounterButton"
                        onClick={() => handleOption("room", "d")}
                        >
                        -
                        </button>
                        <span className="optionCounterNumber">
                        {options.room}
                        </span>
                        <button
                        className="optionCounterButton"
                        onClick={() => handleOption("room", "i")}
                        >
                        +
                        </button>
                    </div>
                    </div>
                </div>
                )}
            </div>
            <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                Search
                </button>
            </div>
            </div>
        </>
        )}
    </div>
    </div>
);
};

export default Header;