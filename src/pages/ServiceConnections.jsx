import React from "react";
import "../App.css";
import cmlogo from "../assets/cm-logo.png"
import ccblogo from "../assets/ccb-logo.jpg"
import bflogo from "../assets/bf-logo.png"

const services = [
  {
    id: 1,
    name: "Church Metrics Loog",
    logo: cmlogo,
    credentials: "api-key-xxxxxxxx",
    status: "connected",
  },
  {
    id: 2,
    name: "CCB Online",
    logo: ccblogo,
    credentials: "bot-token-xxxx",
    status: "connected",
  },
  {
    id: 3,
    name: "Brushfire",
    logo: bflogo,
    credentials: "",
    status: "disconnected",
  },
];

const ServiceConnections = () => {
  const renderStatusIcon = (status) => {
    const color = status === "connected" ? "connected" : "disconnected";
    return (
      <span
        className={'service-status '+color}
      />
    );
  };

  return (
    <div style={{ width: "100%", margin: "0 auto", padding: "0 1rem" }}>
      <h2>Service Connection Status</h2>
      <table style={{ width: "1024px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid #ccc" }}>
            <th style={{ padding: "0.5rem" }}>&nbsp;</th>
            <th style={{ padding: "0.5rem" }}>Service</th>
            <th style={{ padding: "0.5rem" }}>Credentials</th>
            <th style={{ padding: "0.5rem", textAlign:"center" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "0.5rem", alignItems: "center", gap: "0.5rem" }}>
                <img src={service.logo} alt={service.name} style={{ width: "24px", height: "24px" }} />
              </td>
              <td style={{ padding: "0.5rem", alignItems: "center", textAlign: "left", gap: "0.5rem" }}>
                {service.name}
              </td>
              <td style={{ padding: "0.5rem", color: "#CCC", fontStyle: "italic", textAlign: "left" }}>
                {(service.credentials == "") ? "pending" : service.credentials.replace(/./g, "•")}
                {service.credentials.replace(/./g, "•")}
              </td>
              <td style={{ padding: "0.5rem" }}>{renderStatusIcon(service.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceConnections;
