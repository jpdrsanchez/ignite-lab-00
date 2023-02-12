import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { EnrollmentService } from 'src/services/enrollment.service';
import { StudentService } from 'src/services/student.service';
import { Enrollment } from '../models/enrollment.model';
import { Student } from '../models/student.model';
import { CurrentUser, AuthUser } from 'src/http/auth/current-user';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private readonly studentService: StudentService,
    private readonly enrollmentService: EnrollmentService,
  ) {}

  @Query(() => Student)
  @UseGuards(AuthorizationGuard)
  async me(@CurrentUser() student: AuthUser) {
    return this.studentService.getByAuthUserId(student.sub);
  }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  async students() {
    return this.studentService.listAllStudents();
  }

  @ResolveField(() => [Enrollment])
  async enrollments(@Parent() student: Student) {
    return this.enrollmentService.listEnrollmentsByStudentId(student.id);
  }
}
