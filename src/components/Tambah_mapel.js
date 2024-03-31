import React, { useState, useEffect } from "react";
import { Card, Table, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons"; 
import axios from "axios";

const Mapel = () => {
  const [mapel, setMapel] = useState([]);
  const [newMapel, setNewMapel] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("http://localhost:3030/Mapel")
      .then(response => {
        setMapel(response.data);
      })
      .catch(error => {
        console.log("error fetching mapel data:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3030/Mapel", { mata_pelajaran: newMapel })
      .then(response => {
        console.log("New mapel added:", response.data);
        setNewMapel(""); // Reset the form field after successful addition
        getData(); // Reload the data to display the newly added mapel
      })
      .catch(error => {
        console.error("Error adding new mapel:", error);
      });
  };

  const Tambah = () => {
    window.location.href = "/Tambah_Mapel";
  };

  const deleteMapel = async (id) => {
    axios.delete(`http://localhost:3030/Mapel/${id}`)
      .then(() => {
        getData(); // Reload the data after deletion
      })
      .catch((error) => {
        console.error("error deleting mapel:", error);
      });
  };

  const handleOpen = (id) => {
    window.location.href = `/Edit_Mapel/${id}`;
  };

  return (
    <div style={{ background: '#f8f9fa', padding: '20px' }}>
      <Card className="mb-4">
        <Card.Body>
          <h2 style={{ marginBottom: '20px', color: '#495057' }}>Mapel</h2>
          <div style={{ marginBottom: '20px', textAlign: 'right' }}>
            <Button variant="success" onClick={Tambah}>
              <FontAwesomeIcon icon={faPlus} /> Tambah Mapel
            </Button>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formMataPelajaran" className="mb-3">
              <Form.Label>Mata Pelajaran</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan mata pelajaran yang diajar"
                value={newMapel}
                onChange={(e) => setNewMapel(e.target.value)}
              />
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

export default Mapel;
