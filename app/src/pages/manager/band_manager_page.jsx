import React, {useState} from "react";
import BandPopup from "../../components/Band/popup_band_create";
import CardWidget from "../../components/Band/cards_widget";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/styles.css';


function BandManagerPage(){
    const [showPopup, setShowPopup] = useState(false);

    const handleShowPopup = () => setShowPopup(true);
    const handleClosePopup = () => setShowPopup(false);

    const bands = [
        { id: 1, name: "The Rolling Stones", genre: "Classic Rock", manager: "Jane Doe", image: "https://via.placeholder.com/150" },
        { id: 2, name: "Nirvana", genre: "Grunge", manager: "Jane Doe", image: "https://via.placeholder.com/150" },
        { id: 3, name: "Radio Head", genre: "Alternative Rock", manager: "Jane Doe", image: "https://via.placeholder.com/150" },
        // Add more bands here
    ];

    return (
        <div className="container mt-4">
            <h1>My bands</h1>

            <div className="content  mt-4 mb-4">
                <p> Ready, to create a band, click on the button bellow to start </p>

                <button className="createButton" onClick={handleShowPopup}>
                    + Create new band
                </button>
            </div>
            <BandPopup show={showPopup} handleClose={handleClosePopup} />

            <div className="content mb-4">
                <h2>Bands</h2>
                <p>Manage all your bands, to chose onde click on the arrow inside the card</p>
            </div>

            <div className="row justify-content-center">
                    {bands.map((band) => (
                        <div key={band.id} className="col-md-3 mb-4">
                            <CardWidget band={band} />
                        </div>
                    ))}
                </div>
        
        </div>
    ) 
}

export  default BandManagerPage;