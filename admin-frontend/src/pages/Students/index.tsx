import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiDollarSign, FiLoader, FiBook } from 'react-icons/fi';
import { toast } from 'react-toastify';

import {
  Container,
  StudentsList,
  Student,
  InfoLabelContainer,
  InfoLabel,
} from './styles';
import Loading from '../../components/Loading';
import IconBar from '../../components/IconBar';
import Button from '../../components/Button';
import api from '../../services/api';

import 'react-toastify/dist/ReactToastify.css';

toast.configure();

interface IParams {
  grade_name: string;
}

interface IStudent {
  _id: string;
  student_name: string;
  enrollment_number: number;
  paid: boolean;
  received_mail_with_documents: boolean;
  type: 'enrollment' | 'reenrollment';
  paid_materials: boolean;
}

const Students: React.FC = () => {
  const params = useParams() as IParams;

  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([] as IStudent[]);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [loadingMaterials, setLoadingMaterials] = useState(false);

  useEffect(() => {
    const { grade_name } = params;

    api
      .get(`/reenrollments/grade/${grade_name}`)
      .then(response => {
        setStudents(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  const handleChangeStatus = useCallback(
    async (data: IStudent) => {
      try {
        setLoadingPayment(true);

        const student = data;

        await api.patch(`/reenrollments/payment/${student.enrollment_number}`, {
          status: !student.paid,
        });

        const studentsList = students;

        studentsList.forEach(s => {
          if (s._id === student._id) {
            s.paid = !student.paid;
          }
        });

        setStudents(studentsList);

        student.paid
          ? toast.success('Matrícula marcada como concluída!')
          : toast.success('Matrícula marcada como não concluída!');
      } catch {
        toast.error('Erro interno do servidor!');
      } finally {
        setLoadingPayment(false);
      }
    },
    [students],
  );

  const handleChangeMaterials = useCallback(
    async (data: IStudent) => {
      try {
        setLoadingMaterials(true);

        const student = data;

        await api.patch(
          `/reenrollments/materials/${student.enrollment_number}`,
          {
            status: !student.paid_materials,
          },
        );

        const studentsList = students;

        studentsList.forEach(s => {
          if (s._id === student._id) {
            s.paid_materials = !student.paid_materials;
          }
        });

        setStudents(studentsList);

        student.paid
          ? toast.success('Matrícula marcada como materiais pagos!')
          : toast.success('Matrícula marcada como materiais pendentes!');
      } catch {
        toast.error('Erro interno do servidor!');
      } finally {
        setLoadingMaterials(false);
      }
    },
    [students],
  );

  return (
    <Container>
      <Loading show={loading} />

      <IconBar />

      <h1>Alunos</h1>

      <strong>Selecione um aluno</strong>

      {students.length > 0 && (
        <StudentsList>
          {students.map(student => (
            <Student paid={student.paid} key={student._id}>
              <Link to={`/reenrollment/${student.enrollment_number}`}>
                <>
                  {student.student_name}
                  <InfoLabelContainer>
                    {student.paid && (
                      <InfoLabel backgroundColor="#4caf50">
                        matrícula paga
                      </InfoLabel>
                    )}
                    {student.paid_materials && (
                      <InfoLabel backgroundColor="#4caf50">
                        materiais pagos
                      </InfoLabel>
                    )}
                    {student.type === 'enrollment' && (
                      <InfoLabel backgroundColor="#013C64">matrícula</InfoLabel>
                    )}
                    {student.type === 'reenrollment' && (
                      <InfoLabel backgroundColor="#013C64">
                        rematrícula
                      </InfoLabel>
                    )}
                    {student.received_mail_with_documents && (
                      <InfoLabel backgroundColor="#212529">
                        e-mail enviado
                      </InfoLabel>
                    )}
                  </InfoLabelContainer>
                </>
              </Link>

              {student.paid && (
                <Button
                  type="button"
                  backgroundColor="#4caf50"
                  onClick={() => handleChangeStatus(student)}
                  disabled={loadingPayment}
                >
                  {loadingPayment && <FiLoader size={24} />}
                  {!loadingPayment && <FiDollarSign size={24} />}
                </Button>
              )}

              {!student.paid && (
                <Button
                  type="button"
                  backgroundColor="#f44336"
                  onClick={() => handleChangeStatus(student)}
                  disabled={loadingPayment}
                >
                  {loadingPayment && <FiLoader size={24} />}
                  {!loadingPayment && <FiDollarSign size={24} />}
                </Button>
              )}

              {student.paid_materials && (
                <Button
                  type="button"
                  backgroundColor="#4caf50"
                  onClick={() => handleChangeMaterials(student)}
                  disabled={loadingMaterials}
                >
                  {loadingMaterials && <FiLoader size={24} />}
                  {!loadingMaterials && <FiBook size={24} />}
                </Button>
              )}

              {!student.paid_materials && (
                <Button
                  type="button"
                  backgroundColor="#f44336"
                  onClick={() => handleChangeMaterials(student)}
                  disabled={loadingMaterials}
                >
                  {loadingMaterials && <FiLoader size={24} />}
                  {!loadingMaterials && <FiBook size={24} />}
                </Button>
              )}
            </Student>
          ))}
        </StudentsList>
      )}

      {students.length <= 0 && <span>Nenhum aluno encontrado!</span>}
    </Container>
  );
};

export default Students;
