import React, { useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";

const PagoTarjeta = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = () => {
      console.log("MercadoPago SDK cargado"); // Verifica que el SDK se haya cargado
      if (window.MercadoPago) {
        const mp = new window.MercadoPago("TEST-8b8a8fca-c8bc-4e33-8ca2-fcf17f22b91d");

        const cardForm = mp.cardForm({
          amount: "100.5", // Monto de ejemplo (puedes modificarlo dinámicamente)
          iframe: true,
          form: {
            id: "form-checkout",
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
            issuer: {
              id: "form-checkout__issuer",
              placeholder: "Banco emisor",
            },
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
          },
          callbacks: {
            onFormMounted: (error) => {
              if (error) return console.warn("Error al montar el formulario:", error);
              console.log("Formulario montado correctamente");
            },
            onSubmit: (event) => {
              event.preventDefault();
              const {
                paymentMethodId: payment_method_id,
                issuerId: issuer_id,
                cardholderEmail: email,
                amount,
                token,
                identificationNumber,
                identificationType,
              } = cardForm.getCardFormData();

              fetch("/process_payment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  token,
                  issuer_id,
                  payment_method_id,
                  transaction_amount: Number(amount),
                  description: "Descripción del producto o servicio",
                  payer: {
                    email,
                    identification: {
                      type: identificationType,
                      number: identificationNumber,
                    },
                  },
                }),
              }).then((response) => {
                console.log("Respuesta del servidor:", response);
              });
            },
            onFetching: (resource) => {
              console.log("Fetching resource:", resource);

              // Animar barra de progreso
              const progressBar = document.querySelector(".progress-bar");
              progressBar.removeAttribute("value");

              return () => {
                progressBar.setAttribute("value", "0");
              };
            },
          },
        });
      } else {
        console.error("MercadoPago SDK no se cargó correctamente.");
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="pago-tarjeta-container">
      <form id="form-checkout">
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-right">
            Número de Tarjeta:
          </Form.Label>
          <Col sm={9}>
            <div id="form-checkout__cardNumber" className="form-control" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-right">
            Fecha de Vencimiento:
          </Form.Label>
          <Col sm={9}>
            <div id="form-checkout__expirationDate" className="form-control" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-right">
            CVV:
          </Form.Label>
          <Col sm={9}>
            <div id="form-checkout__securityCode" className="form-control" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-right">
            Nombre del Titular:
          </Form.Label>
          <Col sm={9}>
            <div id="form-checkout__cardholderName" className="form-control" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-right">
            Emisor:
          </Form.Label>
          <Col sm={9}>
            <div id="form-checkout__issuer" className="form-control" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-right">
            Tipo de Identificación:
          </Form.Label>
          <Col sm={9}>
            <div id="form-checkout__identificationType" className="form-control" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-right">
            Número de Identificación:
          </Form.Label>
          <Col sm={9}>
            <div id="form-checkout__identificationNumber" className="form-control" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-right">
            Correo Electrónico:
          </Form.Label>
          <Col sm={9}>
            <div id="form-checkout__cardholderEmail" className="form-control" />
          </Col>
        </Form.Group>

        <button type="submit" id="form-checkout__submit" className="btn btn-primary">
          Pagar
        </button>
        <progress value="0" className="progress-bar">
          Cargando...
        </progress>
      </form>
    </div>
  );
};

export default PagoTarjeta;
