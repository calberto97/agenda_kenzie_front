import { AuthProvider } from './providers/AuthProvider';
import { RoutesMain } from './routes';
import GlobalStyle from './styles/GlobalStyle';
import { ModalProvider } from 'styled-react-modal';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer autoClose={1600} />
      <AuthProvider>
        <ModalProvider>
          <RoutesMain />
        </ModalProvider>
      </AuthProvider>
    </>
  );
}

export default App;
