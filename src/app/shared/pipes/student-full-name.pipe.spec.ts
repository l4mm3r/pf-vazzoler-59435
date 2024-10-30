import { StudentFullNamePipe } from './student-full-name.pipe';
import { Student } from '../../features/dashboard/students/models';

describe('StudentFullNamePipe', () => {
  let pipe: StudentFullNamePipe;

  const createMockStudent = (firstName: string, lastName: string): Student => ({
    id: '14124',
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
    token: 'asdkfj1234',
    createdAt: new Date(),
    role: 'student',
    password: '123456',
  });

  beforeEach(() => {
    pipe = new StudentFullNamePipe();
  });

  it('debe crear una instancia', () => {
    expect(pipe).toBeTruthy();
  });

  it('debe combinar el firstName y el lastName con un espacio', () => {
    const mockStudent = createMockStudent('test', 'test');
    const result = pipe.transform(mockStudent);
    expect(result).toBe('test test');
  });


});