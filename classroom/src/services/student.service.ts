import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllStudents() {
    return this.prisma.student.findMany();
  }

  async getByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  async getByStudentId(studentId: string) {
    return this.prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });
  }
}
