import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CourseService } from 'src/services/course.service';
import { EnrollmentService } from 'src/services/enrollment.service';
import { StudentService } from 'src/services/student.service';
import { Course } from '../models/couse.model';
import { Enrollment } from '../models/enrollment.model';
import { Student } from '../models/student.model';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private readonly enrollmentService: EnrollmentService,
    private readonly studentService: StudentService,
    private readonly courseService: CourseService,
  ) {}

  @Query(() => [Enrollment])
  async enrollments() {
    return this.enrollmentService.listAllEnrollments();
  }

  @ResolveField(() => Student)
  async student(@Parent() enrollment: Enrollment) {
    return this.studentService.getByStudentId(enrollment.studentId);
  }

  @ResolveField(() => Course)
  async course(@Parent() enrollment: Enrollment) {
    return this.courseService.getByCourseId(enrollment.courseId);
  }
}
