// import necessary react components
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useContext } from "react";
import AuthContext from "../../utils/context/AuthContext";
import document from '../../assets/document.svg'
import customers from '../../assets/customers.svg'

// icon component
const UserNavIcon = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.icon ? (
        <Icon icon={props.icon} rotate={props.rotate} />
      ) : (
        <img src={props.image} alt="icon" />
      )}
    </button>
  );
};

// user navigation bar
const UserNav = () => {
  const { getLoggedIn, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const LogOut = async () => {
    await axios.get("http://localhost:5000/auth/logout");
    localStorage.removeItem("token")
    await getLoggedIn();
    navigate("/");
  };
  const getNavColor = () => {
    if (user.role === "teacher") {
      return "#FFC61E";
    } else if (user.role === "customer") {
      return "#9fc9eb";
    } else if (user.role === "supervisor") {
      return "#f5a3c7";
    } else {
      return "#9fc9eb";
    }
  };



  const renderIcons = () => {
    if (user.role === "teacher") {
      return (
        <>
          {/* home icon */}
          <UserNavIcon
            icon="material-symbols:house-outline"
            onClick={() => navigate("/userdashboard")}
          />
          {/* book icon */}
          <UserNavIcon
            img


          // onClick={() => navigate("/userdashboard")}
          />
          {/* user icon */}
          <UserNavIcon
            icon="material-symbols:person-outline"
            onClick={() => navigate("/profile")}
          />

        </>
      );
    } else if (user.role === "customer" || user.role === "supervisor") {
      return (
        <>
          {/* home icon */}
          <UserNavIcon
            icon="material-symbols:house-outline"
            onClick={() => navigate("/userdashboard")}
          />
          {/* book icon */}
          <UserNavIcon
            icon="material-symbols:menu-book-outline-sharp"
          // onClick={() => navigate("/home")}
          />

          {/* user icon */}
          <UserNavIcon
            icon="material-symbols:person-outline"
            onClick={() => navigate("/profile")}
          />

        </>
      );
    }
  };

  return (
    <main className={`userNav__wrapper ${getNavColor()}`}>
      <section className="userNav__container">
        {renderIcons()}
      </section>
    </main>

  );
};

export default UserNav;
