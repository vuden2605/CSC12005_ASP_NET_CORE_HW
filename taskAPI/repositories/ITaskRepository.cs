using TaskAPI.Models;

namespace TaskAPI.Repositories;

public interface ITaskRepository
{
    Task<IEnumerable<TaskEntity>> GetAllAsync();
    Task<TaskEntity?> GetByIdAsync(int id);
    Task<IEnumerable<TaskEntity>> GetByStatusAsync(string status);
    Task<TaskEntity> CreateAsync(TaskEntity task);
    Task<TaskEntity> UpdateAsync(TaskEntity task);
    Task<bool> DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
}

