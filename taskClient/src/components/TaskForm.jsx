// src/components/TaskForm.jsx
import { useState, useEffect } from 'react';

function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Đang làm');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDueDate(editingTask.dueDate.split('T')[0]);
      setStatus(editingTask.status);
    } else {
      resetForm();
    }
  }, [editingTask]);

  const resetForm = () => {
    setTitle('');
    setDueDate('');
    setStatus('Đang làm');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !dueDate) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const taskData = {
      title: title.trim(),
      dueDate: new Date(dueDate).toISOString(),
      status: status
    };

    const success = editingTask
      ? await onSubmit(editingTask.id, taskData)
      : await onSubmit(taskData);

    if (success) {
      resetForm();
    }
  };

  const handleCancel = () => {
    resetForm();
    if (onCancel) onCancel();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? '✏️ Sửa Task' : '➕ Thêm Task Mới'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Tên công việc *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập tên công việc..."
          maxLength={255}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dueDate">Ngày hết hạn *</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Trạng thái</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Đang làm">Đang làm</option>
            <option value="Hoàn thành">Hoàn thành</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingTask ? '💾 Cập nhật' : '➕ Thêm mới'}
        </button>
        {editingTask && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            ❌ Hủy
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;