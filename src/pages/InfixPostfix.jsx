import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react'
import './pages.css'



var stackarr = [];
var topp = -1;

const push = (e) =>{
    topp++;
    stackarr[topp] = e;
}

const pop=() => {
    if (topp == -1)
        return 0;
    else {
        var popped_ele = stackarr[topp];
        topp--;
        return popped_ele;
    }
}

const operator = (op) => {
    if (op == '+' || op == '-' ||
        op == '^' || op == '*' ||
        op == '/' || op == '(' ||
        op == ')') {
        return true;
    }
    else
        return false;
}

const precedency = (pre) => {
    if (pre == '@' || pre == '(' || pre == ')') {
        return 1;
    }
    else if (pre == '+' || pre == '-') {
        return 2;
    }
    else if (pre == '/' || pre == '*') {
        return 3;
    }
    else if (pre == '^') {
        return 4;
    }
    else
        return 0;
}

const infixToPostfix = (exp) => {
  if(!exp){
    return "ENTER AN EXPRESSION!"
  }
    var postfix = [];
    var temp = 0;
    push('@');
    var infixval = exp;

    for (var i = 0; i < infixval.length; i++) {
        var el = infixval[i];

        if (operator(el)) {
            if (el == ')') {
                while (stackarr[topp] != "(") {
                    postfix[temp++] = pop();
                }
                pop();
            }

            else if (el == '(') {
                push(el);
            }

            else if (precedency(el) > precedency(stackarr[topp])) {
                push(el);
            }
            else {
                while (precedency(el) <=
                    precedency(stackarr[topp]) && topp > -1) {
                    postfix[temp++] = pop();
                }
                push(el);
            }
        }
        else {
            postfix[temp++] = el;
        }
    }
    
    while (stackarr[topp] != '@') {
        postfix[temp++] = pop();
    }
    var st = "";
    for (var i = 0; i < postfix.length; i++)
        st += postfix[i];

    return st;
}

const simulateNetworkRequest = () => {
  return new Promise((resolve) => setTimeout(resolve, 200));
}

const tellProcedure = (exp) => {
  var output = "";
  var stack = "";
  var topOperator;
  var procedure = "";
  var procedureNum = 1;
  procedure += `GIVEN EXPRESSION: ${exp}\n`
  for(let el of exp){
    if(el == '('){
      procedure +=`${procedureNum}.) Push '(' to the stack.\n`;
      stack += '(';
      procedure += `STACK: ${stack}  OUTPUT: ${output}\n`;
    }
    else if(/^[a-zA-Z]+$/.test(el)){
      procedure += `${procedureNum}.) Write the operand '${el}' directly to the output expression. \n`
      output += el;
      procedure += `STACK: ${stack}       OUTPUT: ${output}\n`;
    }
    else if(el == ')'){
      let j = stack.length-1;
      var x = 1;
      var stackInner1 = "";
      while(stack[j] != '('){
        if(stack[j] != '(' && stack[j] != ')'){
          stackInner1 += stack[j];
        }
        j--;
      }
      procedure+= `${procedureNum}.) As ')' has been encounter pop all the elements inside the parenthesis that are '${stackInner1}' into the output expression. \n`;
      stack+=el;
      let i = stack.length-1;
      var x = 1;
      var stackInner = "";
      while(stack[i] != '('){
        if(stack[i] != '(' && stack[i] != ')'){
          stackInner += stack[i];
          console.log(stack[i]);
        }
        x++;
        i--;
      }
      
      procedure += `STACK: ${stack}       OUTPUT: ${output}\n`;
      stack = stack.substring(0, stack.length-x);
      output += stackInner;
      procedure += `STACK: ${stack}       OUTPUT: ${output}\n`;
    }
    else{
      topOperator = stack[stack.length - 1];
      if(el == '^'){
        if(topOperator == '(' || topOperator == null){
          stack+=el;
          procedure+= `${procedureNum}.) Operator '${el}' has been encountered push it into the stack.\n`;
          procedure += `STACK: ${stack}       OUTPUT: ${output}\n`;
        }
        else if(topOperator == '+' || topOperator == '-' || topOperator == '*' || topOperator == '/'){
          stack+=el;
          procedure+= `${procedureNum}.) Operator '${el}' has been encountered push it into the stack. Precedence of '${el}' is higher than '${topOperator}' so no operator is popped.\n`;
          procedure += `STACK: ${stack}       OUTPUT: ${output}\n`;
        }
        else{
          procedure+= `${procedureNum}.) Operator '${el}' has been encountered push it into the stack. Precedence of '${el}' is equal to '${topOperator}' so top operator is popped.\n`;
          stack = stack.substring(0,stack.length-1);
          output+=topOperator;
          procedure += `STACK: ${stack}       OUTPUT: ${output}\n`;
          stack += el;
          procedure += `STACK: ${stack}       OUTPUT: ${output}\n`;
        }
      }
      else if(el == '*' || el == '/'){
        if(topOperator == '(' || topOperator == null){
          stack+=el;
          procedure+= `${procedureNum}.) Operator '${el}' has been encountered push it into the stack.\n`;
          procedure += `STACK: ${stack}       OUTPUT: ${output}\n`;
        }
        else if(topOperator == '+' || topOperator == '-'){
          stack+=el;
          procedure+= `${procedureNum}.) Operator '${el}' has been encountered push it into the stack. Precedence of '${el}' is higher than '${topOperator}' so no operator is popped.\n`;
          procedure += `STACK: ${stack}       OUTPUT: ${output}\n`;
        }
        else if(topOperator == '^'){
          procedure+= `${procedureNum}.) Operator '${el}' has been encountered push it into the stack. Precedence of '${el}' is lower than '${topOperator}' so top operator is popped.\n`;
          stack = stack.substring(0,stack.length-1);
          output+=topOperator;
          procedure += `STACK: ${stack}       OUTPUT: ${output}\n`;
          stack += el;
          procedure += `STACK: ${stack}       OUTPUT: ${output}\n`;
        }
        else{
          procedure+= `${procedureNum}.) Operator '${el}' has been encountered push it into the stack. Precedence of '${el}' is equal to '${topOperator}' so top operator is popped.\n`;
          stack = stack.substring(0,stack.length-1);
          output+=topOperator;
          procedure += `STACK: ${stack}       OUTPUT: ${output}\n`;
          stack += el;
          procedure += `STACK: ${stack}       OUTPUT: ${output}\n`;
        }
      }
      else if(el == '+' || el == '-'){
        if(topOperator == '(' || topOperator == null){
          stack+=el;
          procedure+= `${procedureNum}.) Operator '${el}' has been encountered push it into the stack.\n`;
          procedure += `STACK: ${stack}       OUTPUT: ${output}\n`;
        }
        else if(topOperator == '*' || topOperator == '/' || topOperator == '^'){
          procedure+= `${procedureNum}.) Operator '${el}' has been encountered push it into the stack. Precedence of '${el}' is lower than '${topOperator}' so top operator is popped.\n`;
          stack = stack.substring(0,stack.length-1);
          output+=topOperator;
          procedure += `STACK: ${stack}       OUTPUT: ${output}\n`;
          stack += el;
          procedure += `STACK: ${stack}       OUTPUT: ${output}\n`;
        }
        else{
          procedure+= `${procedureNum}.) Operator '${el}' has been encountered push it into the stack. Precedence of '${el}' is equal to '${topOperator}' so top operator is popped.\n`;
          stack = stack.substring(0,stack.length-1);
          output+=topOperator;
          procedure += `STACK: ${stack}     OUTPUT: ${output}\n`;
          stack += el;
          procedure += `STACK: ${stack}      OUTPUT: ${output}\n`;
        }
      }
      
    }
    procedureNum++;
    console.log(topOperator);
    console.log(el);
  }
  procedure += `${procedureNum}.)Pop the remaining stack elements that are '${stack}' into the output expression.\n`;
  output +=stack;
  stack = "";
  procedure += `STACK: ${stack}     OUTPUT: ${output}\n`;
  const proc = procedure.split('\n');
  console.log(proc);
  console.log(procedure);
  proc.splice(-1);
  console.log(proc);
  const list = proc.map((pro) =><li>{pro}</li>);
  return (
    <>
    <div class="procedurecontainer">
      <ul className="procedure">
        {list}
      </ul>
    </div>
    </>
  );
}

const InfixPostfix = () => {
  const [isLoading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('ANSWER');
  const [procedure, setProcedure] = useState(<div style ={{padding: 20 , color: '#33b5e5', fontSize: 20}}>
    GET A STEP BY STEP PROCEDURE TO SOLVE YOUR EXPRESSION ON THIS SCREEN!
  </div>);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const [input, setInput] = useState('');
  const handleChange = (event) =>{
    setInput(event.target.value);
    console.log(event.target.value);
  }
  const check = () => {
    const exp = document.querySelector('.input').value;
    setAnswer(infixToPostfix(exp));
    setProcedure(tellProcedure(exp));
    console.log(exp);
  }
  const handleClick = () =>{ 
    setLoading(true);
    check();
  }
  return (
    <div className="main">
    <div className="main1">
      <h1 className="text-info" style={{textAlign: 'center'}}>Infix To Postfix Converter</h1>
      <input type="text"
      value = {input}
      placeholder="Enter Your Infix Expression"
      onChange={handleChange}
      className="input"
      />
      <div className="button">
        <Button
        
      variant="info"
      className="text-light"
      style={{width: '25%', fontSize: '16px'}}
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
      
    >
      {isLoading ? 'Loading…' : 'Convert'}
    </Button>
      </div>
      <h3 className="answerHead">Postfix Expression</h3>
      <div className="answer">
        {answer}
      </div>
    </div>
    <div className="main2">
      <h2 className="text-info">
        Procedure
      </h2>
      <div className="procedurecontainer1">
        {procedure}
      </div>
    </div>
    </div>
  )
}

export default InfixPostfix