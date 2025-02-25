import React, { useState } from 'react';
import './App.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const remainingTasks = tasks.filter(task => !task.completed).length;

  return (
    <div className="App">
      <h1>ToDo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Новая задача"
          data-testid="task-input"
        />
        <button onClick={addTask} data-testid="add-task-button">
          Добавить
        </button>
      </div>

      <h2>Общий список</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id} data-testid="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              data-testid="task-checkbox"
            />
            <span className={task.completed ? 'completed' : ''}>
              {task.text}
            </span>
          </li>
        ))}
      </ul>

      <h2>Невыполненные задачи</h2>
      <ul>
        {tasks.filter(task => !task.completed).map(task => (
          <li key={task.id} data-testid="incomplete-task">
            <span>{task.text}</span>
          </li>
        ))}
      </ul>

      <h2>Выполненные задачи</h2>
      <ul>
        {tasks.filter(task => task.completed).map(task => (
          <li key={task.id} data-testid="completed-task">
            <span className="completed">{task.text}</span>
          </li>
        ))}
      </ul>

      <p className="task-count">Осталось задач: {remainingTasks}</p>
      <button className="clear-button" onClick={clearCompleted}>
        Очистить выполненные
      </button>
    </div>
  );
};

export default App;