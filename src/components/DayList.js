import React from "react";
import DayListItem from "./DayListItem"
export function DayList(props) {
  const mapDaysArray = props.days.map((day) => {
    return <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.onChange}
    />

  });
  return (
    <ul>
      {mapDaysArray}
    </ul>
  );

}