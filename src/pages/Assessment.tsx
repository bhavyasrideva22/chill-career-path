import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'scenario';
  options: string[];
  category: 'psychometric' | 'technical' | 'wiscar';
  dimension?: 'will' | 'interest' | 'skill' | 'cognitive' | 'ability_to_learn' | 'real_world_alignment';
}

const assessmentQuestions: Question[] = [
  // Psychometric Section
  {
    id: 'p1',
    text: 'I enjoy monitoring and optimizing operational processes.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'psychometric',
    dimension: 'interest'
  },
  {
    id: 'p2',
    text: 'I prefer working in structured environments with clear guidelines.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'psychometric',
    dimension: 'real_world_alignment'
  },
  {
    id: 'p3',
    text: 'I stay calm and persistent when things don\'t go as planned.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'psychometric',
    dimension: 'will'
  },
  {
    id: 'p4',
    text: 'I am motivated by ensuring product safety and compliance.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'psychometric',
    dimension: 'interest'
  },
  {
    id: 'p5',
    text: 'I adapt quickly when learning new technologies or processes.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'psychometric',
    dimension: 'ability_to_learn'
  },

  // Technical Section
  {
    id: 't1',
    text: 'What is the acceptable temperature range for most pharmaceutical cold chain products?',
    type: 'multiple-choice',
    options: ['0°C to 10°C', '2°C to 8°C', '-10°C to 5°C', '5°C to 15°C'],
    category: 'technical'
  },
  {
    id: 't2',
    text: 'Which regulatory body sets guidelines for pharmaceutical cold chain in the US?',
    type: 'multiple-choice',
    options: ['WHO', 'FDA', 'CDC', 'USDA'],
    category: 'technical'
  },
  {
    id: 't3',
    text: 'A temperature sensor shows a deviation from 2-8°C to 12°C for 30 minutes. What should be your immediate action?',
    type: 'multiple-choice',
    options: [
      'Continue monitoring and document the deviation',
      'Immediately quarantine affected products and assess impact',
      'Adjust the temperature and continue operations',
      'Wait for the temperature to normalize'
    ],
    category: 'technical'
  },
  {
    id: 't4',
    text: 'Calculate: If a cold storage facility maintains 95% temperature compliance over 30 days, how many hours of deviation occurred?',
    type: 'multiple-choice',
    options: ['12 hours', '24 hours', '36 hours', '48 hours'],
    category: 'technical'
  },

  // WISCAR Framework
  {
    id: 'w1',
    text: 'How often do you follow through on long-term goals despite setbacks?',
    type: 'likert',
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
    category: 'wiscar',
    dimension: 'will'
  },
  {
    id: 'w2',
    text: 'Rate your current knowledge of supply chain management principles.',
    type: 'likert',
    options: ['No knowledge', 'Basic awareness', 'Some knowledge', 'Good knowledge', 'Expert level'],
    category: 'wiscar',
    dimension: 'skill'
  },
  {
    id: 'w3',
    text: 'How quickly do you typically learn new technical systems?',
    type: 'likert',
    options: ['Very slowly', 'Slowly', 'Average pace', 'Quickly', 'Very quickly'],
    category: 'wiscar',
    dimension: 'ability_to_learn'
  },
  {
    id: 'w4',
    text: 'How well can you analyze data to identify patterns and problems?',
    type: 'likert',
    options: ['Poor', 'Below average', 'Average', 'Good', 'Excellent'],
    category: 'wiscar',
    dimension: 'cognitive'
  },
  {
    id: 'w5',
    text: 'How important is work-life balance in a role that may require monitoring systems 24/7?',
    type: 'likert',
    options: ['Not important', 'Slightly important', 'Moderately important', 'Very important', 'Extremely important'],
    category: 'wiscar',
    dimension: 'real_world_alignment'
  }
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
  const currentQ = assessmentQuestions[currentQuestion];

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsCompleted(true);
      // Calculate scores and navigate to results
      const scores = calculateScores();
      navigate('/results', { state: { scores, answers } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScores = () => {
    const wiscarScores = {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability_to_learn: 0,
      real_world_alignment: 0
    };

    let technicalScore = 0;
    let psychometricScore = 0;

    // Calculate WISCAR scores
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = assessmentQuestions.find(q => q.id === questionId);
      if (question?.dimension) {
        const score = question.options.indexOf(answer) + 1;
        wiscarScores[question.dimension] += score * 20; // Scale to 100
      }
      
      if (question?.category === 'technical') {
        // Correct answers for technical questions
        const correctAnswers: Record<string, string> = {
          't1': '2°C to 8°C',
          't2': 'FDA',
          't3': 'Immediately quarantine affected products and assess impact',
          't4': '36 hours'
        };
        if (answer === correctAnswers[questionId]) {
          technicalScore += 25;
        }
      }
      
      if (question?.category === 'psychometric') {
        const score = question.options.indexOf(answer) + 1;
        psychometricScore += score * 5;
      }
    });

    const overallConfidence = Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6;

    return {
      wiscar: wiscarScores,
      technical: technicalScore,
      psychometric: psychometricScore,
      overall: overallConfidence
    };
  };

  const canProceed = answers[currentQ.id];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="bg-gradient-card rounded-xl p-6 shadow-soft">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Cold Chain Specialist Assessment
              </h1>
              <p className="text-muted-foreground mb-4">
                Question {currentQuestion + 1} of {assessmentQuestions.length}
              </p>
              <Progress value={progress} className="w-full" />
            </div>
          </div>

          {/* Question Card */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-lg">
                {currentQ.text}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQ.id] || ''}
                onValueChange={(value) => handleAnswer(currentQ.id, value)}
              >
                {currentQ.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              variant={currentQuestion === assessmentQuestions.length - 1 ? "success" : "default"}
              onClick={handleNext}
              disabled={!canProceed}
            >
              {currentQuestion === assessmentQuestions.length - 1 ? (
                <>
                  Complete Assessment
                  <CheckCircle className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;