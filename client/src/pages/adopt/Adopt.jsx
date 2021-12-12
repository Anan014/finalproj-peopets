import React from 'react'
import Rightbar from '../../components/rightbar/Rightbar.jsx'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import AdoptPets from '../../components/adoptPets/AdoptPets.jsx'
import Topbar from '../../components/topbar/Topbar.jsx'
import "./adopt.css"

export default function Adopt() {
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
<AdoptPets/>
                <Rightbar />
            </div>
        </>
    )
}
