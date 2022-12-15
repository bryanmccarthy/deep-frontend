import './Header.scss'
import axios from "axios";

function Header() {

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

  return (
    <div className="Header">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Header;
