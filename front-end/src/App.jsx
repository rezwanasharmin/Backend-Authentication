import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('register')

  // Registration Form State (Teacher's code style)
  const [fromdata, setFromdata] = useState({
    username: '',
    email: '',
    password: ''
  })

  // Login Form State
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  // Forget Password State
  const [forgetData, setForgetData] = useState({
    email: ''
  })

  // Users List State
  const [users, setUsers] = useState([])

  // Addresses List State (populated with user data)
  const [addresses, setAddresses] = useState([])

  // Edit User State
  const [editingUser, setEditingUser] = useState(null)
  const [editFormData, setEditFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  // Response message state
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  // Teacher's exact function name: handleFromData
  const handleFromData = (e) => {
    setFromdata({
      ...fromdata,
      [e.target.name]: e.target.value
    })
  }

  // Teacher's exact function name: handleSumbit
  const handleSumbit = (e) => {
    if (e) e.preventDefault()
    axios.post("http://localhost:8000/registration", fromdata)
      .then((res) => {
        console.log("registation successfull")
        setMessage(res.data)
        setIsError(false)
      })
      .catch((err) => {
        console.log(err)
        setMessage(err.response?.data || err.message)
        setIsError(true)
      })
  }

  // Handle Login
  const handleLoginSubmit = (e) => {
    if (e) e.preventDefault()
    axios.post("http://localhost:8000/login", loginData)
      .then((res) => {
        console.log("login response:", res.data)
        setMessage(res.data)
        setIsError(res.data === 'Invalid password' || (typeof res.data === 'string' && res.data.includes('Not registered')))
      })
      .catch((err) => {
        console.log(err)
        setMessage(err.response?.data || err.message)
        setIsError(true)
      })
  }

  // Handle Forget Password
  const handleForgetSubmit = (e) => {
    if (e) e.preventDefault()
    axios.post("http://localhost:8000/forgetpassword", forgetData)
      .then((res) => {
        console.log("forget password response:", res.data)
        setMessage(res.data)
        setIsError(false)
      })
      .catch((err) => {
        console.log(err)
        setMessage(err.response?.data || err.message)
        setIsError(true)
      })
  }

  // Handle Load Users
  const handleFetchUsers = () => {
    axios.get("http://localhost:8000/allusers")
      .then((res) => {
        setUsers(res.data)
        setMessage(`Loaded ${res.data.length} users`)
        setIsError(false)
      })
      .catch((err) => {
        console.log(err)
        setMessage(err.response?.data || err.message)
        setIsError(true)
      })
  }

  // Handle Load Addresses with Populated User
  const handleFetchAddresses = () => {
    axios.get("http://localhost:8000/address")
      .then((res) => {
        setAddresses(res.data)
        setMessage(`Loaded ${res.data.length} addresses with populated user data`)
        setIsError(false)
      })
      .catch((err) => {
        console.log(err)
        setMessage(err.response?.data || err.message)
        setIsError(true)
      })
  }

  // Open Edit Form for a user
  const handleStartEdit = (user) => {
    setEditingUser(user)
    setEditFormData({
      username: user.username,
      email: user.email,
      password: ''
    })
    setMessage('')
  }

  // Submit User Edit
  const handleEditSubmit = (e) => {
    if (e) e.preventDefault()
    axios.post(`http://localhost:8000/editUser/${editingUser._id}`, editFormData)
      .then((res) => {
        console.log("edit response:", res.data)
        setMessage(res.data)
        setIsError(false)
        setEditingUser(null)
        handleFetchUsers()
      })
      .catch((err) => {
        console.log(err)
        setMessage(err.response?.data || err.message)
        setIsError(true)
      })
  }

  // Handle Delete User
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:8000/deleteUser/${id}`)
        .then((res) => {
          console.log("delete response:", res.data)
          setMessage(res.data)
          setIsError(false)
          handleFetchUsers()
        })
        .catch((err) => {
          console.log(err)
          setMessage(err.response?.data || err.message)
          setIsError(true)
        })
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Authentication App</h1>
        <p>Connect React Front-end with Node.js Back-end</p>
      </div>

      <div className="tabs">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => { setActiveTab('register'); setMessage(''); setEditingUser(null); }}
        >
          Register
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => { setActiveTab('login'); setMessage(''); setEditingUser(null); }}
        >
          Login
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'forget' ? 'active' : ''}`}
          onClick={() => { setActiveTab('forget'); setMessage(''); setEditingUser(null); }}
        >
          Forgot
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => { setActiveTab('users'); setMessage(''); setEditingUser(null); handleFetchUsers(); }}
        >
          Users & Edit
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'addresses' ? 'active' : ''}`}
          onClick={() => { setActiveTab('addresses'); setMessage(''); setEditingUser(null); handleFetchAddresses(); }}
        >
          Addresses
        </button>
      </div>

      {activeTab === 'register' && (
        <form onSubmit={handleSumbit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={fromdata.username}
              onChange={handleFromData}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={fromdata.email}
              onChange={handleFromData}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={fromdata.password}
              onChange={handleFromData}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Register Account
          </button>
        </form>
      )}

      {activeTab === 'login' && (
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter registered email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Log In
          </button>
        </form>
      )}

      {activeTab === 'forget' && (
        <form onSubmit={handleForgetSubmit}>
          <div className="form-group">
            <label>Registered Email</label>
            <input
              type="email"
              placeholder="Enter your email to reset password"
              value={forgetData.email}
              onChange={(e) => setForgetData({ email: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Send Reset Email
          </button>
        </form>
      )}

      {activeTab === 'users' && (
        <div>
          {editingUser && (
            <div className="edit-box">
              <h3>Edit User: {editingUser.username}</h3>
              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={editFormData.username}
                    onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>New Password (Optional)</label>
                  <input
                    type="password"
                    placeholder="Leave blank to keep existing password"
                    value={editFormData.password}
                    onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                  />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="submit" className="submit-btn" style={{ margin: 0, background: '#f59e0b', color: '#0f172a' }}>
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="action-btn cancel-btn"
                    onClick={() => setEditingUser(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <button type="button" className="submit-btn" onClick={handleFetchUsers}>
            Refresh Users List
          </button>

          <div className="users-list">
            {users.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '10px' }}>No users found. Click refresh.</p>
            ) : (
              users.map((user) => (
                <div key={user._id} className="user-card">
                  <div><span>Name:</span> {user.username}</div>
                  <div><span>Email:</span> {user.email}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}><span>ID:</span> {user._id}</div>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="action-btn edit-btn"
                      onClick={() => handleStartEdit(user)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      type="button"
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'addresses' && (
        <div>
          <button type="button" className="submit-btn" onClick={handleFetchAddresses}>
            Refresh Addresses List
          </button>
          <div className="users-list">
            {addresses.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '10px' }}>No address found. Click refresh.</p>
            ) : (
              addresses.map((item) => (
                <div key={item._id} className="user-card">
                  <div><span>Road:</span> {item.road}, <span>City:</span> {item.city}</div>
                  <div><span>State:</span> {item.state}, <span>Zip:</span> {item.zip}</div>
                  <div style={{ marginTop: '4px', color: '#38bdf8' }}>
                    <span>Populated User:</span> {item.userId?.username || 'Unknown'} ({item.userId?.email || 'No email'})
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {message && (
        <div className={`message-box ${isError ? 'error' : ''}`}>
          {message}
        </div>
      )}
    </div>
  )
}

export default App
