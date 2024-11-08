import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/styles.css';

function BandManagerPage(){
    return (
        <div className="container mt-4">
            <h1 className="text-center">My bands</h1>

            <div className="content text-center mb-4">
                <p> Ready, to create a band, click on the button bellow to start </p>
            </div>
            <button className="createButton">+ Create new band</button>

            <div className="content mb-4">
                <h2>Bands</h2>
                <p>Manage all your bands, to chose onde click on the arrow inside the card</p>
            </div>


        </div>
    ) 
}

export  default BandManagerPage;