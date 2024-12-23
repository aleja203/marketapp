import React, { useState, useEffect, useRef } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const calcularMontoTotal = (carrito) =>
  carrito
    .reduce(
      (acc, { precioVenta, cantidad }) =>
        acc + (precioVenta || 0) * (cantidad || 0),
      0
    )
    .toFixed(2);

const PagoTarjeta = ({ monto }) => {
  const formRef = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;

    script.onload = () => {
      console.log(
        "SDK de MercadoPago cargado correctamente:",
        !!window.MercadoPago
      );

      if (!window.MercadoPago) {
        console.error("MercadoPago SDK no se cargó correctamente.");
        return;
      }

      const mp = new window.MercadoPago(
        "TEST-8b8a8fca-c8bc-4e33-8ca2-fcf17f22b91d"
      );
      console.log("Objeto MercadoPago inicializado:", !!mp);

      console.log("Preparando para crear el formulario de tarjeta...");

      try {
        console.log("Intentando crear el formulario de tarjeta...");

        console.log("mp.cardForm:", mp.cardForm);
        const cardForm = mp.cardForm({
          amount: monto.toString(),
          form: {
            id: formRef.current.id,
            cardNumber: {
              id: "form-checkout__cardNumber",
              placeholder: "Número de tarjeta",
            },
            expirationDate: {
              id: "form-checkout__expirationDate",
              placeholder: "MM/YY",
            },
            securityCode: {
              id: "form-checkout__securityCode",
              placeholder: "Código de seguridad",
            },
            cardholderName: {
              id: "form-checkout__cardholderName",
              placeholder: "Titular de la tarjeta",
            },
            issuer: { id: "form-checkout__issuer" }, // Cambio de input a select
            identificationType: {
              id: "form-checkout__identificationType",
              placeholder: "Tipo de documento",
            },
            identificationNumber: {
              id: "form-checkout__identificationNumber",
              placeholder: "Número de documento",
            },
            cardholderEmail: {
              id: "form-checkout__cardholderEmail",
              placeholder: "Correo electrónico",
            },
            installments: { id: "form-checkout__installments" }, // Cambio de input a select
          },
          callbacks: {
            onFormMounted: (error) => {
              if (error) {
                console.warn("Error al montar el formulario:", error);
              } else {
                console.log("Formulario montado correctamente.");
              }
            },
            onSubmit: (event) => {
              event.preventDefault();
              console.log("Formulario enviado...");
            },
          },
        });

        console.log("cardForm inicializado:", cardForm);
        window.MercadoPago.cardForm = cardForm;
      } catch (error) {
        console.error("Error al crear el formulario de tarjeta:", error);
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [monto]);

  return (
    <div id="form-checkout" ref={formRef}>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Número de Tarjeta:
        </Form.Label>
        <Col sm={9}>
          <input
            id="form-checkout__cardNumber"
            className="form-control custom-input-height"
            placeholder="Número de tarjeta"
            type="text"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Vencimiento:
        </Form.Label>
        <Col sm={9}>
          <input
            id="form-checkout__expirationDate"
            className="form-control custom-input-height"
            placeholder="MM/YY"
            type="text"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Código de Seguridad:
        </Form.Label>
        <Col sm={9}>
          <input
            id="form-checkout__securityCode"
            className="form-control custom-input-height"
            placeholder="Código de seguridad"
            type="text"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Titular de la Tarjeta:
        </Form.Label>
        <Col sm={9}>
          <input
            id="form-checkout__cardholderName"
            className="form-control custom-input-height"
            placeholder="Titular de la tarjeta"
            type="text"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Tipo de Documento:
        </Form.Label>
        <Col sm={9}>
          <input
            id="form-checkout__identificationType"
            className="form-control custom-input-height"
            placeholder="Tipo de documento"
            type="text"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Número de Documento:
        </Form.Label>
        <Col sm={9}>
          <input
            id="form-checkout__identificationNumber"
            className="form-control custom-input-height"
            placeholder="Número de documento"
            type="text"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Correo Electrónico:
        </Form.Label>
        <Col sm={9}>
          <input
            id="form-checkout__cardholderEmail"
            className="form-control custom-input-height"
            placeholder="Correo electrónico"
            type="email"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Banco Emisor:
        </Form.Label>
        <Col sm={9}>
          <select
            id="form-checkout__issuer"
            className="form-control custom-input-height"
          >
            <option value="">Selecciona tu banco</option>
            {/* Aquí puedes agregar los bancos emisores */}
          </select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Cuotas:
        </Form.Label>
        <Col sm={9}>
          <select
            id="form-checkout__installments"
            className="form-control custom-input-height"
          >
            <option value="1">1 cuota</option>
            <option value="3">3 cuotas</option>
            <option value="6">6 cuotas</option>
            <option value="12">12 cuotas</option>
          </select>
        </Col>
      </Form.Group>
    </div>
  );
};

const Pago = () => {
  const location = useLocation();
  const { carrito } = location.state || { carrito: [] };
  const [formaDePago, setFormaDePago] = useState("");
  const [saldoBilletera, setSaldoBilletera] = useState("");
  const total = calcularMontoTotal(carrito);

  const handleFormaDePagoChange = (e) => setFormaDePago(e.target.value);

  const manejarPago = async (event) => {
    event.preventDefault();

    if (!formaDePago) {
      alert("Por favor seleccione una forma de pago");
      return;
    }

    try {
      if (formaDePago === "debito") {
        if (!window.MercadoPago?.cardForm) {
          console.log("Error: cardForm no está inicializado.");
          return;
        }
        const cardFormData = window.MercadoPago.cardForm.getCardFormData();

        const tarjetaDatos = {
          token: cardFormData.token,
          payment_method_id: cardFormData.paymentMethodId,
          transaction_amount: parseFloat(cardFormData.amount),
          description: "Pago con tarjeta",
          payer: {
            email: cardFormData.cardholderEmail,
            identification: {
              type: cardFormData.identificationType,
              number: cardFormData.identificationNumber,
            },
          },
        };

        const response = await axios.post("http://localhost:8080/market/pago", tarjetaDatos);
        alert(
          response.data.success
            ? "Pago realizado con éxito"
            : "Error en el pago"
        );
      } else if (formaDePago === "billetera") {
        const response = await axios.post("http://localhost:8080/market/pago", {
          formaDePago: "billetera",
          saldoBilletera,
          total,
        });
        alert(
          response.data.success
            ? "Pago realizado con éxito"
            : "Error en el pago"
        );
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    }
  };

  return (
    <Form onSubmit={manejarPago}>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Forma de Pago:
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            as="select"
            value={formaDePago}
            onChange={handleFormaDePagoChange}
          >
            <option value="">Seleccione</option>
            <option value="debito">Débito</option>
            <option value="billetera">Billetera MercadoPago</option>
          </Form.Control>
        </Col>
      </Form.Group>
      {formaDePago === "debito" && <PagoTarjeta monto={total} />}
      {formaDePago === "billetera" && (
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Saldo Billetera:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              value={saldoBilletera}
              onChange={(e) => setSaldoBilletera(e.target.value)}
            />
          </Col>
        </Form.Group>
      )}
      <Button type="submit" variant="primary">
        Procesar Pago
      </Button>
    </Form>
  );
};

export default Pago;
