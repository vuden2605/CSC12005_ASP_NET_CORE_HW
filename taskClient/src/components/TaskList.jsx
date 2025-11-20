// src/components/TaskList.jsx
import TaskItem from './TaskItem';
function TaskList({ tasks, onDelete, onEdit, onToggleStatus }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 Chưa có task nào</p>
        <p className="empty-subtitle">Hãy thêm task đầu tiên của bạn!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}

export default TaskList;