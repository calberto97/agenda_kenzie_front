import { AxiosError } from 'axios';
import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tLoginData, tRegisterData } from '../pages/Login/serializer';
import { api } from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface iProps {
  children: ReactNode;
}

interface iValues {
  signIn: (data: tLoginData) => void;
  signUp: (data: tRegisterData) => void;
  registerAcc: boolean;
  setRegisterAcc: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<iValues>({} as iValues);

export const AuthProvider = ({ children }: iProps) => {
  const navigate = useNavigate();
  const [registerAcc, setRegisterAcc] = useState(false);

  const signIn = async (data: tLoginData) => {
    try {
      const response = await api.post('/client/login', data);

      const { token } = response.data;

      api.defaults.headers.common.authorization = `Bearer ${token}`;
      localStorage.setItem('token', token);

      toast.success('Login successful');

      setTimeout(() => {
        navigate('main');
      }, 300);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`${error.response?.data.message}`);
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };

  const signUp = async (data: tRegisterData) => {
    try {
      await api.post('/client', data);

      toast.success('Account created');

      setTimeout(() => {
        setRegisterAcc(!registerAcc);
      }, 300);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`${error.response?.data.message}`);
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signUp, registerAcc, setRegisterAcc }}
    >
      {children}
    </AuthContext.Provider>
  );
};
