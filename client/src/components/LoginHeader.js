import React, { useEffect, useContext } from "react";
import { Navbar, Icon, SideNavItem, SideNav, Button } from "react-materialize";
import M from "materialize-css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../config/auth";

const Header = props => {
  var navbar = null;

  const { setIsLogin, userEmail, userName } = useContext(AuthContext);
  const logoutHandler = () => {
    localStorage.removeItem("userData");
    setIsLogin(false);
  };

  useEffect(() => {
    M.Sidenav.init(navbar);
  }, [navbar]);

  return (
    <React.Fragment>
      <Navbar
        className='blue'
        alignLinks='left'
        brand={<NavLink to='/'>Gravity</NavLink>}
        centerLogo
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
        <div>
          <style>
            {`
            #root > div > div {
              z-index: 99999 !important;
            }
          `}
          </style>
          <SideNav
            className='blue lighten-5'
            options={{
              closeOnClick: true
            }}
            trigger={
              <Button className='blue white-text' flat node='button'>
                <Icon>menu</Icon>
              </Button>
            }
          >
            <SideNavItem
              user={{
                background: "https://placeimg.com/640/480/tech",
                email: userEmail,
                name: userName
              }}
              userView
            />
            <SideNavItem>
              <NavLink className='black-text' to='/add'>
                Add Question
              </NavLink>
            </SideNavItem>
            <SideNavItem>
              <NavLink className='black-text' to='add-edit-dept'>
                Add/Edit Department
              </NavLink>
            </SideNavItem>
            <SideNavItem>
              <NavLink className='black-text' to='take-exam'>
                Take Exam
              </NavLink>
            </SideNavItem>
            <SideNavItem divider />
            <SideNavItem waves>
              <button className='btn-flat' onClick={logoutHandler}>
                Logout
              </button>
            </SideNavItem>
          </SideNav>
        </div>
      </Navbar>
    </React.Fragment>
  );
};
export default Header;
