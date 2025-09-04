import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/shared/components/OptimizedImage';

const comparisonData = [
  {
    feature: 'Price',
    nonTech: '$8/page',
    tech: '$15/page',
    exam: '$30/exam'
  },
  {
    feature: 'Turnaround',
    nonTech: '3-5 days',
    tech: '5-7 days',
    exam: 'Same day'
  },
  {
    feature: 'Revisions',
    nonTech: 'Free',
    tech: 'Free',
    exam: 'Free'
  },
  {
    feature: 'Subjects',
    nonTech: 'English, History, Business',
    tech: 'Python, Java, Statistics',
    exam: 'All subjects'
  },
  {
    feature: 'Quality',
    nonTech: 'Human research',
    tech: 'Expert technical',
    exam: 'Guaranteed'
  }
];

export const ServiceComparison = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Service Comparison
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the right service for your needs
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="border-b">
                <th className="text-left p-6 font-semibold">Features</th>
                <th className="text-center p-6 font-semibold">
                  <div className="flex flex-col items-center">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=32&h=32&fit=crop&crop=center"
                      alt="Non-Technical"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded mb-2"
                    />
                    <span>Non-Technical</span>
                    <Badge variant="secondary" className="mt-1">$8/page</Badge>
                  </div>
                </th>
                <th className="text-center p-6 font-semibold">
                  <div className="flex flex-col items-center">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=32&h=32&fit=crop&crop=center"
                      alt="Technical"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded mb-2"
                    />
                    <span>Technical</span>
                    <Badge variant="secondary" className="mt-1">$15/page</Badge>
                  </div>
                </th>
                <th className="text-center p-6 font-semibold">
                  <div className="flex flex-col items-center">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=32&h=32&fit=crop&crop=center"
                      alt="Exam Help"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded mb-2"
                    />
                    <span>Exam Help</span>
                    <Badge variant="secondary" className="mt-1">$30/exam</Badge>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-6 font-medium">{row.feature}</td>
                  <td className="p-6 text-center">{row.nonTech}</td>
                  <td className="p-6 text-center">{row.tech}</td>
                  <td className="p-6 text-center">{row.exam}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
