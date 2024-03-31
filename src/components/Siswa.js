import React, { useState, useEffect } from "react";
import { Card, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheck, faPlus } from "@fortawesome/free-solid-svg-icons"; 
import axios from "axios";

const Detail = () => {
  const [siswa, setSiswa] = useState([]);

  const getData = () => {
    var requestOptions = {
      method: "GET",
      methos: "follow",
    };
    fetch("http://localhost:3030/Siswa", requestOptions)
      .then((response) => response.json())
      .then((result) => setSiswa(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (siswa.length > 0) {
    }
  }, [siswa]);

  const Tambah = () => {
    window.location.href = "/Tambah";
  };

  const deleteSiswa = async (id) => {
    axios
      .delete(`http://localhost:3030/Siswa/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("error deleting siswa:", error);
      });
  };

  const handleOpen = (id) => {
    window.location.href = `/Edit_siswa/${id}`;
  };

  return (
    <div style={{ background: '#f8f9fa', padding: '20px' }}>
      <Card className="mb-4">
        <Card.Body>
          <h2 style={{ marginBottom: '20px', color: '#495057' }}>Daftar Siswa</h2>
          <div style={{ marginBottom: '20px', textAlign: 'right' }}>
            <Button variant="success" onClick={Tambah}>
              <FontAwesomeIcon icon={faPlus} /> Tambah Siswa
            </Button>
          </div>
          <Table striped bordered hover responsive="md">
            <thead className="thead-dark" style={{ textAlign: "center" }}>
              <tr>
                <th>No</th>
                <th>Nama Siswa</th>
                <th>Kelas</th>
                <th>Alamat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {siswa.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.nama}</td>
                  <td>{student.kelas}</td>
                  <td>{student.alamat}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Button
                        variant="primary"
                        style={{
                          backgroundColor: "#007BFF",
                          border: "none",
                          color: "white",
                        }}
                        onClick={() => handleOpen(student.id)}
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
                        onClick={() => deleteSiswa(student.id)}
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

export default Detail;
