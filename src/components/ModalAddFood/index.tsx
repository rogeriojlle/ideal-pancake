import { useContext } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { Form } from './styles';
import { Modal, onRequestCloseDefault as onRequestClose } from '../Modal';
import { Input } from '../Input';
import { AppContext } from '../../AppContext';
import { IFormAddFoodForm } from '../../types';

interface IProps {
  action: string;
}

export function ModalAddFood({ action }: IProps) {
  const { addFood } = useContext(AppContext);

  const handleAddFood = (food: IFormAddFoodForm) => {
    addFood(food);
  };

  return (
    <Modal {...{ action, onRequestClose }}>
      <Form onSubmit={handleAddFood}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
