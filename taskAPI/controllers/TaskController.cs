using Microsoft.AspNetCore.Mvc;
using TaskAPI.Dtos;
using TaskAPI.Services;

namespace TaskAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;
    private readonly ILogger<TasksController> _logger;

    public TasksController(ITaskService taskService, ILogger<TasksController> logger)
    {
        _taskService = taskService;
        _logger = logger;
    }

    // GET: api/tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetAllTasks()
    {
        try
        {
            var tasks = await _taskService.GetAllTasksAsync();
            return Ok(tasks);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi khi lấy danh sách tasks");
            return StatusCode(500, "Đã xảy ra lỗi khi lấy danh sách tasks");
        }
    }

    // GET: api/tasks/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TaskDto>> GetTask(int id)
    {
        try
        {
            var task = await _taskService.GetTaskByIdAsync(id);
            
            if (task == null)
            {
                return NotFound($"Task với ID {id} không tồn tại");
            }

            return Ok(task);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi khi lấy task {TaskId}", id);
            return StatusCode(500, "Đã xảy ra lỗi khi lấy task");
        }
    }

    // GET: api/tasks/status/Đang làm
    [HttpGet("status/{status}")]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasksByStatus(string status)
    {
        try
        {
            var tasks = await _taskService.GetTasksByStatusAsync(status);
            return Ok(tasks);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi khi lọc tasks theo trạng thái {Status}", status);
            return StatusCode(500, "Đã xảy ra lỗi khi lọc tasks");
        }
    }

    // POST: api/tasks
    [HttpPost]
    public async Task<ActionResult<TaskDto>> CreateTask(CreateTaskDto createTaskDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var task = await _taskService.CreateTaskAsync(createTaskDto);
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi khi tạo task mới");
            return StatusCode(500, "Đã xảy ra lỗi khi tạo task");
        }
    }

    // PUT: api/tasks/5
    [HttpPut("{id}")]
    public async Task<ActionResult<TaskDto>> UpdateTask(int id, UpdateTaskDto updateTaskDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var task = await _taskService.UpdateTaskAsync(id, updateTaskDto);
            return Ok(task);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi khi cập nhật task {TaskId}", id);
            return StatusCode(500, "Đã xảy ra lỗi khi cập nhật task");
        }
    }

    // DELETE: api/tasks/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        try
        {
            var result = await _taskService.DeleteTaskAsync(id);
            
            if (!result)
            {
                return NotFound($"Task với ID {id} không tồn tại");
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi khi xóa task {TaskId}", id);
            return StatusCode(500, "Đã xảy ra lỗi khi xóa task");
        }
    }
}