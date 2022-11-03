import Header from "../../layout/header/Header"
import Main from "../../layout/main/Main"
import SideNav from "./nav/side-nav/SideNav"
import Nav from "./nav/upper-nav/Nav"
const AdminLayout = (props) => {
  return (
    <>
      <Header mode='admin'>
        <Nav />
      </Header>
      <SideNav />
      <Main>
        {props.children}
      </Main>
    </>
  )
}
export default AdminLayout