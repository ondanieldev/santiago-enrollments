import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import IconBar from '../../components/IconBar';
import {
  Container,
  CircleContainer,
  Circle,
  StudentListContainer,
  StudentList,
  InfoLabel,
} from './styles';
import Loading from '../../components/Loading';
import api from '../../services/api';

interface IStudent {
  student_name: string;
  grade_name: string;
  type: string;
  paid: boolean;
}

interface IGrade {
  grade_name: string;
  value: number;
}

interface IGetDashboardDataDTO {
  enrollment_students: IStudent[];
  reenrollment_students: IStudent[];
  students_per_grade: IGrade[];
}

const Dashboard: React.FC = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [enrollmentsStudents, setEnrollmentsStudents] = useState(
    [] as IStudent[],
  );
  const [
    enrollmentsStudentsPaidNumber,
    setEnrollmentsStudentsPaidNumber,
  ] = useState(0);
  const [reenrollmentsStudents, setReenrollmentsStudents] = useState(
    [] as IStudent[],
  );
  const [
    reenrollmentsStudentsPaidNumber,
    setReenrollmentsStudentsPaidNumber,
  ] = useState(0);
  const [studentsPerGrade, setStudentsPerGrade] = useState([] as IGrade[]);

  useEffect(() => {
    api
      .get('/reenrollments/dashboard')
      .then(response => {
        const {
          enrollment_students,
          reenrollment_students,
          students_per_grade,
        } = response.data as IGetDashboardDataDTO;

        const enrollmentStudentsPaid = enrollment_students.reduce(
          (sum, student) => {
            if (student.paid) {
              return sum + 1;
            }
            return sum;
          },
          0,
        );

        const reenrollmentStudentsPaid = reenrollment_students.reduce(
          (sum, student) => {
            if (student.paid) {
              return sum + 1;
            }
            return sum;
          },
          0,
        );

        setEnrollmentsStudents(enrollment_students);
        setReenrollmentsStudents(reenrollment_students);
        setStudentsPerGrade(students_per_grade);
        setEnrollmentsStudentsPaidNumber(enrollmentStudentsPaid);
        setReenrollmentsStudentsPaidNumber(reenrollmentStudentsPaid);
      })
      .finally(() => {
        setLoadingData(false);
      });
  }, []);

  return (
    <Container>
      <Loading show={loadingData} />

      <IconBar hideDashboard />
      <h1>Dashboard</h1>

      <CircleContainer>
        <Circle themeColor="#3f51b5">
          <h2>Matrículas pagas</h2>
          <div>
            {`${enrollmentsStudentsPaidNumber}/${enrollmentsStudents.length}`}
          </div>
        </Circle>

        <Circle themeColor="#013C64">
          <h2>Total</h2>
          <div>
            {`${
              enrollmentsStudentsPaidNumber + reenrollmentsStudentsPaidNumber
            }/${enrollmentsStudents.length + reenrollmentsStudents.length}`}
          </div>
        </Circle>

        <Circle themeColor="#009688">
          <h2>Rematrículas pagas</h2>
          <div>
            {`${reenrollmentsStudentsPaidNumber}/${reenrollmentsStudents.length}`}
          </div>
        </Circle>
      </CircleContainer>

      <StudentListContainer>
        <StudentList>
          <h2>Alunos matriculados (novos)</h2>

          {enrollmentsStudents.map(student => (
            <li>
              {student.student_name}
              {student.paid && (
                <InfoLabel backgroundColor="#4caf50">pago</InfoLabel>
              )}
            </li>
          ))}
          <StudentList />
        </StudentList>

        <StudentList>
          <h2>Alunos rematriculados (antigos)</h2>

          {reenrollmentsStudents.map(student => (
            <li>
              {student.student_name}
              {student.paid && (
                <InfoLabel backgroundColor="#4caf50">pago</InfoLabel>
              )}
            </li>
          ))}
        </StudentList>
      </StudentListContainer>

      <BarChart
        width={1200}
        height={500}
        data={studentsPerGrade}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="grade_name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" name="Número de alunos" fill="#013C64" />
      </BarChart>
    </Container>
  );
};

export default Dashboard;
