import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import "./adoptPets.css";
import axios from "axios";

export default function AdoptPets({ username }) {
    const [petsAdopt, setPetsAdopt] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;


    useEffect(() => {
        const fetchPetsForAdopt = async () => {
            try {
                const PetsForAdopt = await axios.get("/api/pets/adopt");
                console.log("PetsForAdopt", PetsForAdopt.data)
                setPetsAdopt(PetsForAdopt.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPetsForAdopt();
    }, []);

    return (
        <div className="adoptpets">
            <div className="adoptpetsWrapper">
                <h2 style={{ textDecoration: "none", color: "black", textAlign: "center",marginBottom:"10px" }}>Dont shop, Adopt!</h2>
                <div className="petAdoptBoxs">
                {petsAdopt.map(pet => {
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
