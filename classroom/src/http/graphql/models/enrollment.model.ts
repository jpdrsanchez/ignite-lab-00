import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Course } from './couse.model';
import { Student } from './student.model';

@ObjectType()
export class Enrollment {
  @Field(() => ID)
  id: string;

  @Field(() => Student)
  student: Student;
  studentId: string;

  @Field(() => Course)
  course: Course;
  courseId: string;

  @Field(() => Date, { nullable: true })
  canceledAt: Date;

  @Field(() => Date)
  createdAt: Date;
}
