import { iContact, iPagination } from '../../pages/Main';
import { StyledCard } from './styles';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { api } from '../../services/api';
import { useState } from 'react';
import { ContactModal } from '../Modal';
import { Button } from '../Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  tUpdateContactData,
  UpdateContactSchema,
} from '../../pages/Main/serializer';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface iProps extends iContact {
  setContacts: React.Dispatch<React.SetStateAction<iContact[]>>;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
}

export const ContactCard = ({
  id,
  fullName,
  email,
  phoneNumber,
  createdAt,
  setContacts,
  setPageNum,
}: iProps) => {
  const deleteContact = async (id: string) => {
    try {
      await api.delete(`/contacts/${id}`);

      setPageNum(1);
      toast.success('Contact deleted');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`${error.response?.data.message}`);
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<tUpdateContactData>({
    resolver: zodResolver(UpdateContactSchema),
    mode: 'onChange',
    defaultValues: {
      email,
      fullName,
      phoneNumber,
    },
  });

  const updateContact = async (data: tUpdateContactData) => {
    try {
      await api.patch(`/contacts/${id}`, data);

      const response = await api.get<iPagination>(
        `client/contacts?page=1`
      );
      setContacts(response.data.data);
      toast.success('Contact info updated');

      setTimeout(() => {
        toggleModal();
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

  const date = createdAt.slice(0, 10).split('-').reverse().join('/');

  return (
    <StyledCard id={id} className="card">
      <div>
        <p>{fullName}</p>
        <p>e-mail: {email}</p>
        <p>tel: {phoneNumber}</p>
        <p>added in: {date}</p>
      </div>
      <div className="icon-div">
        <FaPencilAlt onClick={toggleModal} />
        <FaTrashAlt onClick={() => deleteContact(id)} />
      </div>

      <ContactModal isOpen={isOpen} toggleModal={toggleModal}>
        <h2>Edit Contact</h2>
        <form onSubmit={handleSubmit(updateContact)}>
          <input
            type="text"
            placeholder="Name"
            id="fullName"
            {...register('fullName')}
          />
          {errors.fullName && (
            <small className="error">{errors.fullName.message}</small>
          )}

          <input
            type="email"
            placeholder="E-mail"
            id="email"
            {...register('email')}
          />
          {errors.email && (
            <small className="error">{errors.email.message}</small>
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

          <Button text="Update" />
        </form>
      </ContactModal>
    </StyledCard>
  );
};
