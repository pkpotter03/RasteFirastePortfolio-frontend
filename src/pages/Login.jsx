
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple authentication check (replace with real backend check later)
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdmin", "true"); // store login status
      navigate("/admin");
    } else {
      setError("Invalid username or password. Please try again.");
      localStorage.removeItem("isAdmin"); // clear login status on failure
    }
  };

  return (
    <div className="Login-container flex justify-center item-top">
        <div className="Login-card border bg-slate-50 w-1/4 mt-10 p-3 flex flex-col rounded-md shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          
          <form onSubmit={handleLogin} className="flex flex-col">
            <label htmlFor="username" className="mx-5 my-2">Username:</label>
            <input 
              type="text" 
              name="username" 
              id="username" 
              className="mx-5 p-2 border border-gray-500 rounded-sm" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
            
            <label htmlFor="password" className="mx-5 my-2">Password:</label>
            <div className="relative mx-5">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                id="password" 
                className="w-full p-2 border border-gray-500 rounded-sm pr-10" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required

              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
            {error && <p className="mx-5 my-2 text-red-500">{error}</p>}
            <button 
              type="submit"
              className="p-2 bg-green-500 mx-10 mt-10 mb-2 rounded-full hover:bg-green-600 transition-colors disabled:bg-gray-400" 
            >
              Login
            </button>

          </form>
        </div>
      </div>
  );
};

export default Login;
