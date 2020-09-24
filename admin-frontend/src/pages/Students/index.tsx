import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Container, StudentsList } from './styles';
import IconBar from '../../components/IconBar';
import api from '../../services/api';

interface IParams {
  grade_name: string;
}

interface IStudent {
  _id: string;
  student_name: string;
}

const Students: React.FC = () => {
  const params = useParams() as IParams;

  const [students, setStudents] = useState([] as IStudent[]);

  useEffect(() => {
    const { grade_name } = params;

    api.get(`/reenrollments`, { params: { grade_name } }).then(response => {
      setStudents(response.data);
    });
  }, [params]);

  return (
    <Container>
      <IconBar />

      <h1>Alunos</h1>

      <strong>Selecione um aluno</strong>

      {students.length > 0 && (
        <StudentsList>
          {students.map(student => (
            <Link
              key={student._id}
              to={`/reenrollment/${student.student_name}`}
            >
              {student.student_name}
            </Link>
          ))}
        </StudentsList>
      )}
    </Container>
  );
};

export default Students;
