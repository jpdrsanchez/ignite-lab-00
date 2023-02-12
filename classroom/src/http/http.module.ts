import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import { DatabaseModule } from 'src/database/database.module';
import { CourseService } from 'src/services/course.service';
import { EnrollmentService } from 'src/services/enrollment.service';
import { StudentService } from 'src/services/student.service';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { StudentsResolver } from './graphql/resolvers/students.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    StudentsResolver,
    CoursesResolver,
    EnrollmentsResolver,
    StudentService,
    CourseService,
    EnrollmentService,
  ],
})
export class HttpModule {}
