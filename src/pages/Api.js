// UpdateMapel.js
import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Import useParams

const UpdateMapel = () => { // Remove match from props
  const { id } = useParams(); // Get the id parameter from URL
  const [nama_mapel, setNama_Mapel] = useState("");
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };


        const response = await axios.get(
          `http://localhost:8080/mapel/${id}`,
          config
        );

        const dataMapel = response.data;

        setNama_Mapel(dataMapel.data.nama_mapel);
      } catch (error) {
        console.error("Error fetching mapel data:", error);
      }
    };

    fetchData();
  }, [id]); // Add id to dependency array

  const submitActionHandler = async (event) => {
    event.preventDefault();
  
    const token = localStorage.getItem("token");
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Menyertakan token dalam header "Authorization"
      },
    };
  
    try {
      await axios.put(
        `http://localhost:8080/mapel/${id}`, // Perbaiki URL endpoint
        {
          nama_mapel,
        },
        config
      );
  
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Update Success!!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/Mapel"); // Menggunakan navigate untuk navigasi kembali ke halaman "/Guru"
    } catch (error) {
      // Jika terjadi kesalahan, tampilkan pesan kesalahan
      alert("Terjadi kesalahan: " + error);
    }
  };


  return (
    <div className="container mt-4">
      <Card>
        <Card.Body className="mb-2">
          <Card.Title>Update Mapel</Card.Title>
          <Form onSubmit={submitActionHandler}>
            <Form.Group className="mb-3" controlId="formNama_mapel">
              <Form.Label>Nama Mapel</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama mapel"
                value={nama_mapel}
                onChange={(e) => setNama_Mapel(e.target.value)}
              />
            </Form.Group>
          <Button variant="primary" type="submit">
            Simpan
          </Button>
        </Form>
        </Card.Body>
       </Card>
   </div>
  );
};

export default UpdateMapel;
