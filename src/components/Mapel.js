import React, { useState, useEffect } from "react";
import { Card, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons"; 
import axios from "axios";

const Mapel = () => {
  const [mapel, setMapel] = useState([]);

  const getData = () => {
    axios.get("http://localhost:3030/Mapel")
      .then(response => {
        setMapel(response.data);
      })
      .catch(error => {
        console.log("error fetching mapel data:", error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const Tambah = () => {
    window.location.href = "/Tambah_Mapel";
  };

  const deleteMapel = async (id) => {
    axios.delete(`http://localhost:3030/Tambah_Mapel/${id}`)
      .then(() => {
        window.location.reload();
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
          <Table striped bordered hover responsive="md">
            <thead className="thead-dark" style={{ textAlign: "center" }}>
              <tr>
                <th>No</th>
                <th>Mata Pelajaran</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mapel.map((mapelItem, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{mapelItem.mata_pelajaran}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Button
                        variant="primary"
                        style={{
                          backgroundColor: "#007BFF",
                          border: "none",
                          color: "white",
                        }}
                        onClick={() => handleOpen(mapelItem.id)}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </Button>
                      <Button
                        variant="danger"
                        style={{
                          backgroundColor: "#FC3C3C",
                          border: "none",
                          color: "white",
                        }}
                        onClick={() => deleteMapel(mapelItem.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Hapus
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Mapel;
