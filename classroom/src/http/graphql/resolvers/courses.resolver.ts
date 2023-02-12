import {
  ForbiddenException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CourseService } from 'src/services/course.service';
import { EnrollmentService } from 'src/services/enrollment.service';
import { StudentService } from 'src/services/student.service';
import { CreateCourseInput } from '../inputs/create-course-input';
import { Course } from '../models/couse.model';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private readonly courseService: CourseService,
    private readonly studentService: StudentService,
    private readonly enrollmentService: EnrollmentService,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  async courses() {
    return this.courseService.listAllCourses();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentService.getByAuthUserId(user.sub);
    if (!student) throw new NotFoundException('student not found');

    const enrollment = await this.enrollmentService.getByCourseAndStudentId({
      courseId: id,
      studentId: student.id,
    });

    if (!enrollment)
      throw new ForbiddenException(
        'You do not have permission to access this course',
      );

    return this.courseService.getByCourseId(id);
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  async createCourse(@Args('data') data: CreateCourseInput) {
    return this.courseService.createCourse(data);
  }
}
