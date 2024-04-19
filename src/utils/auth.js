// utils/auth.js

export const isAuthenticated = () => {
    // Cek apakah pengguna sudah login
    // Misalnya, Anda dapat memeriksa apakah token sudah tersimpan di local storage
    return localStorage.getItem("token") !== null;
  };