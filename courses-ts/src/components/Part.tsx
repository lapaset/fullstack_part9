import React from 'react';
import { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.name) {
    case "Fundamentals":
      return <p>{part.name}<br />
                exercises: {part.exerciseCount}<br/>
                description: {part.description}</p>
    case "Using props to pass data":
      return <p>{part.name}<br />
                exercises: {part.exerciseCount}<br />
                group projects: {part.groupProjectCount}</p>
    case "Deeper type usage":
      return <p>{part.name}<br />
                exercises: {part.exerciseCount}<br />
                exercise submission link: {part.exerciseSubmissionLink}<br />
                description: {part.description}</p>
    case "Hello testing":
      return <p>{part.name}<br />
                exercises: {part.exerciseCount}<br />
                level: {part.level}<br />
                description: {part.description}</p>
    default:
      return assertNever(part);
  }
}

export default Part;