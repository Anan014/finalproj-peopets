import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import "./missingPets.css";
import axios from "axios";

export default function MissingPets({ username }) {
    const [missingPetsList, setMissingPetsList] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;


    useEffect(() => {
        const fetchMissingPets = async () => {
            try {
                const MissingPets = await axios.get("/api/pets/missing");
                console.log("MissingPets", MissingPets.data)
                setMissingPetsList(MissingPets.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMissingPets();
    }, []);

    return (
        <div className="adoptpets">
            <div className="adoptpetsWrapper">
                <h2 style={{ textDecoration: "none", color: "black", textAlign: "center",marginBottom:"10px" }}>Have you seen these pets?</h2>
                <div className="petAdoptBoxs">
                {missingPetsList.map(pet => {
                    return <div key={pet._id} style={{ textDecoration: "none", color: "black", textAlign: "center" }}>
                        <div className="petAdoptBox">
                            {pet.petanimal === "cat" ?
                                <img
                                    className="rightbarFollowingImg"
                                    src={pet.petProfilePicture ? PF + pet.petProfilePicture : PF + "pet/5.jpg"}
                                    alt=""
                                />
                                :
                                <img
                                    className="rightbarFollowingImg"
                                    src={pet.petProfilePicture ? PF + pet.petProfilePicture : PF + "pet/2.jpg"}
                                    alt=""
                                />
                            }
                            <span className="rightbarFollowingName">{pet.petname}</span>
                            <span className="rightbarFollowingName">{pet.petanimal}</span>
                            <span className="rightbarFollowingName">{pet.gender}</span>
                        </div>
                    </div>
                })}
</div>
            </div>
        </div>
    )
}
