// band_detail_page.jsx
import React from "react";
import { useParams } from "react-router-dom";

function BandDetailPage() {
    const { id } = useParams();

    return (
        <div className="container mt-4">
            <h1>Band Details</h1>
            <p>Details for band ID: {id}</p>
            {/* You can add more information and member details here */}
        </div>
    );
}

export default BandDetailPage;
