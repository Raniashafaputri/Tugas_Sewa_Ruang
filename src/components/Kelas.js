import React, { useState, useEffect } from "react";
import { Card, Table, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
// import kelasData from "./kelas.json";

const Kelas = () => {
  const [kelas, setKelas] = useState([]);
  const [newKelas, setNewKelas] = useState("");
  const [selectedJurusan, setSelectedJurusan] = useState("");

  useEffect(() => {
    setKelas(kelas);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tambahkan logika untuk menambahkan data kelas ke server
  };

  const Tambah = () => {
    window.location.href = "/Tambah_Kelas";
  };

  const deleteKelas = async (id) => {
    // Tambahkan logika untuk menghapus data kelas dari server
  };

  const handleOpen = (id) => {
    window.location.href = `/Edit_Kelas/${id}`;
  };

  return (
    <div style={{ background: "#f8f9fa", padding: "20px" }}>
      <Card className="mb-4">
        <Card.Body>
          <h2 style={{ marginBottom: "20px", color: "#495057" }}>Kelas</h2>
          <div style={{ marginBottom: "20px", textAlign: "right" }}>
            <Button variant="success" onClick={Tambah}>
              <FontAwesomeIcon icon={faPlus} /> Tambah Kelas
            </Button>
          </div>
          <Table striped bordered hover responsive="md">
            <thead className="thead-dark" style={{ textAlign: "center" }}>
              <tr>
                <th>No</th>
                <th>Jurusan</th>
                <th>Nama Kelas</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {kelas.map((kelasItem, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{kelasItem.jurusan}</td>
                  <td>{kelasItem.nama_kelas}</td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Button
                        variant="primary"
                        style={{
                          backgroundColor: "#007BFF",
                          border: "none",
                          color: "white",
                        }}
                        onClick={() => handleOpen(kelasItem.id)}
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
                        onClick={() => deleteKelas(kelasItem.id)}
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

export default Kelas;
