import React, { useState } from 'react';
import axios from 'axios';

const Authentication = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');

  const [lemail, setlemail] = useState('');
  const [lpassword, setlpassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password != cpassword) {
      alert('Password and confirm not match');
      return;
    }
    try {
      const response = await axios.post(
        'https://wild-cod-visor.cyclic.app/api/auth/signup',
        {
          name,
          email,
          mobile,
          password,
        }
      );
      alert('Account created successfully you can now login');
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://wild-cod-visor.cyclic.app/api/auth/login',
        {
          email: lemail,
          password: lpassword,
        }
      );
      const { data } = response;
      localStorage.setItem('user', JSON.stringify(data));
      window.location.href = '/';
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
    <div className="auth">
      <div className="auth-signup">
        <h1>Create Account</h1>
        <form onSubmit={handleSignUp} className="auth-signup-form">
          <table>
            {' '}
            <tbody>
              <tr>
                <td>
                  <label htmlFor="name">Name</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    onChange={(e) => setname(e.target.value)}
                  />
                </td>
              </tr>

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
                    onChange={(e) => setemail(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="mobile">Mobile</label>
                </td>
                <td>
                  <input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    required
                    onChange={(e) => setmobile(e.target.value)}
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
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="password"> Confirm Password</label>
                </td>
                <td>
                  <input
                    type="password"
                    name="password"
                    id="cpassword"
                    required
                    onChange={(e) => setcpassword(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit"> Create Account</button>
        </form>
      </div>
      <div className="auth-login">
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="auth-signup-form">
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="lemail">Email</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="email"
                    id="lemail"
                    required
                    onChange={(e) => setlemail(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="lpassword">Password</label>
                </td>
                <td>
                  <input
                    type="password"
                    name="password"
                    id="lpassword"
                    required
                    onChange={(e) => setlpassword(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit"> Login</button>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
