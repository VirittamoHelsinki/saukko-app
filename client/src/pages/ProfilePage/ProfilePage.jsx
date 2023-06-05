// Import react packages & dependencies
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import components
import WavesHeader from "../../components/Header/WavesHeader";
import Button from "../../components/Button/Button";
import UserNav from "../../components/UserNav/UserNav";
import AuthContext from "../../utils/context/AuthContext";

function ProfilePage() {

    // Logout (DOESN'T WORK YET)
    const { getLoggedIn } = useContext(AuthContext);

    const navigate = useNavigate();
  
    const LogOut = async () => {
        await axios.get("http://localhost:5000/auth/logout");
        localStorage.removeItem("token")
        await getLoggedIn();
        navigate("/");
    };

    // Button styling / CSS
    const buttonStyle = {
        color: "var(--link-blue)",
        background: "var(--saukko-main-white)",
        paddingLeft: "40px",
        border: "2px solid var(--link-blue)"
    };
    
    return (
      <main className="profile__wrapper">
			<WavesHeader title="Saukko" secondTitle="Profiili" fill="#9fc9eb" disabled={false} />

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
                    onClick={LogOut}
                    icon={"grommet-icons:logout"}
                />
          </section>
          <UserNav />
      </main>

    )
}

export default ProfilePage