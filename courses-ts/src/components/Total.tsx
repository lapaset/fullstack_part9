import React from 'react';
import { CoursePart } from '../types';

interface TotalProps {
  parts: Array<CoursePart>;
}

const Total: React.FC<TotalProps> = ({ parts }) => (
  <p>
    Number of exercises{" "}
    {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
)

export default Total;