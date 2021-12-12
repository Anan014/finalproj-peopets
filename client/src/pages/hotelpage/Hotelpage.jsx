import React from 'react'
import Rightbar from '../../components/rightbar/Rightbar.jsx'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import Topbar from '../../components/topbar/Topbar.jsx'
import Hotel from '../../components/hotel/Hotel.jsx'

export default function Hotelpage() {
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Hotel />
                <Rightbar />
            </div>
        </>
    )
}
