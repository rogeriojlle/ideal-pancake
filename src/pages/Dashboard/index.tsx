import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { Header } from '../../components/Header';
import { Food } from '../../components/Food';
import { FoodsContainer } from './styles';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';

export function Dashboard() {
  const { foods } = useContext(AppContext);
  return (
    <>
      <Header />
      <ModalAddFood action="add" />
      <ModalEditFood action="edit" />
      <FoodsContainer data-testid="foods-list">
        {foods && foods.map(food => <Food key={food.id} food={food} />)}
      </FoodsContainer>
    </>
  );
}
