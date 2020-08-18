import React from 'react';

interface Part {
  name: string;
  exerciseCount: number;
}

interface TotalProps {
  parts: Array<Part>;
}

const Total: React.FC<TotalProps> = ({ parts }) => (
  <p>
    Number of exercises{" "}
    {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
)

export default Total;