import { useContext, useEffect, useState } from "react";
import "./hotel.css";
import axios from "axios";

export default function Hotel({ username }) {
    const [allHotelsList, setAllHotelsList] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;


    useEffect(() => {
        const fetchAllHotels = async () => {
            try {
                const AllHotels = await axios.get("/api/services/hotel");
                // console.log("MissingPets", MissingPets.data)
                setAllHotelsList(AllHotels.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllHotels();
    }, []);

    return (
        <div className="adoptpets">
            <div className="adoptpetsWrapper">
                <h2 style={{ textDecoration: "none", color: "black", textAlign: "center",marginBottom:"10px" }}>Have you seen these pets?</h2>
                <div className="petAdoptBoxs">
                {allHotelsList.map(hotel => {
                    return <div key={hotel._id} style={{ textDecoration: "none", color: "black", textAlign: "center" }}>
                        <div className="petAdoptBox">
                                <img
                                    className="rightbarFollowingImg"
                                    src={PF + "pet/1.jpg"}
                                    alt=""
                                />

                            <span className="rightbarFollowingName">{hotel.servicename}</span>
                            <span className="rightbarFollowingName">{hotel.servicelocation}</span>
                            <span className="rightbarFollowingName">{hotel.desc}</span>
                        </div>
                    </div>
                })}
</div>
            </div>
        </div>
    )
}
