import React from "react";
import WavesHeader from "../../components/Header/WavesHeader";
import img from "../../assets/team-img.png";
import Button from "../../components/Button/Button";
import { Icon } from "@iconify/react";
import UserNav from "../../components/UserNav/UserNav";
import arrowRightIcon from "@iconify/icons-typcn/arrow-right";

const HomePageAfterLoggedIn = () => {
    const buttonStyle = {
        color: "var(--saukko-main-white)",
        background: "var(--link-blue)",
        paddingLeft: "65px",
        paddingRight: "50px",
        border: "none",
        fontSize: "16px"
        
    };
    const iconeStyle ={
        color: "white",
        fontSize: "32px",
        marginRight:"10px",
        border: "none",
    }

    return (
        <main className="loggedpage__wrapper">
            <WavesHeader 
             fill="#9fc9eb" 
             secondTitle="Tervetuloa, Alex"
             title="Saukko"
             disabled={true} />

            <section className="logged__user__container">
                <h2>Valitse suoritettava tutkinto</h2>
                <img src={img} alt="" />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor
                </p>
                <div className="button">
                    <Button
                        text="Selaa tutkintoja"
                        icone={<Icon icon={arrowRightIcon} />}
                        style={buttonStyle}
                    />
                     <Icon icon="typcn:arrow-right" style={iconeStyle}/>
                </div>
            </section>

            <UserNav></UserNav>
        </main>
    );
};

export default HomePageAfterLoggedIn;






