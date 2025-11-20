using AutoMapper;
using TaskAPI.Dtos;
using TaskAPI.Models;
using TaskAPI.Repositories;

namespace TaskAPI.Services;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _repository;
    private readonly IMapper _mapper;

    public TaskService(ITaskRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<TaskDto>> GetAllTasksAsync()
    {
        var tasks = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<TaskDto>>(tasks);
    }

    public async Task<TaskDto?> GetTaskByIdAsync(int id)
    {
        var task = await _repository.GetByIdAsync(id);
        return task == null ? null : _mapper.Map<TaskDto>(task);
    }

    public async Task<IEnumerable<TaskDto>> GetTasksByStatusAsync(string status)
    {
        var tasks = await _repository.GetByStatusAsync(status);
        return _mapper.Map<IEnumerable<TaskDto>>(tasks);
    }

    public async Task<TaskDto> CreateTaskAsync(CreateTaskDto createTaskDto)
    {
        var task = _mapper.Map<TaskEntity>(createTaskDto);
        var createdTask = await _repository.CreateAsync(task);
        return _mapper.Map<TaskDto>(createdTask);
    }

    public async Task<TaskDto> UpdateTaskAsync(int id, UpdateTaskDto updateTaskDto)
    {
        var existingTask = await _repository.GetByIdAsync(id);
        if (existingTask == null)
        {
            throw new KeyNotFoundException($"Task với ID {id} không tồn tại");
        }

        _mapper.Map(updateTaskDto, existingTask);
        var updatedTask = await _repository.UpdateAsync(existingTask);
        
        return _mapper.Map<TaskDto>(updatedTask);
    }

    public async Task<bool> DeleteTaskAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }
}