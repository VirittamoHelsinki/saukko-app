// Import react packages
import React from 'react'

// Import components
import WavesHeader from "../../components/Header/WavesHeader";
import Button from "../../components/Button/Button";
import UserNav from "../../components/UserNav/UserNav";

function ProfilePage() {

    // Button styling / CSS
    const buttonStyle = {
        color: "var(--link-blue)",
        background: "var(--saukko-main-white)",
        paddingLeft: "40px",
        border: "2px solid var(--link-blue)"
    };
    
    return (
      <main className="profile__wrapper">
          <WavesHeader 
              title="Saukko"
              secondTitle="Profiili"
              disabled={true} 
          />

          <section className="profile__container">
              <div>
                  <p className="profile__container--label">Nimi</p>
                  <p className="profile__container--value">User Example</p>
              </div>
              <div>
                  <p className="profile__container--label">Sähköposti</p>
                  <p className="profile__container--value">example@email.com</p>
              </div>
              <div>
                  <p className="profile__container--label">Vaihda salasana</p>
              </div>
          </section>
          <section className="profile__logout">
                <Button
                    text="Kirjaudu Ulos"
                    style={buttonStyle}
                    /* onClick={() => {
                        navigate("/register-customer");
                    }} */

                    icon={"grommet-icons:logout"}
                />
          </section>
          <UserNav />
      </main>

    )
}

export default ProfilePage