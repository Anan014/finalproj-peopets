import "./rightbar.css"
import { Users } from "../../dummyData"
import Online from "../online/Online"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";
// import { axiosInstance } from "../../config";
import { useRef } from "react";

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));
    const [petadded, setPetadded] = useState(false);
    const [serviceadded, setServiceadded] = useState(false);
    const [pets, setPets] = useState([]);

    const petname = useRef();
    const petanimal = useRef();
    const gender = useRef();
    const age = useRef();
    const isMissing = useRef();
    const forAdopt = useRef();

    const servicename = useRef();
    const servicetype = useRef();
    const servicelocation = useRef();
    const desc = useRef();

    const handleClickAddPet = async (e) => {
        e.preventDefault();
        const pet = {
            userId: user._id,
            petname: petname.current.value,
            petanimal: petanimal.current.value,
            gender: gender.current.value,
            age: age.current.value,
            isMissing: isMissing.current.value,
            forAdopt: forAdopt.current.value
        };
        try {
            await axios.post("/api/pets/add", pet);
            setPetadded(true);
            
        } catch (err) {
            console.log(err);
        }
    }

    const handleClickAddService = async (e) => {
        e.preventDefault();
        const service = {
            userId: user._id,
            servicename: servicename.current.value,
            servicetype: servicetype.current.value,
            servicelocation: servicelocation.current.value,
            desc: desc.current.value
        };
        try {
            await axios.post("/api/services/add", service);
            setServiceadded(true);
        window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?.id))
    }, [currentUser, user])

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/api/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err)
            }
        };
        getFriends();
    }, [user]);


    useEffect(() => {
        const getUserAllPets = async () => {
            try {
                const userPetsList = await axios.get("/api/pets/userpets/" + user._id);
                setPets(userPetsList.data);
            } catch(err) {
                console.log(err);
            }
        };
        getUserAllPets();
    },[user]);


    const handleClick = async () => {
        try {
            if (followed) {
                await axios.put("/api/users/" + user._id + "/unfollow", { userId: currentUser._id });
                dispatch({ type: "UNFOLLOW", payload: user._id })
            } else {
                await axios.put("/api/users/" + user._id + "/follow", { userId: currentUser._id });
                dispatch({ type: "FOLLOW", payload: user._id })
            }
        } catch (err) {
            console.log(err)
        }
        setFollowed(!followed)
    }

    const HomeRightBar = () => {
        return (
            <>
                {/* <div className="birthdayContainer">
                    <img className="birthdayImg" src="/assets/gift.png" alt="" />
                    <span className="birthdayText"><b>Adeeb Khanjeer</b> and <b>3 other friends</b> have a birthday today</span>
                </div> */}
                {/* <img src="assets/pet/5.jpg" alt="" className="rightbarAd" /> */}
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u) => (<Online key={u.id} user={u} />))}
                </ul>
            </>
        )
    };

    const ProfileRightbar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button className="rightbarFollowButton" onClick={handleClick}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove /> : <Add />}
                    </button>
                )}
                <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City: </span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From: </span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship: </span>
                        <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : ""}</span>
                    </div>
                </div>
                <hr />
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friends.map(friend => {
                        return <Link key={friend._id} to={"/profile/" + friend.username} style={{ textDecoration: "none", color: "black", textAlign: "center" }}>
                            <div className="rightbarFollowing">
                                <img
                                    className="rightbarFollowingImg"
                                    src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"}
                                    alt=""
                                />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    })}
                </div>
                <hr />
                <h4 className="rightbarTitle">User Pets</h4>
                <div className="rightbarPets">


                {pets.map(pet => {
                        return <div key={pet._id} style={{ textDecoration: "none", color: "black", textAlign: "center" }}>
                            <div className="rightbarFollowing">
                            {pet.petanimal === "cat"?
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

                    {/* <div className="rightbarPet">
                        <img className="rightbarPetImg" src={`${PF}pet/1.jpg`} alt="" />
                        <span className="rightbarPetName">Lowe</span>
                    </div>
                    <div className="rightbarPet">
                        <img className="rightbarPetImg" src={`${PF}pet/2.jpg`} alt="" />
                        <span className="rightbarPetName">Sasi</span>
                    </div> */}
                </div>
                {user.username === currentUser.username && (
                    <div className="rightbarAddService">
                        <hr />
                        <h4 className="rightbarTitle">Add pet</h4>
                        <form className="addPetBox" onSubmit={handleClickAddPet}>
                            <input placeholder="Pet Name" requires ref={petname} className="addPetInput" />
                            <input placeholder="Animal" requires ref={petanimal} className="addPetInput" />
                            <input placeholder="Gender" requires ref={gender} className="addPetInput" />
                            <input placeholder="Age" requires ref={age} className="addPetInput" />
                            <input placeholder="Missing?" requires ref={isMissing} className="addPetInput" />
                            <input placeholder="Adoption?" requires ref={forAdopt} className="addPetInput" />

                            <button className="addPetButton" type="submit">Add pet</button>
                        </form>
                        {petadded ? "pet added successfully" : ""}
                    </div>
                )}
                {user.username === currentUser.username && (
                    <div className="rightbarAddService">
                        <hr />
                        <h4 className="rightbarTitle">Add service</h4>
                        <form className="addServiceBox" onSubmit={handleClickAddService}>
                            <input placeholder="Service Name" requires ref={servicename} className="addServiceInput" />
                            <input placeholder="Service Type" requires ref={servicetype} className="addServiceInput" />
                            <input placeholder="Service Location" requires ref={servicelocation} className="addServiceInput" />
                            <input placeholder="Description" requires ref={desc} className="addServiceInput" />
                            <button className="addServiceButton" type="submit">Add Service</button>
                        </form>
                        {serviceadded ? "Service added successfully" : ""}
                    </div>
                )}
            </>
        )
    }


    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightBar />}
            </div>
        </div>
    )
}
