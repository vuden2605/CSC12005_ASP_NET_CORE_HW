// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5004';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/Tasks`);
      setTasks(response.data);
      applyFilter(response.data, filter);
    } catch (err) {
      setError('Không thể tải danh sách task. Vui lòng kiểm tra kết nối API.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Apply filter
  const applyFilter = (taskList, filterType) => {
    if (filterType === 'all') {
      setFilteredTasks(taskList);
    } else {
      const filtered = taskList.filter(task => task.status === filterType);
      setFilteredTasks(filtered);
    }
  };

  // Handle filter change
  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    applyFilter(tasks, filterType);
  };

  // Create new task
  const handleCreateTask = async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/api/Tasks`, taskData);
      const newTasks = [response.data, ...tasks];
      setTasks(newTasks);
      applyFilter(newTasks, filter);
      return true;
    } catch (err) {
      setError('Không thể tạo task mới.');
      console.error('Error creating task:', err);
      return false;
    }
  };

  // Update task
  const handleUpdateTask = async (id, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/api/Tasks/${id}`, taskData);
      const newTasks = tasks.map(task => 
        task.id === id ? response.data : task
      );
      setTasks(newTasks);
      applyFilter(newTasks, filter);
      setEditingTask(null);
      return true;
    } catch (err) {
      setError('Không thể cập nhật task.');
      console.error('Error updating task:', err);
      return false;
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa task này?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/Tasks/${id}`);
      const newTasks = tasks.filter(task => task.id !== id);
      setTasks(newTasks);
      applyFilter(newTasks, filter);
    } catch (err) {
      setError('Không thể xóa task.');
      console.error('Error deleting task:', err);
    }
  };

  // Toggle task status
  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'Đang làm' ? 'Hoàn thành' : 'Đang làm';
    await handleUpdateTask(task.id, {
      title: task.title,
      dueDate: task.dueDate,
      status: newStatus
    });
  };

  // Initial load
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📋 Task Manager</h1>
          <p>Quản lý công việc cá nhân hiệu quả</p>
        </header>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        <TaskForm
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          editingTask={editingTask}
          onCancel={() => setEditingTask(null)}
        />

        <div className="tasks-section">
          <div className="tasks-header">
            <h2>Danh sách công việc</h2>
            <FilterButtons
              currentFilter={filter}
              onFilterChange={handleFilterChange}
              taskCounts={{
                all: tasks.length,
                'Đang làm': tasks.filter(t => t.status === 'Đang làm').length,
                'Hoàn thành': tasks.filter(t => t.status === 'Hoàn thành').length
              }}
            />
          </div>

          {loading ? (
            <div className="loading">Đang tải...</div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onDelete={handleDeleteTask}
              onEdit={setEditingTask}
              onToggleStatus={handleToggleStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;