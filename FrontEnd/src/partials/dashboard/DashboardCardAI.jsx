import React, { useState } from 'react';
import Tooltip from '../../components/Tooltip';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function DashboardCardAI() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    // Ensure input is provided
    if (!input) {
      setResponse('Please enter a description.');
      return;
    }

    setLoading(true);  // Start loading

    try {
      const res = await fetch('http://127.0.0.1:5000/script', {
        method: 'GET',  // POST request to the backend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: input }),  // Send input as JSON payload
      });

      if (!res.ok) {
        throw new Error('Failed to fetch from API');
      }

      const data = await res.json();
      setResponse(data.message || 'No response from API.');
    } catch (error) {
      setResponse('Error: ' + error.message);  // Handle error
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl p-5">
      <header className="pb-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Mini GPT</h2>
        <Tooltip className="ml-2">
          <div className="text-xs text-center whitespace-nowrap">Powered by AI</div>
        </Tooltip>
      </header>
      <Card className="mt-4">
        <CardContent className="p-4">
          <Input
            type="text"
            placeholder="Describe your play..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="mt-2 w-full"
            onClick={handleGenerate}
            disabled={loading}  // Disable the button while loading
          >
            {loading ? 'Generating...' : 'Generate'}
          </Button>
          {response && <p className="mt-4 text-gray-800 dark:text-gray-100">{response}</p>}
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardCardAI;