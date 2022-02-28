import React from "react";
import "styles/InterviewerList.scss";
import { InterviewerListItem } from "./InterviewerListItem";


export function InterviewerList(props) {
  const mapInterviewersArray = props.interviewers.map((interviewer) => {
    return <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={onchange(interviewer.id)}
    />
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {mapInterviewersArray}
      </ul>


    </section>
  );
};