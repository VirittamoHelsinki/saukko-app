// import necessary react components
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

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
  const navigate = useNavigate();

  return (
    <main className="userNav__wrapper">
      <section className="userNav__container">
        {/* home icon */}
        <UserNavIcon
          icon="material-symbols:house-outline"
          onClick={() => navigate("/home")}
        />
        {/* book icon */}
        <UserNavIcon
          icon="material-symbols:menu-book-outline-sharp"
          onClick={() => navigate("/home")}
        />
        {/* search icon */}
        <UserNavIcon
          icon="ic:baseline-search"
          rotate={1}
          onClick={() => navigate("/home")}
        />
        {/* user icon */}
        <UserNavIcon
          icon="material-symbols:person-outline"
          onClick={() => navigate("/home")}
        />
        {/* sign out icon */}
        <UserNavIcon
          icon="mdi:sign-out-variant"
          onClick={(localStorage.removeItem("token"), () => navigate("/"))}
        />
      </section>
    </main>
  );
};

export default UserNav;
