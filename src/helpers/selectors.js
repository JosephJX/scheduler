export function getAppointmentsForDay(state, day) {

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
