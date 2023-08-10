import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import React from "react";
import "./HomeLayout.css";

const HomeLayout: React.FC = () => {
    return <div className="home">
        <Sidebar/>
        <Header/>
    </div>;
};

export default HomeLayout;
