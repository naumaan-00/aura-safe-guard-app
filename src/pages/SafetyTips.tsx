
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const SafetyTips = () => {
  const navigate = useNavigate();
  
  const safetyCategories = [
    {
      id: '1',
      title: 'Public Transportation Safety',
      tips: [
        'Share your trip details with a trusted friend or family member',
        'Keep valuables out of sight and secure',
        'Trust your instincts if a situation feels unsafe',
        'Try to sit near the driver or in populated areas of the vehicle',
        'Keep your phone charged and easily accessible'
      ]
    },
    {
      id: '2',
      title: 'Walking Alone',
      tips: [
        'Stay in well-lit and populated areas',
        'Avoid using headphones or being distracted by your phone',
        'Walk confidently and be aware of your surroundings',
        'Consider carrying a safety alarm or whistle',
        'Change your route occasionally if you walk regularly'
      ]
    },
    {
      id: '3',
      title: 'Using the App Effectively',
      tips: [
        'Enable gesture controls for quick emergency access',
        'Set up reliable emergency contacts',
        'Test the SOS feature with a trusted contact',
        'Keep your location services turned on',
        'Make sure your emergency contacts know about this app'
      ]
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background p-4">
      <header className="flex items-center py-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold ml-2">Safety Tips</h1>
      </header>
      
      <main className="space-y-6">
        {safetyCategories.map(category => (
          <div key={category.id}>
            <h2 className="text-lg font-semibold mb-3">{category.title}</h2>
            <Card>
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {category.tips.map((tip, index) => (
                    <React.Fragment key={index}>
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-xs font-medium">{index + 1}</span>
                        </div>
                        <span className="text-sm">{tip}</span>
                      </li>
                      {index < category.tips.length - 1 && (
                        <Separator className="my-2" />
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ))}
        
        <div className="mt-6 bg-primary/10 rounded-lg p-4">
          <h3 className="text-sm font-medium">Remember</h3>
          <p className="text-sm mt-1">Your safety is paramount. This app is designed to assist you in emergencies, but always prioritize contacting official emergency services when in danger.</p>
        </div>
      </main>
    </div>
  );
};

export default SafetyTips;
