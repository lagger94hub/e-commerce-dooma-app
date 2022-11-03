import Header from "./header/Header"
import Main from "./main/Main"
import Nav from "./nav/Nav"
const Layout = (props) => {
  return (
    <>
      <Header mode='normal'>
        <Nav />
      </Header>
      <Main>
        {props.children}
      </Main>
    </>
  )
}
export default Layout