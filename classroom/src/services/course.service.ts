import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateCourseParams {
  title: string;
}

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllCourses() {
    return this.prisma.course.findMany();
  }

  async getByCourseId(courseId: string) {
    return this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });
  }

  async createCourse(params: CreateCourseParams) {
    const slug = slugify(params.title, { lower: true });

    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (courseAlreadyExists) throw new Error('Course already exists');

    return this.prisma.course.create({
      data: {
        title: params.title,
        slug,
      },
    });
  }
}
