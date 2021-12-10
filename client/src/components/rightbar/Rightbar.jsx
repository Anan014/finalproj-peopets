import "./rightbar.css"
import { Users } from "../../dummyData"
import Online from "../online/Online"
import {useContext,useEffect,useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";
// import { axiosInstance } from "../../config";

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends,setFriends] = useState([]);
const {user:currentUser,dispatch}=useContext(AuthContext);
const [followed,setFollowed]= useState(currentUser.followings.includes(user?.id));

useEffect(()=>{
    setFollowed(currentUser.followings.includes(user?.id))
},[currentUser,user])

    useEffect(()=>{
        const getFriends = async()=>{
            try{
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
            }catch(err){
                console.log(err)
            }
        };
        getFriends();
    },[user]);

const handleClick = async () => {
    try{
        if(followed){
            await axios.put("/users/"+user._id+"/unfollow",{userId:currentUser._id});
            dispatch({type:"UNFOLLOW",payload:user._id})
        }else{
            await axios.put("/users/"+user._id+"/follow",{userId:currentUser._id});
            dispatch({type:"FOLLOW",payload:user._id})
        }
    }catch(err){
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
                {followed?"Unfollow":"Follow"}
                {followed?<Remove/>:<Add/>}
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
                {friends.map(friend=>{
                    return <Link key={friend._id} to={"/profile/"+friend.username} style={{textDecoration:"none",color:"black",textAlign:"center"}}>
                    <div className="rightbarFollowing">
                        <img
                        className="rightbarFollowingImg"
                        src={friend.profilePicture?PF+friend.profilePicture:PF+"person/noAvatar.png"}
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
                    <div className="rightbarPet">
                        <img className="rightbarPetImg" src={`${PF}pet/1.jpg`} alt="" />
                        <span className="rightbarPetName">Lowe</span>
                    </div>
                    <div className="rightbarPet">
                        <img className="rightbarPetImg" src={`${PF}pet/2.jpg`} alt="" />
                        <span className="rightbarPetName">Sasi</span>
                    </div>
                </div>
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
