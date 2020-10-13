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
} from './styles';
import Loading from '../../components/Loading';
import api from '../../services/api';

interface IStudent {
  student_name: string;
  grade_name: string;
  type: string;
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
  const [reenrollmentsStudents, setReenrollmentsStudents] = useState(
    [] as IStudent[],
  );
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

        setEnrollmentsStudents(enrollment_students);
        setReenrollmentsStudents(reenrollment_students);
        setStudentsPerGrade(students_per_grade);
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
        <Circle>
          <h2>Matrículas</h2>
          <div>{enrollmentsStudents.length}</div>
        </Circle>

        <Circle>
          <h2>Rematrículas</h2>
          <div>{reenrollmentsStudents.length}</div>
        </Circle>
      </CircleContainer>

      <StudentListContainer>
        <StudentList>
          <h2>Alunos matriculados</h2>

          {enrollmentsStudents.map(student => (
            <li>{student.student_name}</li>
          ))}
          <StudentList />
        </StudentList>

        <StudentList>
          <h2>Alunos rematriculados</h2>

          {reenrollmentsStudents.map(student => (
            <li>{student.student_name}</li>
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
