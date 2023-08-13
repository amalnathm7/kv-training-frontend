import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import SubHeader from "../../components/sub-header/SubHeader";
import React from "react";
import "./HomeLayout.css";

type HomeLayoutPropsType = {
    subHeaderLabel: string,
    subHeaderActionLabel: string,
    subHeaderActionIcon: string,
    subHeaderAction: () => void
}

const HomeLayout: React.FC<HomeLayoutPropsType> = (props) => {
    return <div className="home">
        {props.children}
        <SubHeader action={props.subHeaderAction} label={props.subHeaderLabel} actionLabel={
            props.subHeaderActionLabel} actionIcon={props.subHeaderActionIcon} />
        <Sidebar />
        <Header />
    </div>;
};

export default HomeLayout;
