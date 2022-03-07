import { useRef, useContext } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { AppContext } from '../../AppContext';
import { IFormAddFoodForm } from '../../types';
import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

interface IProps {
  action: string;
}

export function ModalEditFood({ action }: IProps) {
  const { editingFood, finishEditFood, setAvailableFood, toggleModal } =
    useContext(AppContext);

  const formRef = useRef(null);

  const handleSubmit = async (data: IFormAddFoodForm) => {
    finishEditFood({ ...editingFood, ...data });
  };

  const onRequestClose = () => {
    const { id, available } = editingFood;
    if (typeof id === 'number' && typeof available === 'boolean') {
      setAvailableFood(id, available);
    }
    toggleModal();
  };

  return (
    <Modal {...{ action, onRequestClose }}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
