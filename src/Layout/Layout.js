import React from "react";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import "antd/dist/antd.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./layout.css";
import { logoutUser } from "../redux/apiRequest";


const { Header, Content, Footer } = Layout;
const LayoutQuiz = () => {
  // state redux
  const user = useSelector((state) => state?.auth.login.currentUser);
  const accessToken = useSelector(
    (state) => state?.auth.login?.currentUser?.tokens.access.token
  );
  const refreshToken = useSelector(
    (state) => state?.auth.login?.currentUser?.tokens.refresh.token
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle logout
  const handleLogout = async () => {
    await logoutUser(accessToken, refreshToken, dispatch, navigate);
  };

  // Dropdown avatar
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Link
              to="/"
              className="navbar-item"
              onClick={handleLogout}
              color="black"
            >
              Log out
            </Link>
          ),
        },
      ]}
    />
  );

  return (
    <div>
      <Layout>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
          }}
        >
          <nav className="navbar-container">
            {user ? (
              <>
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                  <Avatar
                    shape="square"
                    size={63}
                    className="avatar"
                    src={user.user.avatar}
                  />
                </Dropdown>
                <p className="navbar-user">
                  Hi,{" "}
                  <span>{`${user.user.username} -- ${user.user.role}`}</span>{" "}
                </p>
              </>
            ) : (
              <>
                <Link to="/" className="navbar-item">
                  {" "}
                  Login{" "}
                </Link>
                <Link to="/register" className="navbar-item">
                  {" "}
                  Register
                </Link>
              </>
            )}
          </nav>
        </Header>
        <Content
          className="site-layout"
          style={{
            padding: "0 100px",
            paddingTop: "40px",
            marginTop: 64,
          }}
        >
          <Outlet />
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 380,
            }}
          ></div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Chúc các bạn có một ngày thật vui vẻ !!!
        </Footer>
      </Layout>
    </div>
  );
};

export default LayoutQuiz;
