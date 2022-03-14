import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  // state,
  // setDay,
  // bookInterview,
  // cancelInterview

  //LOGIC for State
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  const getDayID = (id) => {
    if (id >= 1 && id <= 5) {
      return 0;
    }
    if (id >= 6 && id <= 10) {
      return 1;
    }
    if (id >= 11 && id <= 15) {
      return 2;
    }
    if (id >= 16 && id <= 20) {
      return 3;
    }
    if (id >= 21 && id <= 25) {
      return 4;
    }
  }

  //LOGIC for setDay
  const setDay = day => setState({ ...state, day });

  //LOGIC for bookInterview
  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayID = getDayID(id);

    const days = [
      ...state.days,
    ];

    if (state.appointments[id].interview === null) { days[dayID].spots-- }


    console.log(Object.keys(state.days))

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments: appointments, days: days }) // remove 1 spot when saved
    });
  }

  //LOGIC for cancelInterview
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayID = getDayID(id);

    const days = [
      ...state.days,
    ];

    days[dayID].spots++

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments: appointments, days: days }); // add 1 spot when saved
    })

  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}
