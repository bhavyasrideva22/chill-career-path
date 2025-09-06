import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Download, Share2, BookOpen, Target, TrendingUp } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface Scores {
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability_to_learn: number;
    real_world_alignment: number;
  };
  technical: number;
  psychometric: number;
  overall: number;
}

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scores = location.state?.scores as Scores;

  if (!scores) {
    navigate('/');
    return null;
  }

  const getRecommendation = (overallScore: number) => {
    if (overallScore >= 85) return 'yes';
    if (overallScore >= 65) return 'maybe';
    return 'no';
  };

  const recommendation = getRecommendation(scores.overall);

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'yes': return 'success';
      case 'maybe': return 'warning';
      default: return 'destructive';
    }
  };

  const getRecommendationText = (rec: string) => {
    switch (rec) {
      case 'yes':
        return {
          title: 'Strong Fit - Recommended',
          description: 'You have excellent potential for success as a Cold Chain Specialist. Your skills, motivation, and aptitude align well with the role requirements.',
          nextSteps: [
            'Enroll in cold chain management certification courses',
            'Gain hands-on experience through internships',
            'Study temperature monitoring technologies',
            'Learn regulatory compliance standards (FDA, WHO)'
          ]
        };
      case 'maybe':
        return {
          title: 'Potential Fit - Development Needed',
          description: 'You show promise for Cold Chain roles but would benefit from targeted skill development and experience in key areas.',
          nextSteps: [
            'Take foundational courses in supply chain management',
            'Develop technical skills in refrigeration and monitoring systems',
            'Gain experience in quality assurance or logistics',
            'Build knowledge of regulatory requirements'
          ]
        };
      default:
        return {
          title: 'Limited Fit - Consider Alternatives',
          description: 'Based on your responses, other career paths may be more suitable. Consider related roles that match your strengths better.',
          nextSteps: [
            'Explore general supply chain coordinator roles',
            'Consider warehouse operations positions',
            'Look into quality control assistant roles',
            'Evaluate logistics planning opportunities'
          ]
        };
    }
  };

  const recommendationData = getRecommendationText(recommendation);

  const wiscarData = [
    { dimension: 'Will', score: scores.wiscar.will },
    { dimension: 'Interest', score: scores.wiscar.interest },
    { dimension: 'Skill', score: scores.wiscar.skill },
    { dimension: 'Cognitive', score: scores.wiscar.cognitive },
    { dimension: 'Learning', score: scores.wiscar.ability_to_learn },
    { dimension: 'Alignment', score: scores.wiscar.real_world_alignment }
  ];

  const careerRoles = [
    {
      title: 'Cold Chain Manager',
      description: 'Oversee refrigerated supply chains ensuring compliance and efficiency',
      fit: scores.overall >= 80 ? 'High' : scores.overall >= 60 ? 'Medium' : 'Low'
    },
    {
      title: 'Pharmaceutical Cold Chain Technician',
      description: 'Handle temperature-sensitive drug storage & transport',
      fit: scores.technical >= 70 && scores.wiscar.cognitive >= 70 ? 'High' : 'Medium'
    },
    {
      title: 'Quality Assurance Specialist',
      description: 'Monitor regulatory compliance and quality controls',
      fit: scores.wiscar.will >= 70 && scores.technical >= 60 ? 'High' : 'Medium'
    },
    {
      title: 'Supply Chain Analyst',
      description: 'Analyze data to optimize cold chain performance',
      fit: scores.wiscar.cognitive >= 75 ? 'High' : 'Medium'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
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
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Your Assessment Results
              </h1>
              <p className="text-muted-foreground">
                Comprehensive analysis of your fit for Cold Chain Specialist roles
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Results Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overall Recommendation */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Overall Recommendation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <Badge 
                      variant={getRecommendationColor(recommendation) as any}
                      className="text-lg px-4 py-2 mb-4"
                    >
                      {recommendationData.title}
                    </Badge>
                    <div className="text-4xl font-bold mb-2">{Math.round(scores.overall)}%</div>
                    <div className="text-muted-foreground">Overall Confidence Score</div>
                  </div>
                  <p className="text-center mb-6">{recommendationData.description}</p>
                </CardContent>
              </Card>

              {/* WISCAR Analysis */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    WISCAR Framework Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Radar Chart */}
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={wiscarData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="dimension" />
                          <PolarRadiusAxis domain={[0, 100]} />
                          <Radar
                            name="Your Score"
                            dataKey="score"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary))"
                            fillOpacity={0.3}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Score Breakdown */}
                    <div className="space-y-4">
                      {Object.entries(scores.wiscar).map(([key, value]) => (
                        <div key={key}>
                          <div className="flex justify-between mb-1">
                            <span className="capitalize text-sm font-medium">
                              {key.replace('_', ' ')}
                            </span>
                            <span className="text-sm font-bold">{Math.round(value)}%</span>
                          </div>
                          <Progress value={value} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technical & Psychometric Scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-medium">
                  <CardHeader>
                    <CardTitle className="text-lg">Technical Readiness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">{scores.technical}%</div>
                      <Progress value={scores.technical} className="mb-4" />
                      <p className="text-sm text-muted-foreground">
                        {scores.technical >= 80 ? 'Ready for technical training' : 
                         scores.technical >= 60 ? 'Some foundation needed' : 
                         'Foundational knowledge gaps'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-medium">
                  <CardHeader>
                    <CardTitle className="text-lg">Psychological Fit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">{Math.round(scores.psychometric)}%</div>
                      <Progress value={scores.psychometric} className="mb-4" />
                      <p className="text-sm text-muted-foreground">
                        {scores.psychometric >= 85 ? 'Strong personality fit' :
                         scores.psychometric >= 65 ? 'Good potential with development' :
                         'Consider alternative roles'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Next Steps */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Recommended Next Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {recommendationData.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Career Roles */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle>Career Role Fit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {careerRoles.map((role, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{role.title}</h4>
                        <Badge 
                          variant={role.fit === 'High' ? 'default' : 
                                  role.fit === 'Medium' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {role.fit}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{role.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-3">
                <Button variant="hero" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Results
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => navigate('/assessment')}
                >
                  Retake Assessment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;