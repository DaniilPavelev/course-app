package edgo.course.service;

import edgo.course.dto.CourseDto;
import edgo.course.dto.HomeworkDto;
import edgo.course.dto.ParagraphDto;
import edgo.course.dto.PhotoDto;
import edgo.course.dto.TaskDto;
import edgo.course.entity.Course;
import edgo.course.entity.Homework;
import edgo.course.entity.Paragraph;
import edgo.course.entity.Photo;
import edgo.course.entity.Task;
import edgo.course.repository.PhotoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class Converter {

    private final PhotoRepository photoRepository;

    public Course convertToEntity(CourseDto dto) {
        return Course.builder()
                .name(dto.getName())
                .paragraphs(convertParagraphs(dto.getParagraphs()))
                .photo(convertPhotoToEntity(dto.getPhoto()))
                .build();
    }

    private Photo convertPhotoToEntity(PhotoDto dto) {
        if (dto == null) {
            return null;
        }
        Optional<Photo> photo = photoRepository.findById(dto.getId());
        return photo.orElseGet(() -> Photo.builder()
                .fileName(dto.getFileName())
                .contentType(dto.getContentType())
                .dataBlob(dto.getDataBlob())
                .uploadTime(LocalDateTime.now())
                .fileSize(dto.getFileSize())
                .build());
    }

    private PhotoDto convertPhotoToDto(Photo entity) {
        if (entity == null) {
            return null;
        }
        return PhotoDto.builder()
                .id(entity.getId())
                .fileName(entity.getFileName())
                .contentType(entity.getContentType())
                .fileSize(entity.getFileSize())
                .dataBlob(entity.getDataBlob())
                .build();
    }

    private List<Paragraph> convertParagraphs(List<ParagraphDto> paragraphs) {
        List<Paragraph> paragraphList = new ArrayList<>();
        paragraphs.forEach(paragraphDto -> {
            paragraphList.add(convertParagraph(paragraphDto));
        });
        return paragraphList;
    }

    private Paragraph convertParagraph(ParagraphDto paragraphDto) {
        return Paragraph.builder()
                .name(paragraphDto.getName())
                .homeworks(convertHomeworks(paragraphDto.getHomeworks()))
                .build();
    }

    private List<Homework> convertHomeworks(List<HomeworkDto> homeworks) {
        List<Homework> homeworkList = new ArrayList<>();
        homeworks.forEach(homeworkDto -> {
            homeworkList.add(convertHomework(homeworkDto));
        });
        return homeworkList;
    }

    private Homework convertHomework(HomeworkDto homeworkDto) {
        return Homework.builder()
                .name(homeworkDto.getName())
                .tasks(convertTasks(homeworkDto.getTasks()))
                .build();
    }

    private List<Task> convertTasks(List<TaskDto> tasks) {
        List<Task> taskList = new ArrayList<>();
        tasks.forEach(taskDto -> {
            taskList.add(convertTask(taskDto));
        });
        return taskList;
    }

    private Task convertTask(TaskDto taskDto) {
        return Task.builder()
                .name(taskDto.getName())
                .build();
    }

    public CourseDto convertToDto(Course entity) {
        return CourseDto.builder()
                .name(entity.getName())
                .paragraphs(convertParagraphsToDto(entity.getParagraphs()))
                .photo(convertPhotoToDto(entity.getPhoto()))
                .build();
    }

    private List<ParagraphDto> convertParagraphsToDto(List<Paragraph> paragraphs) {
        if (paragraphs == null) {
            return new ArrayList<>();
        }
        List<ParagraphDto> dtos = new ArrayList<>();
        paragraphs.forEach(paragraph -> dtos.add(convertParagraphToDto(paragraph)));
        return dtos;
    }

    private ParagraphDto convertParagraphToDto(Paragraph paragraph) {
        return ParagraphDto.builder()
                .name(paragraph.getName())
                .homeworks(convertHomeworksToDto(paragraph.getHomeworks()))
                .build();
    }

    private List<HomeworkDto> convertHomeworksToDto(List<Homework> homeworks) {
        if (homeworks == null) {
            return new ArrayList<>();
        }
        List<HomeworkDto> dtos = new ArrayList<>();
        homeworks.forEach(homework -> dtos.add(convertHomeworkToDto(homework)));
        return dtos;
    }

    private HomeworkDto convertHomeworkToDto(Homework homework) {
        return HomeworkDto.builder()
                .name(homework.getName())
                .tasks(convertTasksToDto(homework.getTasks()))
                .build();
    }

    private List<TaskDto> convertTasksToDto(List<Task> tasks) {
        if (tasks == null) {
            return new ArrayList<>();
        }
        List<TaskDto> dtos = new ArrayList<>();
        tasks.forEach(task -> dtos.add(convertTaskToDto(task)));
        return dtos;
    }

    private TaskDto convertTaskToDto(Task task) {
        return TaskDto.builder()
                .name(task.getName())
                .build();
    }
}
