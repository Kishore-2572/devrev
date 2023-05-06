import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/adminlogin',
        {
          email,
          password,
        }
      );
      const { data } = response;
      localStorage.setItem('user', JSON.stringify(data));
      window.location.href = '/admin';
    } catch (e) {
      const { response } = e;
      const { data } = response;
      if (data) {
        alert(data['message']);
      } else {
        alert('Something went wrong');
      }
    }
  };

  return (
    <div className="admin-login">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="auth-signup-form">
        <table>
          {' '}
          <tbody>
            <tr>
              <td>
                <label htmlFor="email">Email</label>
              </td>
              <td>
                <input
                  type="text"
                  name="email"
                  id="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label htmlFor="password">Password</label>
              </td>
              <td>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
            </tr>
          </tbody>{' '}
        </table>
        <button type="submit"> Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
