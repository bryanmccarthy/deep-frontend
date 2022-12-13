import axios from "axios";

function Main() {
  async function handleLogout() {
    const res = await axios.get('http://localhost:3000/users/logout', {
      withCredentials: true,
    })
    sessionStorage.removeItem('user');
    window.location.reload();
  }

  async function test() {
    const res = await axios.get('http://localhost:3000/users/secret', {
      withCredentials: true,
    })
    console.log(res.data);
  }

  return (
    <div>
      <h1>Main</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={test}>Test</button>
    </div>
  );
}

export default Main;
