import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const TambahGuru = ({ setGuru }) => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [mataPelajaran, setMataPelajaran] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
 
    const data = { 
      nama: nama, 
      alamat: alamat, 
      tanggalLahir: tanggalLahir, 
      noTelepon:noTelepon,
      mataPelajaran:mataPelajaran,
    }; 
 
    try { 
      const response = await axios.post(`http://localhost:8080/Guru`, data); 
 
      if (response.status === 200) { 
        Swal.fire({ 
          icon: "success", 
          title: "Berhasil menambah data", 
          showConfirmButton: false, 
          timer: 1500, 
        }); 
 
        // Update state dengan data guru baru
        setGuru(prevGuru => [...prevGuru, response.data]);

        // Redirect user to dashboard after successful login 
        setTimeout(() => { 
          navigate("/Guru"); 
        }, 1500); 
      } 
    } catch (error) { 
      Swal.fire({ 
        icon: "error", 
        title: "Data tidak dapat ditambahkan", 
      }); 
      console.error(error); 
    } 
  };

  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Tambah Guru</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNama">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama guru"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAlamat">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan alamat guru"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTanggalLahir">
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control
                type="date"
                value={tanggalLahir}
                onChange={(e) => setTanggalLahir(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNoTelepon">
              <Form.Label>Nomor Telepon</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nomor telepon guru"
                value={noTelepon}
                onChange={(e) => setNoTelepon(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMataPelajaran">
              <Form.Label>Mata Pelajaran</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan mata pelajaran yang diajar"
                value={mataPelajaran}
                onChange={(e) => setMataPelajaran(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Tambah Data
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TambahGuru;
