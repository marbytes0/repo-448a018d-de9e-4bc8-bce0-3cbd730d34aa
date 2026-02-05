import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CalculatorProps {
  onCalculate: (calculation: string, result: string) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onCalculate }) => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [operator, setOperator] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState('');
  const [history, setHistory] = useState('');

  const handleNumberClick = (num: string) => {
    if (display === '0' || operator === null && prevValue !== '' && currentValue === '') {
      setDisplay(num);
      setCurrentValue(num);
    } else {
      setDisplay((prev) => prev + num);
      setCurrentValue((prev) => prev + num);
    }
  };

  const handleOperatorClick = (op: string) => {
    if (currentValue === '' && prevValue === '') return;

    if (prevValue !== '' && currentValue !== '' && operator !== null) {
      handleEqualsClick();
      setOperator(op);
      setHistory(`${display} ${op}`);
    } else if (currentValue !== '') {
      setPrevValue(currentValue);
      setOperator(op);
      setHistory(`${currentValue} ${op}`);
      setCurrentValue('');
      setDisplay((prev) => prev + ` ${op} `);
    } else if (prevValue !== '' && operator !== null) {
      // Allow changing operator if no new number has been entered
      setOperator(op);
      setHistory((prev) => `${prev.slice(0, prev.lastIndexOf(' ')) || ''} ${op}`);
      setDisplay((prev) => `${prev.slice(0, prev.lastIndexOf(' ')) || ''} ${op} `);
    }
  };

  const handleEqualsClick = () => {
    if (prevValue === '' || currentValue === '' || operator === null) return;

    const expression = `${prevValue} ${operator} ${currentValue}`;
    let result: number;
    try {
      // Using new Function() for basic arithmetic evaluation.
      // This is generally safe for simple calculator inputs, but be cautious with untrusted input.
      result = new Function('return ' + expression)();
      const finalResult = result.toString();
      onCalculate(expression, finalResult);
      setDisplay(finalResult);
      setPrevValue(finalResult);
      setCurrentValue('');
      setOperator(null);
      setHistory(expression + ' = ' + finalResult);
    } catch (e) {
      setDisplay('Error');
      setPrevValue('');
      setCurrentValue('');
      setOperator(null);
      setHistory('');
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setCurrentValue('');
    setOperator(null);
    setPrevValue('');
    setHistory('');
  };

  const handleDecimalClick = () => {
    if (currentValue.includes('.')) return;
    if (currentValue === '') {
      handleNumberClick('0.');
    } else {
      handleNumberClick('.');
    }
  };

  const handleBackspaceClick = () => {
    if (display === '0') return;
    if (currentValue.length > 0) {
      const newCurrent = currentValue.slice(0, -1);
      setCurrentValue(newCurrent);
      if (newCurrent === '') {
        if (operator !== null) {
          setDisplay(`${prevValue} ${operator} `);
        } else if (prevValue !== '') {
          setDisplay(prevValue);
        } else {
          setDisplay('0');
        }
      } else {
        setDisplay((prev) => prev.slice(0, -1));
      }
    } else if (operator !== null) {
      setOperator(null);
      setDisplay(prevValue);
      setCurrentValue(prevValue);
      setPrevValue('');
    } else if (prevValue.length > 0) {
      const newPrev = prevValue.slice(0, -1);
      setPrevValue(newPrev);
      setDisplay(newPrev === '' ? '0' : newPrev);
      setCurrentValue(newPrev);
    }
  };

  return (
    <div className='bg-green-600 rounded-lg flex flex-col w-full max-w-md shadow-xl p-4 space-y-4'>
      <div className="text-right text-calculator-foreground h-8 text-sm font-light truncate">
        {history}
      </div>
      <Input
        type="text"
        value={display}
        readOnly
        className="text-right text-calculator-display-foreground text-5xl font-bold bg-calculator-display-background border-none h-24 p-4 rounded-md focus-visible:ring-0" />

      <div className="grid grid-cols-4 gap-2">
        <Button onClick={handleClearClick} className="col-span-2 text-xl py-6 bg-calculator-button-accent text-calculator-button-accent-foreground hover:bg-calculator-button-accent/80">AC</Button>
        <Button onClick={handleBackspaceClick} className="text-xl py-6 bg-calculator-button-accent text-calculator-button-accent-foreground hover:bg-calculator-button-accent/80">DEL</Button>
        <Button onClick={() => handleOperatorClick('/')} className="text-xl py-6 bg-calculator-button-operator text-calculator-button-operator-foreground hover:bg-calculator-button-operator/80">/</Button>

        <Button onClick={() => handleNumberClick('7')} className="text-xl py-6 bg-calculator-button-red text-calculator-button-red-foreground hover:bg-calculator-button-red/80">7</Button>
        <Button onClick={() => handleNumberClick('8')} className="text-xl py-6 bg-calculator-button-red text-calculator-button-red-foreground hover:bg-calculator-button-red/80">8</Button>
        <Button onClick={() => handleNumberClick('9')} className="text-xl py-6 bg-calculator-button-red text-calculator-button-red-foreground hover:bg-calculator-button-red/80">9</Button>
        <Button onClick={() => handleOperatorClick('*')} className="text-xl py-6 bg-calculator-button-operator text-calculator-button-operator-foreground hover:bg-calculator-button-operator/80">*</Button>

        <Button onClick={() => handleNumberClick('4')} className="text-xl py-6 bg-calculator-button-red text-calculator-button-red-foreground hover:bg-calculator-button-red/80">4</Button>
        <Button onClick={() => handleNumberClick('5')} className="text-xl py-6 bg-calculator-button-red text-calculator-button-red-foreground hover:bg-calculator-button-red/80">5</Button>
        <Button onClick={() => handleNumberClick('6')} className="text-xl py-6 bg-calculator-button-red text-calculator-button-red-foreground hover:bg-calculator-button-red/80">6</Button>
        <Button onClick={() => handleOperatorClick('-')} className="text-xl py-6 bg-calculator-button-operator text-calculator-button-operator-foreground hover:bg-calculator-button-operator/80">-</Button>

        <Button onClick={() => handleNumberClick('1')} className="text-xl py-6 bg-calculator-button-red text-calculator-button-red-foreground hover:bg-calculator-button-red/80">1</Button>
        <Button onClick={() => handleNumberClick('2')} className="text-xl py-6 bg-calculator-button-red text-calculator-button-red-foreground hover:bg-calculator-button-red/80">2</Button>
        <Button onClick={() => handleNumberClick('3')} className="text-xl py-6 bg-calculator-button-red text-calculator-button-red-foreground hover:bg-calculator-button-red/80">3</Button>
        <Button onClick={() => handleOperatorClick('+')} className="text-xl py-6 bg-calculator-button-operator text-calculator-button-operator-foreground hover:bg-calculator-button-operator/80">+</Button>

        <Button onClick={() => handleNumberClick('0')} className="col-span-2 text-xl py-6 bg-calculator-button-red text-calculator-button-red-foreground hover:bg-calculator-button-red/80">0</Button>
        <Button onClick={handleDecimalClick} className="text-xl py-6 bg-calculator-button-red text-calculator-button-red-foreground hover:bg-calculator-button-red/80">.</Button>
        <Button onClick={handleEqualsClick} className="text-xl py-6 bg-calculator-button-operator text-calculator-button-operator-foreground hover:bg-calculator-button-operator/80">=</Button>
      </div>
    </div>);

};

export default Calculator;
