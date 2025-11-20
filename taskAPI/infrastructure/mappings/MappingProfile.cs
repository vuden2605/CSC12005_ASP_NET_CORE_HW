using AutoMapper;
using TaskAPI.Dtos;
using TaskAPI.Models;

namespace TaskAPI.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Entity to DTO
        CreateMap<TaskEntity, TaskDto>();

        // CreateDTO to Entity
        CreateMap<CreateTaskDto, TaskEntity>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
            .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());

        // UpdateDTO to Entity
        CreateMap<UpdateTaskDto, TaskEntity>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
            .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());
    }
}