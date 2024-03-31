import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'; // Impor ikon user-group
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
        <Navbar.Brand as={Link} to="/Register">SMK MANDIRI</Navbar.Brand>
        <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={expanded ? 'show' : ''}>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Home" active>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/Siswa" active> 
              Daftar Siswa
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

function Home() {
  const [siswa, setSiswa] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("http://localhost:3030/Siswa")
      .then((response) => {
        setSiswa(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))', gap: '20px', padding: '20px', margin: '20px auto', alignItems: 'start' }}>
        <Card bg="secondary" text="white">
          <Card.Body>
            <Card.Title>Jumlah siswa Perempuan</Card.Title>
            <Card.Text>
              236 siswa
            </Card.Text>
            <Button variant="light"><FontAwesomeIcon icon={faUserGroup} /></Button>
          </Card.Body>
        </Card>
  
        <Card bg="secondary" text="white">
          <Card.Body>
            <Card.Title>Jumlah siswa laki-laki</Card.Title>
            <Card.Text>
              350 siswa
            </Card.Text>
            <Button variant="light"><FontAwesomeIcon icon={faUserGroup} /></Button>
          </Card.Body>
        </Card>
  
        <Card bg="secondary" text="white">
          <Card.Body>
            <Card.Title>Jumlah semua siswa</Card.Title>
            <Card.Text>
              586 siswa
            </Card.Text>
            <Button variant="light"><FontAwesomeIcon icon={faUserGroup} /></Button>
          </Card.Body>
        </Card>
      </div>

      <div style={{ width: '80%', margin: '20px auto' }}> {/* Menengahkan tabel */}
        <Card>
          <Card.Body>
            <h2 className="mb-3">Daftar Siswa</h2>
            <Table striped bordered hover responsive="md">
              <thead className="thead-dark" style={{ textAlign: "center" }}>
                <tr>
                  <th>No</th>
                  <th>Nama Siswa</th>
                  <th>Kelas</th>
                  <th>Alamat</th>
                </tr>
              </thead>
              <tbody>
                {siswa.map((student, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{student.nama}</td>
                    <td>{student.kelas}</td>
                    <td>{student.alamat}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Home;
