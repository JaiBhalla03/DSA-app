import React from 'react';
import { Container } from 'react-bootstrap';

const Main = () => {
  return (
      <Container className="px-4 py-4 text-info">
        <h1 className="font-monospace">This is a DSA Application</h1>
        <p>
          Welcome to the DSA Application! This website aims to provide step-by-step procedures for various DSA (Data Structures and Algorithms) operations, helping you understand and visualize the algorithms in action.
        </p>
        <p>
          Whether you're a beginner learning DSA or an experienced developer refreshing your knowledge, this application has got you covered. You'll find detailed explanations and visual representations for the following operations:
        </p>
        <p>
          - Infix to Postfix: Convert an infix expression to postfix notation.
        </p>
        <p>
          - Infix to Prefix: Convert an infix expression to prefix notation.
        </p>
        <p>
          - Postfix Evaluation: Evaluate a postfix expression and get the result.
        </p>
        <p>
          - Prefix Evaluation: Evaluate a prefix expression and get the result.
        </p>
        <p>
          - Tower of Hanoi: Solve the classic Tower of Hanoi puzzle with step-by-step moves.
        </p>
        <p>
          Simply navigate to each route to dive into the detailed procedures. We hope this application provides you with a better understanding of these fundamental DSA concepts and enhances your problem-solving skills.
        </p>
      </Container>
  );
};

export default Main;
