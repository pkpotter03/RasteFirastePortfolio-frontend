const Header = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="header flex justify-between items-center p-6 bg-gray-800 text-white">
      <h1 className="flex justify-center text-4xl font-bold">Admin Dashboard</h1>
      <button className="text-lg bg-red-500 py-2 px-4 rounded-4xl cursor-pointer hover:bg-red-700" onClick={logout}>logout</button>
    </div>
  );
}

export default Header;