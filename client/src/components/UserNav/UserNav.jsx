// import necessary react components
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useContext } from "react";
import AuthContext from "../../utils/context/AuthContext";

// icon component
const UserNavIcon = (props) => {
  return (
    <button onClick={props.onClick}>
      <Icon icon={props.icon} rotate={props.rotate} />
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



  return (
    <main className="userNav__wrapper">
      <section className="userNav__container">
        {/* home icon */}
        <UserNavIcon
          icon="material-symbols:house-outline"
          onClick={() => navigate("/home")}
        />
        {/* search icon */}
        <UserNavIcon
          icon="ic:baseline-search"
          rotate={1}
          onClick={() => navigate("/search")}
        />
        {/* book icon */}
        <UserNavIcon
          icon="material-symbols:menu-book-outline-sharp"
          onClick={() => navigate("/home")}
        />
        {/* user icon */}
        <UserNavIcon
          icon="material-symbols:person-outline"
          onClick={() => navigate("/profile")}
        />
        {/* sign out icon */}
        {/* <UserNavIcon icon="mdi:sign-out-variant" onClick={LogOut} /> */}

      </section>
    </main>
  );
};

export default UserNav;
