import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface Calculation {
  id: string;
  expression: string;
  result: string;
  timestamp: string;
}

interface CalculationListProps {
  calculations: Calculation[];
}

const CalculationList: React.FC<CalculationListProps> = ({ calculations }) => {
  return (
    <Card className="w-full max-w-md h-[500px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-center">Calculation History</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full w-full p-4">
          {calculations.length === 0 ? (
            <p className="text-center text-muted-foreground">No calculations yet.</p>
          ) : (
            <div className="space-y-2">
              {calculations.map((calc, index) => (
                <div key={calc.id} className="p-2 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">{calc.expression}</p>
                  <p className="text-lg font-medium text-foreground">{calc.result}</p>
                  <p className="text-xs text-muted-foreground text-right">{new Date(calc.timestamp).toLocaleString()}</p>
                  {index < calculations.length - 1 && <Separator className="my-2 bg-border" />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CalculationList;
