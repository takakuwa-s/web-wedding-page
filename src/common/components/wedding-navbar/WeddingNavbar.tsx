import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import Offcanvas from "react-bootstrap/esm/Offcanvas";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import './WeddingNavbar.scss';

function WeddingNavbar() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const user = useAppSelector((state: RootState) => state.user.val);
  return (
    <Navbar bg="bg-transparent" variant="light" expand={false} className="fixed-top nav-zindex">
      <Container fluid className="justify-content-end">
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={() => setShow(true)} />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="top"
          show={show}
        >
          <Offcanvas.Header
            className="justify-content-end pb-0"
            closeButton
            closeVariant="white"
            onHide={() => setShow(false)} />
          <Offcanvas.Body bsPrefix="offcanvas-body" className="text-center display-6 pt-0">
            <Nav className="flex-grow-1 text-white" onSelect={() => setShow(false)}>
              <Nav.Link as={Link} to="/" eventKey="top" className="pb-5 text-decoration-none text-white">{t('nav.top')}</Nav.Link>
              <Nav.Link as={Link} to="/image/list/all" eventKey="images" className="pb-5 text-decoration-none text-white">{t('nav.image')}</Nav.Link>
              <Nav.Link as={Link} to="/user" eventKey="user" className="pb-5 text-decoration-none text-white">{t('nav.user')}</Nav.Link>
              <Nav.Link as={Link} to="/attendance" eventKey="attendance" className="pb-5 text-decoration-none text-white">{t('nav.attendance')}</Nav.Link>
              {user.isAdmin && <Nav.Link as={Link} to="/admin/users" eventKey="attendance" className="pb-5 text-decoration-none text-white">{t('nav.admin')}</Nav.Link>}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default WeddingNavbar;