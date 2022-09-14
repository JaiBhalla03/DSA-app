import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react'
import './pages.css'



var procedure = "";


class Stack
    {
        constructor(capacity) {
            this.capacity = capacity;
            this.top = -1;
            this.array = new Array(capacity);
        }
    }
     
    // function to create a stack of given capacity.
    function createStack(capacity)
    {
        let stack = new Stack(capacity);
        return stack;
    }


function isFull(stack)
{
    return (stack.top == (stack.capacity - 1));
}
  
// Stack is empty when top is equal to -1
function isEmpty(stack)
{
    return (stack.top == -1);
}
  
// Function to add an item to stack.
// It increases top by 1
function push(stack, item)
{
    if(isFull(stack))
        return;
    stack.array[++stack.top] = item;
}
  
// Function to remove an item from stack.
// It decreases top by 1
function pop(stack)
{
    if(isEmpty(stack))
        return Number.MIN_VALUE;
    return stack.array[stack.top--];
}
  

function moveDisksBetweenTwoPoles(src, dest, s, d)
    {
        let pole1TopDisk = pop(src);
        let pole2TopDisk = pop(dest);
  
        // When pole 1 is empty
        if (pole1TopDisk == Number.MIN_VALUE)
        {
            push(src, pole2TopDisk);
            moveDisk(d, s, pole2TopDisk);
        }
          
        // When pole2 pole is empty
        else if (pole2TopDisk == Number.MIN_VALUE)
        {
            push(dest, pole1TopDisk);
            moveDisk(s, d, pole1TopDisk);
        }
          
        // When top disk of pole1 > top disk of pole2
        else if (pole1TopDisk > pole2TopDisk)
        {
            push(src, pole1TopDisk);
            push(src, pole2TopDisk);
            moveDisk(d, s, pole2TopDisk);
        }
          
        // When top disk of pole1 < top disk of pole2
        else
        {
            push(dest, pole2TopDisk);
            push(dest, pole1TopDisk);
            moveDisk(s, d, pole1TopDisk);
        }
}

var procedureNum = 1

function moveDisk(fromPeg, toPeg, disk)
    {
      procedure +=`${procedureNum}.) Move the disk ${disk} from rod ${fromPeg} to rod ${toPeg}.\n`;
      procedureNum ++;
    }

    function tohIterative(num_of_disks, src, aux, dest)
    {
        let i, total_num_of_moves;
        let s = 'S', d = 'D', a = 'A';
      
        // If number of disks is even, then interchange
        // destination pole and auxiliary pole
        if (num_of_disks % 2 == 0)
        {
            let temp = d;
            d = a;
            a = temp;
        }
        total_num_of_moves = parseInt(Math.pow(2, num_of_disks) - 1, 10);
      
        // Larger disks will be pushed first
        for (i = num_of_disks; i >= 1; i--)
            push(src, i);
      
        for (i = 1; i <= total_num_of_moves; i++)
        {
            if (i % 3 == 1)
                moveDisksBetweenTwoPoles(src, dest, s, d);
      
            else if (i % 3 == 2)
                moveDisksBetweenTwoPoles(src, aux, s, a);
      
            else if (i % 3 == 0)
                moveDisksBetweenTwoPoles(aux, dest, a, d);
        }
    }

const tellProcedure = (n) =>{
  let src, dest, aux;
  let num_of_disks = n;
  src = createStack(num_of_disks);
  dest = createStack(num_of_disks);
  aux = createStack(num_of_disks);
  
  tohIterative(num_of_disks, src, aux, dest);
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

const TowerOfHanoi = () => {
  const [isLoading, setLoading] = useState(false);
  const [procedure, setProcedure] = useState(<div style ={{padding: 20 , color: '#33b5e5', fontSize: 20}}>
  GET A STEP BY STEP PROCEDURE TO SOLVE THE TOWER OF HANOI ON THIS SCREEN!
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

  const check = () =>{
    const n = document.querySelector('.input').value;
    setProcedure(tellProcedure(n));
  }
  const handleClick = () =>{ 
    setLoading(true);
    check();
  }
  return (
    <div className="main">
      <div className="main1">
      <h1 className="text-info" style={{textAlign: 'center'}}>Tower Of Hanoi Solver</h1>
      <input type="text"
      value = {input}
      placeholder="Enter The Number Of Disks"
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
        {isLoading ? 'Loading…' : 'Solve'}
      </Button>
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

export default TowerOfHanoi