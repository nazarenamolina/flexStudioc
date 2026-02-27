import { Container, Card, Row, Col } from 'react-bootstrap';
import { useAuthStore } from '../../store/authStore';
import { ShieldCheck } from 'lucide-react';

function AdminDashboardPage() {
  const { usuario } = useAuthStore();

  return (
    <Container className="mt-5 pt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm border-0 mt-4">
            <Card.Body className="p-5 text-center">
              <ShieldCheck size={60} className="text-primary mb-3" />
              <h2 className="mb-4">Panel de Control Web</h2>
              <p className="text-muted">
                Bienvenido, <strong>{usuario?.nombre}</strong>. Has ingresado a una zona de pruebas restringida.
              </p>
              <hr />
              <p className="small text-muted">
                Tu rol actual en la base de datos es: <span className="badge bg-success">{usuario?.rol}</span>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboardPage;