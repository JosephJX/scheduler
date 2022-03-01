export function getAppointmentsForDay(state, day) {
  let filteredAppointmentsArray = [];
  let filteredAppointmentsID = [];
  let filteredAppointments = [];

  for (let i of state.days) {
    if (day === i.name) {
      filteredAppointmentsArray = i.appointments;
    }
  }

  for (let ID of filteredAppointmentsArray) {
    filteredAppointmentsID.push(ID);
  }

  // console.log(state.appointments)
  for (let appointment in state.appointments) {
    for (let ID of filteredAppointmentsID) {
      if (state.appointments[appointment].id === ID) {
        filteredAppointments.push(state.appointments[appointment]);
      }
    }
  }
  return filteredAppointments;
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let interviewObj = {}
  for (let interviewID in state.interviewers) {
    if (interview.interviewer.toString() === interviewID) {
      interviewObj.interviewer = state.interviewers[interviewID];
      interviewObj.student = interview.student;
    }
  }
  return interviewObj
}