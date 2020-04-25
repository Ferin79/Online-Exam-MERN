import React, { useEffect } from "react";
import { Navbar, NavItem, Icon } from "react-materialize";
import M from "materialize-css";
import { NavLink } from "react-router-dom";

const Header = props => {
  var navbar = null;

  useEffect(() => {
    M.Sidenav.init(navbar);
  }, [navbar]);

  return (
    <Navbar
      className='blue'
      ref={ref => {
        navbar = ref;
      }}
      alignLinks='right'
      brand={
        <NavLink className='brand-logo' to='/'>
          Gravity
        </NavLink>
      }
      menuIcon={<Icon>menu</Icon>}
      options={{
        draggable: true,
        edge: "left",
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        outDuration: 200,
        preventScrolling: true
      }}
    >
      <NavItem>
        <NavLink to='/login'>Login</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to='/register'>Register</NavLink>
      </NavItem>
    </Navbar>
  );
};
export default Header;
