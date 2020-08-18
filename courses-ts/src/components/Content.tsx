import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  parts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.name} part={part} />)}
  </div>
)
export default Content;