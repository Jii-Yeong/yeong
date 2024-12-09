import DepsTodoList from '@/components/todo-item/DepsTodoList/DepsTodoList';
import './TodoDashboard.scoped.scss';
import { useMemo } from 'react';
import { useTodoCategory } from '@/hooks/todo/useTodoCategory';
import { useSearchParams } from 'react-router-dom';

export default function TodoDashboard() {
  const [searchParams] = useSearchParams();
  const { categoryList } = useTodoCategory();
  const categoryName = useMemo(
    () =>
      categoryList.find(
        (item) => item.id === Number(searchParams.get('category_id'))
      )?.name || '전체',
    [categoryList, searchParams]
  );
  return (
    <div className="todo-dash-board">
      <p>{categoryName}</p>
      <div className="todo-list-container">
        <DepsTodoList />
      </div>
    </div>
  );
}
