import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { time, interview, bookInterview, cancelInterview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  console.log(time, interview, mode);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    const result = bookInterview(props.id, interview);
    console.log(result);
    result.then(() => { transition(SHOW) });
    result.catch(error => { transition(ERROR_SAVE) })
  }

  function cancel() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
  };

  function errorClose() {
    back();
  }



  console.log(`anybody home?`)
  console.log(time, interview, mode)

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW && <Show
        interview={interview}
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />}
      {mode === EMPTY && <Empty
        onAdd={() => transition(CREATE)}
      />}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
      />}
      {mode === CONFIRM && <Confirm
        message={'Are you sure you want to delete this appointment?'}
        onCancel={() => back()}
        onConfirm={cancel}
      />}
      {mode === SAVING && <Status
        message='SAVING...'
      />}
      {mode === DELETING && <Status
        message='DELETING...'
      />}
      {mode === EDIT && <Form
        interviewer={props.interview.interviewer.id} //this line here
        student={props.interview.student}
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
      />}
      {mode === ERROR_SAVE && <Error
        onClose={() => transition(EMPTY)}
        message="Failed to book interview"
      />}
      {mode === ERROR_DELETE &&
        <Error
          message="The appointment was not able to be deleted, sorry!"
          onClose={errorClose}
        />}
    </article>
  )
}; 