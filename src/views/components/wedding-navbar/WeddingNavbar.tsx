import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import Offcanvas from "react-bootstrap/esm/Offcanvas";
import { useTranslation } from "react-i18next";

function WeddingNavbar() {
  const { t } = useTranslation();
  return (
    <Navbar bg="bg-transparent" variant="light" expand={false} className="fixed-top">
      <Container fluid className="justify-content-end">
        <Navbar.Toggle aria-controls="offcanvasNavbar"/>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="top"
          className="h-50 bg-transparent"
        >
          <Offcanvas.Header closeButton className="justify-content-end">
          </Offcanvas.Header>
          <Offcanvas.Body className="text-center display-6 text-white">
            <Nav className="flex-grow-1">
              <Nav.Link href="/" className="py-4 text-white">{t('nav.top')}</Nav.Link>
              <Nav.Link href="/image/list" className="py-4 text-white">{t('nav.image')}</Nav.Link>
              <Nav.Link href="/attendance" className="py-4 text-white">{t('nav.form')}</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default WeddingNavbar;