import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Alert, AlertDescription } from './components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Circle, Move, ArrowUpCircle, RulerIcon } from 'lucide-react';

export default function App() {
  const [pitchData, setPitchData] = useState({
    velocity: 95,
    horizontalBreak: -6,
    verticalBreak: 8,
    releasePointHeight: 5.8,
  });
  
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setPitchData({
      ...pitchData,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const handlePredict = () => {
    setLoading(true);
    setError(null);
    
    try {
      const probability = 0.5 + 
        (pitchData.velocity - 90) * 0.01 + 
        Math.abs(pitchData.horizontalBreak) * 0.02 + 
        pitchData.verticalBreak * 0.015 + 
        (pitchData.releasePointHeight - 5.5) * 0.03;
      
      const newPrediction = {
        ...pitchData,
        probability: Math.min(Math.max(probability, 0), 1),
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setPredictions(prev => [...prev.slice(-9), newPrediction]);
    } catch (err) {
      setError('Error making prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mlb-cream p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="font-baseball text-4xl text-mlb-navy">YEEZY</h1>
          <p className="font-baseball text-mlb-red mt-2">Strike Zone Predictor</p>
        </div>

        <div className="mlb-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="stat-label flex items-center gap-2">
                <Circle size={16} className="text-mlb-red" />
                Velocity (mph)
              </label>
              <Input
                type="number"
                name="velocity"
                value={pitchData.velocity}
                onChange={handleInputChange}
                className="mlb-input"
              />
            </div>
            
            <div>
              <label className="stat-label flex items-center gap-2">
                <Move size={16} className="text-mlb-red" />
                Horizontal Break (in)
              </label>
              <Input
                type="number"
                name="horizontalBreak"
                value={pitchData.horizontalBreak}
                onChange={handleInputChange}
                className="mlb-input"
              />
            </div>
            
            <div>
              <label className="stat-label flex items-center gap-2">
                <ArrowUpCircle size={16} className="text-mlb-red" />
                Vertical Break (in)
              </label>
              <Input
                type="number"
                name="verticalBreak"
                value={pitchData.verticalBreak}
                onChange={handleInputChange}
                className="mlb-input"
              />
            </div>
            
            <div>
              <label className="stat-label flex items-center gap-2">
                <RulerIcon size={16} className="text-mlb-red" />
                Release Height (ft)
              </label>
              <Input
                type="number"
                name="releasePointHeight"
                value={pitchData.releasePointHeight}
                onChange={handleInputChange}
                className="mlb-input"
              />
            </div>
          </div>
          
          <Button 
            onClick={handlePredict} 
            className="mlb-button w-full mt-6"
            disabled={loading}
          >
            {loading ? 'Calculating...' : 'Predict Strike'}
          </Button>
          
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {predictions.length > 0 && (
          <div className="mlb-card p-6">
            <h2 className="font-baseball text-2xl text-mlb-navy mb-4">Prediction History</h2>
            
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={predictions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cccccc" />
                  <XAxis 
                    dataKey="timestamp"
                    tick={{ fill: '#002D72', fontFamily: 'Roboto Mono' }}
                  />
                  <YAxis 
                    domain={[0, 1]}
                    tick={{ fill: '#002D72', fontFamily: 'Roboto Mono' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#F4F1E9',
                      border: '2px solid #002D72',
                      fontFamily: 'Roboto Mono'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="probability"
                    stroke="#CC0000"
                    strokeWidth={2}
                    name="Strike Probability"
                    dot={{ fill: '#002D72' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3">
              {predictions.slice().reverse().map((pred, idx) => (
                <div 
                  key={idx} 
                  className="flex justify-between items-center p-3 bg-mlb-cream rounded-md border-2 border-mlb-navy"
                >
                  <span className="font-stats text-mlb-navy">{pred.timestamp}</span>
                  <span className="stat-value">
                    {(pred.probability * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
