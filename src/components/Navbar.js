import React, { useState } from 'react';
import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const NavbarComp = () => {
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    // Lakukan proses logout di sini
    // Contoh: hapus token, bersihkan sesi, dll.
    // Setelah logout, redirect pengguna ke halaman login atau halaman beranda
    // Misalnya:
    // history.push('/login');
  };

  return (
    <Navbar bg="secondary" expand="lg" variant="dark">
      <Container>
        {/* Tambahkan Image untuk menampilkan logo */}
        <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '5px' }}>
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3FeFp7-zDWAl09LmifTgkQrtOqQlsFTzcoXGEYO4YcYihP_8reLDr6K0F9LFHROS3vhM&usqp=CAU"
              className="w-8 h-auto rounded-circle"
              alt=""
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          <span>DATA SEKOLAH</span>
        </Navbar.Brand>
        <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={expanded ? 'show' : ''}>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Home" active>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/Siswa" active> 
               Siswa
            </Nav.Link>
            <Nav.Link as={Link} to="/Guru" active> 
              Guru
            </Nav.Link>
            <Nav.Link as={Link} to="/Mapel" active> 
              Mapel
            </Nav.Link>
            <Nav.Link as={Link} to="/Kelas" active> 
              Kelas
            </Nav.Link>
          </Nav>
          <Nav>
            <Button variant="outline-light" className="ms-3" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
