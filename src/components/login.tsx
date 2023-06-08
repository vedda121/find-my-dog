import { useState } from 'react';
import axios from 'axios';
import { UserDetails } from '../models/models';

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function Login({ setIsAuthenticated }: LoginProps) {
  const [userDetails, setUserDetails] = useState<UserDetails>({ name: '', email: '' });

  const handleSignIn: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { status, data } = await axios.post(
      `${process.env.REACT_APP_API_PATH}/auth/login`,
      {
        name: userDetails.name,
        email: userDetails.email,
      },
      { withCredentials: true },
    );
    if (status === 200 && data === 'OK') {
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="mx-auto flex items-center justify-center md:h-screen">
      <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <form className="space-y-4 md:space-y-6" onSubmit={handleSignIn}>
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 ">
                Your name
              </label>
              <input
                type="name"
                name="name"
                id="name"
                className="block w-full rounded border border-gray-300 bg-white p-2.5 text-sm text-gray-500 shadow-sm duration-300 hover:border-gray-400 focus:outline-none focus:ring focus:ring-[#69516d]"
                placeholder="Alice Smith"
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="xyz@xyz.com"
                className="block w-full rounded border border-gray-300 bg-white p-2.5 text-sm text-gray-500 shadow-sm duration-300 hover:border-gray-400 focus:outline-none focus:ring focus:ring-[#69516d]"
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-[#300d38] px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-[#890075]"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
