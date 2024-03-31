import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Register() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [role, setRole] = useState("admin"); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [show, setShow] = useState(false); 
  const [showPassword, setShowPassword] = useState(false); 

 
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
 
    if (username.trim() === "" || password.trim() === "") { 
      setErrorMessage("Username dan password harus diisi."); 
      return; 
    } 
 
    if ( 
      password.length < 8 || 
      !/[A-Z]/.test(password) || 
      !/[a-z]/.test(password) 
    ) { 
      Swal.fire({ 
        icon: "error", 
        title: 
          "Password harus memiliki minimal 8 karakter, satu huruf besar, dan satu huruf kecil.", 
        showConfirmButton: false, 
        timer: 1500, 
      }); 
      return; 
    } 
 
    try { 
      const response = await axios.post(`http://localhost:8080/register`, { 
        username, 
        password, 
        role, 
      }); 
 
      if (response.data === "Username already taken") { 
        Swal.fire({ 
          icon: "error", 
          title: "Username sudah terdaftar. Pilih username lain.", 
          showConfirmButton: false, 
          timer: 1500, 
        }); 
      } else { 
        setShow(false); 
        Swal.fire({ 
          icon: "success", 
          title: "Berhasil Register", 
          showConfirmButton: false, 
          timer: 1500, 
        }); 
        // Redirecting user to login page 
        setTimeout(() => { 
          window.location.href = "/login"; 
        }, 1500); 
      } 
    } catch (error) { 
      console.error("Error during registration:", error); 
      setShow(false); 
      Swal.fire({ 
        icon: "error", 
        title: "Terjadi kesalahan saat mendaftar. Coba lagi nanti.", 
        showConfirmButton: false, 
        timer: 1500, 
      }); 
    } 
  };

  // Fungsi untuk menampilkan atau menyembunyikan password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Tentukan tipe input password berdasarkan status showPassword
  const passwordInputType = showPassword ? 'text' : 'password';

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card-group mb-3">
            <div className="card p-4">
              <div className="card-body">
                <h2>Register</h2>
                <p>:</p>
               <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="username"
                      autoComplete="off"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type={passwordInputType}
                      name="password"
                      id="password"
                      placeholder="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}                    />
                  </div>
                  <div className="form-group mt-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="showPassword"
                        checked={showPassword}
                        onChange={toggleShowPassword}
                      />
                      <label className="form-check-label" htmlFor="showPassword">
                        Show Password
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-secondary mt-3">
                    Register
                  </button>
                  {/* <div className="card-body">
                    <form onSubmit={handleSubmit}>
                    </form>
                    <p className="lead">Belum punya akun? <Link to="/Login">Login sekarang
                    </Link></p>
                  </div>` */}
                </form>
                <p className="lead"></p>
              </div>
            </div>
            <div className="card bg-secondary py-5 d-md-down-none" style={{ width: '44%' }}>
              <div className="card-body text-center">
                <div className="mt-3 text-left">
                  <h2 style={{ color: 'white' }}>Sign up</h2>
                  <p className="mt-3" style={{ color: 'white' }}>Masuk dengan mengisi Nama Depan, Nama Belakang, Email, password</p>
                  <Link
                      to="/Login"
                      className="btn btn-primary btn-lg active mt-3 text-uppercase"
                      style={{ backgroundColor: 'var(--bs-secondary-bg)', color: 'black' }}
                      >
                      Login
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
