import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const PagoBilletera = ({ saldoBilletera, setSaldoBilletera }) => {
  return (
    <div className="pago-billetera">
      {/* Campo para ingresar el saldo de la billetera virtual */}
      <Form.Group as={Row} className="mb-4">
        <Form.Label column sm={3} className="text-right">
          Saldo Billetera Virtual:
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            value={saldoBilletera}
            onChange={(e) => setSaldoBilletera(e.target.value)}
            placeholder="Ingrese el saldo disponible"
          />
        </Col>
      </Form.Group>
    </div>
  );
};

export default PagoBilletera;
