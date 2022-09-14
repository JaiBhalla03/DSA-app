import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react'
import './pages.css'
import { PureComponent } from 'react';


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

const isDigit = (d) => {
    return d>='0' && d<='9';
}

const reverseStr = (exp) => {
  var expArray = exp.split('');
  var revarray = expArray.reverse();
  
  var finalstring = revarray.join('');
  return finalstring;
}

function prefixEvaluation(exp) {
  if(!exp){
    return "ENTER AN EXPRESSION!"
  }
  var reverseExp = reverseStr(exp);
  var stack = [];
  var postfixArray = reverseExp.split('');
  for( element of postfixArray){
      console.log("element: " + element);

      if(isNaN(element)){
          var x = stack.pop();
          var y = stack.pop();
          console.log("var x/y: " + x + " " + y + " element: " + element) ;
          if (element == "+"){
              var result = (x+y);
              console.log("Expected Result: " + result)
              stack.push(x + y);
          } else if (element == '-'){
              stack.push(x - y);
          } else if (element == '*'){
              stack.push(x * y);
          } else if (element == '/'){
              stack.push(x / y);
          }
          else if (element == '^'){
            stack.push(x ^ y);
        }
      } else {
          stack.push( parseFloat(element) );
      }
  }
  //final check for non numbers within the stack
  var returnValue = null;
  while( stack.length > 0 ){
      console.log( stack );
      var element = stack.pop();  
      if(isNaN(element)){
          continue;
      } else{
          returnValue = element;
      }
  }
  return returnValue;
}

const tellProcedure = (exp) =>{

  var procedure = "";
  procedure += `GIVEN PREFIX EXPRESSION: ${exp}\n`;
  exp = reverseStr(exp);
  var procedureNum = 1;
  procedure += `${procedureNum}.) Reverse the given expression so now the expression is '${exp}'.\n`;
  var stack  = [];
  procedureNum ++;
  var d1, d2;
  let el;
  for(el of exp){
    if(isDigit(el)){
      procedure += `${procedureNum}.) The given character '${el}' is a digit so push it into the stack.\n`;
      stack.push(el);
      procedure += `STACK: ${stack}\n`;
    }
    else{
      if(el == '+' || el == '-' || el == '*' || el == '/' || el == '^'){
        
        var d2 = stack[stack.length -1];
        var d1 = stack[stack.length -2];
        var ans;
        switch(el){
          case '+':
            ans = Number(d2) + Number(d1);
            break;
          case '-':
            ans = d2 - d1;
            break;
          case '*':
            ans = d2 * d1;
            break;
          case '/':
            ans = d2 / d1;
            break;
          case '^':
            ans = d2 ^ d1;
        }
        procedure += `${procedureNum}.) The given character '${el}' is an operator so pop the upper 2 elements from the stack.\n`
        procedureNum++;

        stack.splice(-2);
        procedure += `STACK: ${stack}\n`;
        procedure += ` ${procedureNum}.) Solve '${d2} ${el} ${d1}' and push it into the stack.\n`;
        
        stack.push(ans);
        procedure += `STACK: ${stack}\n`;
      }
    }
    procedureNum++;
  }
  procedure += `${procedureNum}.) Pop the remaining element from the stack which is '${stack}'.\n`
  const proc = procedure.split('\n');
  proc.splice(-1);
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

const simulateNetworkRequest = () => {
  return new Promise((resolve) => setTimeout(resolve, 200));
}

const PrefixEvaluation = () => {
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
    setAnswer(prefixEvaluation(exp));
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
      <h1 className="text-info" style={{textAlign: 'center'}}>Evaluate Prefix Expression</h1>
      <input type="text"
      value = {input}
      placeholder="Enter Your Prefix Expression"
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
      {isLoading ? 'Loading…' : 'Evaluate'}
    </Button>
      </div>
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

export default PrefixEvaluation