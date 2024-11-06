import React from "react";
import '../../assets/styles/styles.css';

function BandManagerPage(){
    return (
        <div>
            <h1>My bands</h1>

            <div className="content">
                <p> Ready, to create a band, click on the button bellow to start </p>
            </div>
            <button className="createButton">+ Create new band</button>

            <div className="content">
                <h2>Bands</h2>
                <p>Manage all your bands, to chose onde click on the arrow inside the card</p>
            </div>


        </div>
    ) 
}

export  default BandManagerPage;