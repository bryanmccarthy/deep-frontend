import axios from "axios";

function Main() {
  async function handleLogout() {
    const res = await axios.get('http://localhost:3000/users/logout', {
      withCredentials: true,
    })
    if (res && res.status === 200) {
      sessionStorage.removeItem('user');
      window.location.reload();
    }
  }

  return (
    <div>
      <h1>Main</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Main;
