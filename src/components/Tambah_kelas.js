import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const TambahKelas = ({ setKelas }) => {
  const [namaKelas, setNamaKelas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const navigate = useNavigate();
  const [newKelas, setNewKelas] = useState("");
  const [selectedJurusan, setSelectedJurusan] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nama_kelas: namaKelas,
      jurusan: jurusan,
    };

    try {
      const response = await axios.post(`http://localhost:3030/Kelas`, data);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil menambah kelas",
          showConfirmButton: false,
          timer: 1500,
        });

        // Update state dengan data kelas baru
        setKelas(prevKelas => [...prevKelas, response.data]);

        // Redirect user to Kelas page after successful addition
        setTimeout(() => {
          navigate("/Kelas");
        }, 1500);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Kelas tidak dapat ditambahkan",
      });
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Tambah Kelas</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNamaKelas">
              <Form.Label>Nama Kelas</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama kelas"
                value={namaKelas}
                onChange={(e) => setNamaKelas(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formJurusan" className="mb-3">
              <Form.Label>Jurusan</Form.Label>
              <Form.Control
                as="select"
                value={selectedJurusan}
                onChange={(e) => setSelectedJurusan(e.target.value)}
              >
                <option value="">Pilih Jurusan</option>
                <option value="TI">Teknik Informatika</option>
                <option value="SI">Sistem Informasi</option>
                <option value="TK">Teknik Komputer</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Tambah 
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TambahKelas;
