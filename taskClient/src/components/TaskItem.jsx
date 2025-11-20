// src/components/TaskItem.jsx
function TaskItem({ task, onDelete, onEdit, onToggleStatus }) {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    };
  
    const isOverdue = () => {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return dueDate < today && task.status === 'Đang làm';
    };
  
    const getStatusClass = () => {
      if (task.status === 'Hoàn thành') return 'completed';
      if (isOverdue()) return 'overdue';
      return 'in-progress';
    };
  
    return (
      <div className={`task-item ${getStatusClass()}`}>
        <div className="task-content">
          <div className="task-header">
            <h3 className={task.status === 'Hoàn thành' ? 'completed-text' : ''}>
              {task.title}
            </h3>
            <span className={`status-badge ${task.status === 'Hoàn thành' ? 'completed' : 'in-progress'}`}>
              {task.status === 'Hoàn thành' ? '✅' : '🔄'} {task.status}
            </span>
          </div>
          
          <div className="task-meta">
            <span className="due-date">
              📅 {formatDate(task.dueDate)}
              {isOverdue() && <span className="overdue-label"> (Quá hạn)</span>}
            </span>
          </div>
        </div>
  
        <div className="task-actions">
          <button
            className="btn-icon btn-toggle"
            onClick={() => onToggleStatus(task)}
            title={task.status === 'Đang làm' ? 'Đánh dấu hoàn thành' : 'Đánh dấu đang làm'}
          >
            {task.status === 'Đang làm' ? '✓' : '↺'}
          </button>
          <button
            className="btn-icon btn-edit"
            onClick={() => onEdit(task)}
            title="Sửa task"
          >
            ✏️
          </button>
          <button
            className="btn-icon btn-delete"
            onClick={() => onDelete(task.id)}
            title="Xóa task"
          >
            🗑️
          </button>
        </div>
      </div>
    );
  }
  
  export default TaskItem;