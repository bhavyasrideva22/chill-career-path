import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Thermometer, Shield, BarChart3, Users, CheckCircle, Clock } from 'lucide-react';
import heroImage from '@/assets/cold-chain-hero.jpg';

const Index = () => {
  const navigate = useNavigate();

  const startAssessment = () => {
    navigate('/assessment');
  };

  const keySkills = [
    {
      icon: <Thermometer className="w-6 h-6" />,
      title: 'Temperature Management',
      description: 'Monitor and maintain optimal temperature ranges for sensitive products'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Regulatory Compliance',
      description: 'Ensure adherence to FDA, WHO, and industry safety standards'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Data Analysis',
      description: 'Analyze supply chain data to optimize cold chain performance'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Process Coordination',
      description: 'Collaborate with teams to ensure seamless cold chain operations'
    }
  ];

  const careerPaths = [
    'Cold Chain Manager',
    'Logistics Coordinator – Temperature Controlled Goods',
    'Quality Assurance Specialist (Cold Chain)',
    'Pharmaceutical Cold Chain Technician',
    'Supply Chain Compliance Analyst'
  ];

  const assessmentFeatures = [
    {
      icon: <CheckCircle className="w-5 h-5 text-success" />,
      text: 'Psychometric personality and motivation assessment'
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-success" />,
      text: 'Technical knowledge and aptitude evaluation'
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-success" />,
      text: 'WISCAR framework analysis (Will, Interest, Skill, Cognitive, Ability to learn, Real-world alignment)'
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-success" />,
      text: 'Personalized career recommendations and learning paths'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                AI-Powered Career Assessment
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Should I Become a 
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Cold Chain Specialist</span>?
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Discover if you have the skills, personality, and motivation to excel in cold chain logistics. 
                Our comprehensive assessment evaluates your fit for this critical role in ensuring product 
                safety and supply chain efficiency.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={startAssessment}
                  className="text-lg px-8 py-4"
                >
                  Start Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Learn More
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>20-30 minutes</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Instant results</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>Scientifically validated</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroImage} 
                alt="Cold chain logistics illustration" 
                className="w-full h-auto rounded-2xl shadow-large"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is a Cold Chain Specialist Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              What is a Cold Chain Specialist?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A Cold Chain Specialist manages the refrigerated supply chain, ensuring perishable products 
              like food, pharmaceuticals, and vaccines are stored and transported at optimal temperatures 
              to maintain quality, safety, and regulatory compliance throughout the entire supply chain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keySkills.map((skill, index) => (
              <Card key={index} className="bg-gradient-card shadow-soft hover:shadow-medium transition-smooth">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-3">
                    {skill.icon}
                  </div>
                  <CardTitle className="text-lg">{skill.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Career Opportunities
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-card shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl">Typical Career Paths</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {careerPaths.map((career, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-success" />
                        <span>{career}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl">Key Success Traits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span>Strong attention to detail</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span>Analytical thinking and problem-solving</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span>High reliability and responsibility</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span>Technology comfort</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span>Crisis management under pressure</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Comprehensive Assessment Framework
              </h2>
              <p className="text-lg text-muted-foreground">
                Our scientifically-backed assessment evaluates multiple dimensions to give you 
                accurate insights into your career fit.
              </p>
            </div>

            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="text-xl text-center">What You'll Get</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {assessmentFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {feature.icon}
                    <span className="flex-1">{feature.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="text-center mt-12">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={startAssessment}
                className="text-xl px-12 py-6"
              >
                Begin Your Career Assessment
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Free assessment • Instant results • No registration required
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
