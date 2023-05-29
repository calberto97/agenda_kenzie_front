import { useContext, useEffect } from 'react';
import { StyledDiv } from './styles';
import login from '../../assets/login.svg';
import { useForm } from 'react-hook-form';
import {
  LoginSchema,
  RegisterSchema,
  tLoginData,
  tRegisterData,
} from './serializer';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '../../providers/AuthProvider';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      console.log(token)
      navigate('/main');
    }

  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<tRegisterData>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange',
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: {
      errors: errors2,
      isDirty: isDirty2,
      isValid: isValid2,
    },
  } = useForm<tLoginData>({
    resolver: zodResolver(LoginSchema),
    mode: 'all',
  });

  const { signIn, signUp, registerAcc, setRegisterAcc } =
    useContext(AuthContext);

  return (
    <>
      <StyledDiv>
        <div className="left-div">
          {registerAcc ? (
            <form onSubmit={handleSubmit(signUp)}>
              <input
                type="email"
                placeholder="E-mail"
                id="email"
                {...register('email')}
              />
              {errors.email && (
                <small className="error">
                  {errors.email.message}
                </small>
              )}
              <input
                type="password"
                placeholder="Password"
                id="password"
                {...register('password')}
              />
              {errors.password && (
                <small className="error">
                  {errors.password.message}
                </small>
              )}
              <input
                type="text"
                placeholder="Name"
                id="fullName"
                {...register('fullName')}
              />
              {errors.fullName && (
                <small className="error">
                  {errors.fullName.message}
                </small>
              )}
              <input
                type="text"
                placeholder="Phone Number"
                id="phoneNumber"
                {...register('phoneNumber')}
              />
              {errors.phoneNumber && (
                <small className="error">
                  {errors.phoneNumber.message}
                </small>
              )}
              {/* <StyledButton
                type="submit"
                isDirty={isDirty}
                isValid={isValid}
              >
                Register
              </StyledButton> */}
              <Button
                text="Register"
                isDirty={isDirty2}
                isValid={isValid2}
              />
              <p onClick={() => setRegisterAcc(false)}>
                Already have an account?
              </p>
            </form>
          ) : (
            <form onSubmit={handleSubmit2(signIn)}>
              <input
                type="email"
                placeholder="E-mail"
                id="email"
                {...register2('email')}
              />
              {errors2.email && (
                <small className="error">
                  {errors2.email.message}
                </small>
              )}
              <input
                type="password"
                placeholder="Password"
                id="password"
                {...register2('password')}
              />
              {errors2.password && (
                <small className="error">
                  {errors2.password.message}
                </small>
              )}
              {/* <StyledButton
                type="submit"
                isDirty={isDirty}
                isValid={isValid}
              >
                Login
              </StyledButton> */}
              <Button
                text="Login"
                isDirty={isDirty}
                isValid={isValid}
              />
              <p onClick={() => setRegisterAcc(true)}>
                Create new account
              </p>
            </form>
          )}
        </div>
        <div className="right-div">
          <div>
            <h2>Kenzie</h2>
            <h2>agenda</h2>
          </div>
          <img src={login} alt="" />
        </div>
      </StyledDiv>
    </>
  );
};
