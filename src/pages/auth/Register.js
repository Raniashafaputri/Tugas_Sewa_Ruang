import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faKey,
  faEyeSlash,
  faEye,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role changed to "user"
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      const response = await axios.post(`http://localhost:2001/register`, {
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
        Swal.fire({
          icon: "success",
          title: "Berhasil Register",
          showConfirmButton: false,
          timer: 1500,
        });
        // Redirecting user to login page
        setTimeout(() => {
          window.location.href = "/Login";
        }, 1500);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan saat mendaftar. Coba lagi nanti.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-2xl flex max-w-3xl p-5 items-center">
      <div className="md:w-1/2 px-8">
          <h1 className="text-2xl font-semibold mt-4">Register</h1>
          <p className="text-sm mt-4 text-[#002D74]"></p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
              {/* Input with FontAwesome icon */}
              <div className="flex items-center border rounded-xl">
                <span className="p-2 bg-gray-200 rounded-l-xl">
                  <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                </span>
                <input
                  className="p-2 w-full rounded-r-xl border-l-0 focus:outline-none"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

           <div className="relative">
              {/* Password input with FontAwesome icon and toggle button */}
              <div className="flex items-center border rounded-xl">
                <span className="p-2 bg-gray-200 rounded-l-xl">
                  <FontAwesomeIcon icon={faLock} className="text-gray-500" />
                </span>
                <input
                  className="p-2 w-full rounded-r-xl border-l-0 focus:outline-none"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Toggle button for password visibility */}
                <span
                  className="p-2 bg-gray-200 rounded-r-xl cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className="text-gray-500"
                  />
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#40A2E3] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#40A2E3] font-medium"
            >
              Register
            </button>
          </form>
      
          <div className="mt-4 text-sm flex justify-between items-center container-mr">
            <p className="mr-3 md:mr-0"></p>
            <button className="hover:border register text-white bg-[#40A2E3] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">
              <a href="Login">
              Login
              </a>
            </button>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl max-h-[1600px]"
            src="https://img.freepik.com/vector-gratis/ilustracion-concepto-politica-privacidad_114360-7853.jpg"
            alt="Privacy Policy Illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default Register;
