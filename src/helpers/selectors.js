export function getAppointmentsForDay(state, day) {
  // let filteredAppointmentsArray = [];
  // let filteredAppointmentsID = [];
  // let filteredAppointments = [];

  // for (let i of state.days) {
  //   if (day === i.name) {
  //     filteredAppointmentsArray = i.appointments;
  //   }
  // }

  // for (let ID of filteredAppointmentsArray) {
  //   filteredAppointmentsID.push(ID);
  // }

  // // console.log(state.appointments)
  // for (let appointment in state.appointments) {
  //   for (let ID of filteredAppointmentsID) {
  //     if (state.appointments[appointment].id === ID) {
  //       filteredAppointments.push(state.appointments[appointment]);
  //     }
  //   }
  // }
  // return filteredAppointments;
  const selectedDay = state.days.find(d => d.name === day);

  if (selectedDay === undefined || state.days.length === 0) {
    return [];
  }
  // looking through appoints with map for appointments witht he correct ID from selectedDay
  let result = selectedDay.appointments.map(id => state.appointments[id]);

  return result;

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

export function getInterviewersForDay(state, day) {
  let filteredInterviewersArray = [];
  let filteredInterviewers = [];

  for (let stateDay of state.days) {
    if (day === stateDay.name) {
      filteredInterviewersArray = stateDay.interviewers;
    }
  }

  for (let ID of filteredInterviewersArray) {
    filteredInterviewers.push(state.interviewers[ID]);
  }
  return filteredInterviewers;
};
