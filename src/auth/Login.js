import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function LoginForm() {
  // State untuk menyimpan nilai email dan password
  const [showPassword, setShowPassword] = useState(false); 
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [role, setRole] = useState("admin"); 
 
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const passwordInputType = showPassword ? 'text' : 'password';


  const handleLogin = async (e) => { 
    e.preventDefault(); 
 
    const data = { 
      username: username, 
      password: password, 
      role: role, 
    }; 
 
    try { 
      const response = await axios.post(`http://localhost:8080/login`, data); 
 
      if (response.status === 200) { 
        Swal.fire({ 
          icon: "success", 
          title: "Berhasil Login Sebagai Admin", 
          showConfirmButton: false, 
          timer: 1500, 
        }); 
 
        // Redirect user to dashboard after successful login 
        setTimeout(() => { 
          window.location.href = "/home"; 
        }, 1500); 
 
        localStorage.setItem("id", response.data.userData.id); 
        localStorage.setItem("role", response.data.userData.role); 
        localStorage.setItem("token", response.data.token); 
      } 
    } catch (error) { 
      Swal.fire({ 
        icon: "error", 
        title: "Username / Password Salah", 
      }); 
      console.error(error); 
    } 
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card-group mb-3">
            <div className="card p-4">
              <div className="card-body">
                <h2>Login</h2>
                <p>:</p>
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Username"
                      autoComplete="off"
                      className="form-control"
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)}

                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type={passwordInputType}
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="form-control"
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}

                    />
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
                    Login
                    
                  </button>
                </form>
                <p className="lead"></p>
              </div>
            </div>
            <div className="card bg-secondary py-5 d-md-down-none" style={{ width: '44%' }}>
              <div className="card-body text-center">
                <div className="mt-3 text-left">
                  <h2 style={{ color: 'white' }}>Sign up</h2>
                  <p className="mt-3" style={{ color: 'white' }}>Masuk dengan mengisi Email dan password</p>
                  <Link
                      to="/Register"
                      className="btn btn-primary btn-lg active mt-3 text-uppercase"
                      style={{ backgroundColor: 'var(--bs-secondary-bg)', color: 'black' }}
                      >
                      Register
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

export default LoginForm;
