// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Form, Button, Container } from "react-bootstrap";
// import axios from "axios";

// const EditPage = () => {
//   const { id } = useParams();
//   const [Siswa, setSiswa] = useState({
//     nama: "",
//     kelas: "",
//     alamat: ""
//   });

//   useEffect(() => {
//     fetchSiswa();
//   }, []);

//   const fetchSiswa = async () => {
//     try {
//       const response = await axios.get("http://localhost:3030/Siswa");
//       const data = response.data;
//       const siswa = data.find(item => item.id === id);
//       if (siswa) {
//         setSiswa(siswa);
//       } else {
//         console.error("Siswa dengan id yang diberikan tidak ditemukan");
//       }
//     } catch (error) {
//       console.error("Error fetching siswa:", error);
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setSiswa({ ...Siswa, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await axios.put(`http://localhost:3030/Siswa/${id}`, Siswa);
//       alert("Data siswa berhasil diperbarui");
//       // Redirect ke halaman detail siswa setelah berhasil diperbarui
//       window.location.href = "/Siswa";
//     } catch (error) {
//       console.error("Error updating siswa:", error);
//     }
//   };

//   return (
//     <Container>
//     <div className="container mt-4">
//        <h2>Edit Data Siswa</h2>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="nama">
//             <Form.Label>Nama Siswa</Form.Label>
//             <Form.Control
//               type="text"
//               name="nama"
//               value={Siswa.nama}
//               onChange={handleInputChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="kelas">
//             <Form.Label>Kelas</Form.Label>
//             <Form.Control
//               type="text"
//               name="kelas"
//               value={Siswa.kelas}
//               onChange={handleInputChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="alamat">
//             <Form.Label>Alamat</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               name="alamat"
//               value={Siswa.alamat}
//               onChange={handleInputChange}
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit" style={{ marginTop: '13px' }}>
//             Simpan Perubahan
//           </Button>
//         </Form>
//     </div>
//     </Container>
//   );
// };

// export default EditPage;
