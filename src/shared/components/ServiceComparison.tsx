import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/shared/components/OptimizedImage';

const comparisonData = [
  {
    feature: 'Price',
    nonTech: '$8/page',
    tech: '$15/page',
    ppt: '$5/slide',
    exam: '$30/exam'
  },
  {
    feature: 'Turnaround',
    nonTech: '3-5 days',
    tech: '5-7 days',
    ppt: '2-3 days',
    exam: 'Same day'
  },
  {
    feature: 'Revisions',
    nonTech: 'Free',
    tech: 'Free',
    ppt: 'Free',
    exam: 'Free'
  },
  {
    feature: 'Subjects',
    nonTech: 'English, History, Business',
    tech: 'Python, Java, Statistics',
    ppt: 'All subjects',
    exam: 'All subjects'
  },
  {
    feature: 'Quality',
    nonTech: 'Human research',
    tech: 'Expert technical',
    ppt: 'Professional design',
    exam: 'Guaranteed'
  }
];

export const ServiceComparison = () => {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md border border-gray-200">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left p-3 font-bold text-xs bg-gray-50 rounded-tl-lg">Features</th>
              <th className="text-center p-3 font-bold text-xs bg-blue-50">
                <div className="flex flex-col items-center">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=28&h=28&fit=crop&crop=center"
                    alt="Non-Technical"
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-lg mb-1 shadow-sm"
                  />
                  <span className="text-xs">Non-Technical</span>
                  <Badge variant="secondary" className="mt-1 text-xs px-2 py-0.5 bg-blue-100 text-blue-800">$8/page</Badge>
                </div>
              </th>
              <th className="text-center p-3 font-bold text-xs bg-green-50">
                <div className="flex flex-col items-center">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=28&h=28&fit=crop&crop=center"
                    alt="Technical"
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-lg mb-1 shadow-sm"
                  />
                  <span className="text-xs">Technical</span>
                  <Badge variant="secondary" className="mt-1 text-xs px-2 py-0.5 bg-green-100 text-green-800">$15/page</Badge>
                </div>
              </th>
              <th className="text-center p-3 font-bold text-xs bg-purple-50">
                <div className="flex flex-col items-center">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=28&h=28&fit=crop&crop=center"
                    alt="Presentations"
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-lg mb-1 shadow-sm"
                  />
                  <span className="text-xs">Presentations</span>
                  <Badge variant="secondary" className="mt-1 text-xs px-2 py-0.5 bg-purple-100 text-purple-800">$5/slide</Badge>
                </div>
              </th>
              <th className="text-center p-3 font-bold text-xs bg-orange-50 rounded-tr-lg">
                <div className="flex flex-col items-center">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=28&h=28&fit=crop&crop=center"
                    alt="Exam Help"
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-lg mb-1 shadow-sm"
                  />
                  <span className="text-xs">Exam Help</span>
                  <Badge variant="secondary" className="mt-1 text-xs px-2 py-0.5 bg-orange-100 text-orange-800">$30/exam</Badge>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`}>
                <td className="p-3 font-semibold text-gray-700 border-r border-gray-100 text-xs">{row.feature}</td>
                <td className="p-3 text-center border-r border-gray-100">
                  <span className="font-medium text-gray-800 text-xs">{row.nonTech}</span>
                </td>
                <td className="p-3 text-center border-r border-gray-100">
                  <span className="font-medium text-gray-800 text-xs">{row.tech}</span>
                </td>
                <td className="p-3 text-center border-r border-gray-100">
                  <span className="font-medium text-gray-800 text-xs">{row.ppt}</span>
                </td>
                <td className="p-3 text-center">
                  <span className="font-medium text-gray-800 text-xs">{row.exam}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          All services include free revisions and 24/7 support
        </p>
      </div>
    </div>
  );
};
