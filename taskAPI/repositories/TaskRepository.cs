using Microsoft.EntityFrameworkCore;
using TaskAPI.Data;
using TaskAPI.Models;

namespace TaskAPI.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly ApplicationDbContext _context;

    public TaskRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TaskEntity>> GetAllAsync()
    {
        return await _context.Tasks
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    public async Task<TaskEntity?> GetByIdAsync(int id)
    {
        return await _context.Tasks.FindAsync(id);
    }

    public async Task<IEnumerable<TaskEntity>> GetByStatusAsync(string status)
    {
        return await _context.Tasks
            .Where(t => t.Status == status)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    public async Task<TaskEntity> CreateAsync(TaskEntity task)
    {
        task.CreatedAt = DateTime.UtcNow;
        task.UpdatedAt = DateTime.UtcNow;
        
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        
        return task;
    }

    public async Task<TaskEntity> UpdateAsync(TaskEntity task)
    {
        task.UpdatedAt = DateTime.UtcNow;
        
        _context.Entry(task).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        
        return task;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
        {
            return false;
        }

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        
        return true;
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Tasks.AnyAsync(t => t.Id == id);
    }
}