import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface GetByCourseAndStudentIdParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentService {
  constructor(private readonly prisma: PrismaService) {}

  async getByCourseAndStudentId(params: GetByCourseAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId: params.courseId,
        studentId: params.studentId,
        canceledAt: null,
      },
    });
  }

  async listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
    });
  }

  async listEnrollmentsByStudentId(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
