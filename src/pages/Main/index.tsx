import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { ContactCard } from '../../components/ContactCard';
import { ContactModal } from '../../components/Modal';
import { api } from '../../services/api';
import {
  tUpdateClientData,
  tUpdateContactData,
  UpdateClientSchema,
  UpdateContactSchema,
} from './serializer';
import { StyledDiv } from './style';
import { BsPersonFillAdd } from 'react-icons/bs';
import { FaPencilAlt } from 'react-icons/fa';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { FiLogOut } from 'react-icons/fi';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFDocument } from '../../components/PDF';
import { VscFilePdf } from 'react-icons/vsc';

export interface iContact {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
}

export interface iClient extends iContact {
  password: string;
}

export interface iPagination {
  count: number;
  data: iContact[];
  nextPage: string | null;
  prevPage: string | null;
}

export const MainPage = () => {
  const [contacts, setContacts] = useState<iContact[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [maxPage, setMaxPage] = useState(2);
  const [count, setCount] = useState<number>();
  const [lastElement, setLastElement] =
    useState<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const observer = useRef(
    new IntersectionObserver((entries) => {
      console.log('const observer');
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNum((no) => no + 1);
      }
    })
  );

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('login');
    }

    api.defaults.headers.common.authorization = `Bearer ${token}`;
  });

  const loadContacts = async () => {
    const response = await api.get<iPagination>(
      `client/contacts?page=${pageNum}`
    );
    setCount(response.data.count);
    const all = new Set([...contacts, ...response.data.data]);

    if (pageNum == 1) {
      setContacts(response.data.data);
    } else {
      setContacts([...all]);
    }
    setMaxPage(Math.ceil(response.data.count / 4));
  };

  useEffect(() => {
    (async () => {
      const response = await api.get('/client');
      setClient(response.data);
      if (pageNum <= maxPage) {
        loadContacts();
      }
    })();
  }, [pageNum]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [client, setClient] = useState<iClient | null>(null);

  const toggleModal = async () => {
    setIsOpen(!isOpen);
    reset();
  };

  const toggleModalContact = async () => {
    setIsOpen2(!isOpen2);
    reset2();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors},
  } = useForm<tUpdateClientData>({
    resolver: zodResolver(UpdateClientSchema),
    mode: 'onChange',
  });

  const updateClient = async (data: tUpdateClientData) => {
    try {
      const response = await api.patch('/client', data);
      setClient(response.data);
      toast.success('Profile updated');
      setTimeout(() => {
        toggleModal();
      }, 300);
      toggleModal();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`${error.response?.data.message}`);
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    reset: reset2,
  } = useForm<tUpdateContactData>({
    resolver: zodResolver(UpdateContactSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      fullName: '',
      phoneNumber: '',
    },
  });

  const createContact = async (data: tUpdateContactData) => {
    try {
      await api.post(`/contacts/`, data);

      // const response = await api.get<iPagination>(
      //   `client/contacts?page=1`
      // );
      // setContacts(response.data.data);
      setPageNum(1);
      toast.success('Contact added');
      loadContacts();

      setTimeout(() => {
        toggleModalContact();
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

  const logOut = () => {
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate('login');
    }, 300);
    toast.success('See you later!');
  };

  return (
    <>
      <StyledDiv>
        <div className="left-div">
          <div>
            <div>
              <p>{client?.fullName}</p>
              <p>e-mail: {client?.email}</p>
              <p>tel: {client?.phoneNumber}</p>
              <p>contacts: {count}</p>
            </div>
            <FaPencilAlt onClick={toggleModal} />
            <FiLogOut onClick={logOut} />
            <ContactModal isOpen={isOpen} toggleModal={toggleModal}>
              <h2>Edit Profile</h2>
              <form onSubmit={handleSubmit(updateClient)}>
                <input
                  type="text"
                  placeholder="Name"
                  id="fullName"
                  defaultValue={client?.fullName}
                  {...register('fullName')}
                />
                {errors.fullName && (
                  <small className="error">
                    {errors.fullName.message}
                  </small>
                )}

                <input
                  type="email"
                  placeholder="E-mail"
                  id="email"
                  defaultValue={client?.email}
                  {...register('email')}
                />
                {errors.email && (
                  <small className="error">
                    {errors.email.message}
                  </small>
                )}

                <input
                  type="text"
                  placeholder="Phone Number"
                  id="phoneNumber"
                  defaultValue={client?.phoneNumber}
                  {...register('phoneNumber')}
                />
                {errors.phoneNumber && (
                  <small className="error">
                    {errors.phoneNumber.message}
                  </small>
                )}
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  defaultValue={'**********'}
                  {...register('password')}
                />
                {errors.password && (
                  <small className="error">
                    {errors.password.message}
                  </small>
                )}
                <Button text="Update" />
              </form>
            </ContactModal>
          </div>
        </div>

        <div className="right-div">
          <div className="top-bar">
            <small>
              <BsPersonFillAdd onClick={toggleModalContact} />
              <PDFDownloadLink
                document={<PDFDocument />}
                fileName="CONTACTS"
              >
                {({ loading }) => (loading ? <p>oi</p> : <VscFilePdf />)}
              </PDFDownloadLink>
              <ContactModal
                isOpen={isOpen2}
                toggleModal={toggleModalContact}
              >
                <h2>Add Contact</h2>
                <form onSubmit={handleSubmit2(createContact)}>
                  <input
                    type="text"
                    placeholder="Name"
                    id="fullName"
                    {...register2('fullName')}
                  />
                  {errors2.fullName && (
                    <small className="error">
                      {errors2.fullName.message}
                    </small>
                  )}

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
                    type="text"
                    placeholder="Phone Number"
                    id="phoneNumber"
                    {...register2('phoneNumber')}
                  />
                  {errors2.phoneNumber && (
                    <small className="error">
                      {errors2.phoneNumber.message}
                    </small>
                  )}

                  <Button text="Add" />
                </form>
              </ContactModal>
            </small>
          </div>
          <div className="contact-div">
            {contacts.length == 0 ? (
              <div className="no-contacts">
                <h2>Seems like your contact list is empty!</h2>
                <h3>Let's start adding!</h3>
                <BsPersonFillAdd onClick={toggleModalContact} />
              </div>
            ) : (
              contacts.map((contact, i) => {
                return i === contacts.length - 1 &&
                  pageNum <= maxPage ? (
                  <div
                    key={`${contact.id}-${i}`}
                    ref={setLastElement}
                  >
                    <ContactCard
                      id={contact.id}
                      key={contact.id}
                      fullName={contact.fullName}
                      email={contact.email}
                      phoneNumber={contact.phoneNumber}
                      createdAt={contact.createdAt}
                      setContacts={setContacts}
                      setPageNum={setPageNum}
                    />
                  </div>
                ) : (
                  <ContactCard
                    id={contact.id}
                    key={contact.id}
                    fullName={contact.fullName}
                    email={contact.email}
                    phoneNumber={contact.phoneNumber}
                    createdAt={contact.createdAt}
                    setContacts={setContacts}
                    setPageNum={setPageNum}
                  />
                );
              })
            )}
          </div>
          <div className="bottom-bar" />
        </div>
      </StyledDiv>
    </>
  );
};
