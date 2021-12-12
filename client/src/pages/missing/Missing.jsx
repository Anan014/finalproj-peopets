import React from 'react'
import Rightbar from '../../components/rightbar/Rightbar.jsx'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import Topbar from '../../components/topbar/Topbar.jsx'
import "./missing.css"
import MissingPets from '../../components/missingPets/MissingPets.jsx'

export default function Missing() {
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <MissingPets />
                <Rightbar />
            </div>
        </>
    )
}
