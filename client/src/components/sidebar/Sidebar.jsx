import { Chat, ContentCut, Event, Favorite, Group, HelpOutline, Hotel, LocalGroceryStore, LocationOff, MedicalServices, Pets, PlayCircleFilledOutlined } from "@mui/icons-material"
import "./sidebar.css"
import { Users } from "../../dummyData"
import CloseFriend from "../closeFriend/CloseFriend"
import { Link } from "react-router-dom"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    {/* <li className="sidebarListItem">
                        <Chat className="sidebarIcon" />
                        <span className="sidebarListItemText">Chat</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilledOutlined className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon" />
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </li> */}
                    <li className="sidebarListItem">
                    <Link to="/hotel" style={{ textDecoration: "none", color: "black", textAlign: "left", border: "1px solid black", width: "100%", borderRadius: "5px", padding: "5px" }}>
                        <Hotel className="sidebarIcon" />
                        <span className="sidebarListItemText">Hotel</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Favorite className="sidebarIcon" />
                        <span className="sidebarListItemText">Dating</span>
                    </li>
                    <li className="sidebarListItem">
                        <LocalGroceryStore className="sidebarIcon" />
                        <span className="sidebarListItemText">Store</span>
                    </li>
                    <li className="sidebarListItem">
                        <ContentCut className="sidebarIcon" />
                        <span className="sidebarListItemText">Barber</span>
                    </li>
                    <li className="sidebarListItem">
                        <MedicalServices className="sidebarIcon" />
                        <span className="sidebarListItemText">Veterinary Center</span>
                    </li>
                    <li className="sidebarListItem">
                        <Link to="/missing" style={{ textDecoration: "none", color: "black", textAlign: "left", border: "1px solid black", width: "100%", borderRadius: "5px", padding: "5px" }}>
                            <LocationOff className="sidebarIcon" />
                            <span className="sidebarListItemText">Missing</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link to="/adopt" style={{ textDecoration: "none", color: "black", textAlign: "left", marginBottom: "10p", border: "1px solid black", width: "100%", borderRadius: "5px", padding: "5px" }}>
                            <Pets className="sidebarIcon" />
                            <span className="sidebarListItemText">Adopt me</span>
                        </Link>
                    </li>
                </ul>
                {/* <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {Users.map((u) => (<CloseFriend key={u.id} user={u} />))}
                </ul> */}
            </div>
        </div>
    )
}
