import { Link } from "react-router-dom"

const NavButton = ({ children, ...rest }) => {
  return (
    <Link {...rest} style={{ color: inherit, textDecoration: "none" }}>
      { children }
    </Link>
  )
}

export default NavButton