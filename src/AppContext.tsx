import { createContext, useState, ReactNode, useEffect } from 'react';
import { api } from './services/api';
import { IFood, IFormAddFoodForm } from './types';

interface IProvider {
  children: ReactNode;
}

interface IProviderData {
  toggleModal: (action?: string | undefined) => void;
  useRegisterModal: (
    action: string
  ) => [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  foods: IFood[];
  setFoods: Function;
  deleteFood: Function;
  addFood: Function;
  setAvailableFood: Function;
  editingFood: IFood;
  startEditFood: Function;
  finishEditFood: Function;
}

export const AppContext = createContext({} as IProviderData);

export function AppProvider(props: IProvider) {
  const modals = new Map();
  const [foods, setFoods] = useState<IFood[]>([]);
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood);

  const toggleModal = (action?: string): void => {
    modals.forEach(([_, set], key) => {
      set(action ? key === action : false);
    });
  };

  const useRegisterModal = (action: string) => {
    const res = useState(false);
    modals.set(action, res);
    return res;
  };

  const deleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);
    setFoods(foods.filter(food => food.id !== id));
  };

  const addFood = async (food: IFormAddFoodForm) => {
    const response = await api.post('/foods', {
      ...food,
      available: true,
    });
    setFoods([...foods, response.data]);
    toggleModal();
  };

  const startEditFood = (id: number) => {
    const food = foods.find(f => f.id === id);
    if (food) {
      setEditingFood(food);
      toggleModal('edit');
      setAvailableFood(id, false);
    }
  };

  const finishEditFood = async (food: IFood) => {
    const check = foods.find(({ id }) => id === food.id);
    if (check) {
      const editedFood = {
        ...check,
        ...food,
        available: false,
      };
      await api.put(`/foods/${check.id}`, editedFood);
      setFoods(
        [...foods.filter(f => f.id !== check.id), editedFood].sort(
          (a, b) => a.id - b.id
        )
      );
      setFoods([...foods, editedFood].sort((a, b) => a.id - b.id));
      toggleModal();
    }
  };

  const setAvailableFood = async (
    id: number,
    available: 'toggle' | boolean
  ) => {
    const food = foods.find(f => f.id === id);
    if (food) {
      const toggled = {
        ...food,
        available: available === 'toggle' ? !food.available : available,
      };
      await api.put(`/foods/${food.id}`, toggled);
      setFoods(
        [...foods.filter(f => f.id !== id), toggled].sort((a, b) => a.id - b.id)
      );
    }
  };

  useEffect(() => {
    (async () => {
      const response = await api.get('/foods');
      setFoods(response.data);
    })();
  }, []);

  return (
    <AppContext.Provider
      value={{
        toggleModal,
        useRegisterModal,
        foods,
        setFoods,
        deleteFood,
        addFood,
        setAvailableFood,
        editingFood,
        startEditFood,
        finishEditFood,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
