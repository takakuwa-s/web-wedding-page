import Navbar from "react-bootstrap/esm/Navbar";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";

function BottomNavbar(props: IProps) {
  return (
    <Navbar fixed="bottom" bg="light">
      <Container>
        <Nav as="ul" fill defaultActiveKey={props.navs[0].id} className="mx-auto" onSelect={props.onSelectNav}>
        {props.navs.map((nav, index) => (
          <Nav.Item key={index} as="li">
            <Nav.Link href="#" eventKey={nav.id} >{nav.title}</Nav.Link>
          </Nav.Item>
        ))}
        </Nav>
      </Container>
    </Navbar>
  );
}

interface IProps {
  navs: {
    id: string;
    title: string;
  }[],
  onSelectNav: (eventKey: any, event: any) => void;
}

export default BottomNavbar;