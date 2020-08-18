import React from 'react';
import ReactDOM from 'react-dom';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
  name: "Hello testing";
  level: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

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

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => (
  <h1>{name}</h1>
)

interface ContentProps {
  parts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.name} part={part} />)}
  </div>
)

interface TotalProps {
  parts: Array<CoursePart>;
}

const Total: React.FC<TotalProps> = ({ parts }) => (
  <p>
    Number of exercises{" "}
    {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
)

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Hello testing",
      exerciseCount: 1,
      description: "New course part",
      level: "easy"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

