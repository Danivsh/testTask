import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

test('добавление задачи', () => {
  render(<App />);
  const input = screen.getByTestId('task-input');
  const button = screen.getByTestId('add-task-button');

  fireEvent.change(input, { target: { value: 'Новая задача' } });
  fireEvent.click(button);

  const taskItem = screen.getByTestId('task-item');
  expect(taskItem).toHaveTextContent('Новая задача');
});

test('переключение статуса задачи', () => {
  render(<App />);
  const input = screen.getByTestId('task-input');
  const button = screen.getByTestId('add-task-button');

  fireEvent.change(input, { target: { value: 'Новая задача' } });
  fireEvent.click(button);

  const checkbox = screen.getByTestId('task-checkbox');
  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();
});

test('очистка выполненных задач', () => {
  render(<App />);
  const input = screen.getByTestId('task-input');
  const addButton = screen.getByTestId('add-task-button');
  const clearButton = screen.getByText('Очистить выполненные');

  fireEvent.change(input, { target: { value: 'Новая задача' } });
  fireEvent.click(addButton);

  const checkbox = screen.getByTestId('task-checkbox');
  fireEvent.click(checkbox);
  fireEvent.click(clearButton);

  expect(screen.queryByText('Новая задача')).not.toBeInTheDocument();
});