import axios from "axios";

function Main() {
  return (
    <div>
      <h1>Main</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

async function handleLogout() {
  const res = await axios.get('http://localhost:3000/auth/logout', {
    withCredentials: true,
    }
  )
  
  if (res && res.status === 200) {
    sessionStorage.removeItem('user');
    window.location.reload();
  }
}

export default Main;
