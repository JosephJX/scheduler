import React from "react";
import "./styles.scss";

export default function Appointment(props) {
  const { time } = props;

  return (
    <article className="appointment">
      {time === undefined && <p>No Appointments</p>}
      {time && <p>Appointment at {time}</p>}
    </article>)
}; 