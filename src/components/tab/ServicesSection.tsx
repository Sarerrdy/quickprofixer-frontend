import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const services = [
  { icon: '🔧', title: 'Electrical Services', description: 'Professional fixing services' },
  { icon: '🛠️', title: 'Plumbing Services', description: 'Reliable client services' },
  { icon: '🔨', title: 'Painting Services', description: 'Artistic painting services' },
  { icon: '🔨', title: 'Tiling Services', description: 'Glossing, Mate, Italino, Romanian etc Tiling services' },
];

interface ServicesSectionProps {
  serviceType: string;
  setServiceType: (type: string) => void;
  setServiceTypeId?: (id: number) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ serviceType, setServiceType, setServiceTypeId }) => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`text-center rounded-lg cursor-pointer ${serviceType === service.title ? 'border-2 border-blue-500' : ''}`}
              onClick={() => {
                setServiceType(service.title);
                if (setServiceTypeId) setServiceTypeId(index);
              }}
            >
              <CardContent>
                <Typography variant="h3">{service.icon}</Typography>
                <Typography variant="h5" className="font-bold mt-4">{service.title}</Typography>
                <Typography variant="body1" className="mt-2">{service.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;



















// import React from 'react';
// import { Card, CardContent, Typography } from '@mui/material';

// const services = [
//   { icon: '🔧', title: 'Electrical Services', description: 'Professional fixing services' },
//   { icon: '🛠️', title: 'Plumbing Services', description: 'Reliable client services' },
//   { icon: '🔨', title: 'Painting Services', description: 'Artistic painting services' },
//   { icon: '🔨', title: 'Tiling Services', description: 'Glossing, Mate, Italino, Romanian etc Tiling services' },
// ];

// interface ServicesSectionProps {
//   serviceType: string;
//   setServiceType: (type: string) => void;
//   setServiceTypeId?: (id: number) => void;
// }

// const ServicesSection: React.FC<ServicesSectionProps> = ({ serviceType, setServiceType, setServiceTypeId }) => {
//   return (
//     <section className="py-20 bg-gray-100">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {services.map((service, index) => (
//             <Card
//               key={index}
//               className={`text-center rounded-lg cursor-pointer ${serviceType === service.title ? 'border-2 border-blue-500' : ''}`}
//               onClick={() => {
//                 setServiceType(service.title);
//                 if (setServiceTypeId) setServiceTypeId(index);
//               }}
//             >
//               <CardContent>
//                 <Typography variant="h3">{service.icon}</Typography>
//                 <Typography variant="h5" className="font-bold mt-4">{service.title}</Typography>
//                 <Typography variant="body1" className="mt-2">{service.description}</Typography>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
       
//       </div>
//     </section>
//   );
// };

// export default ServicesSection;

















// // import React from 'react';
// // import { Card, CardContent, Typography } from '@mui/material';

// // const services = [
// //   { icon: '🔧', title: 'Electrical Services', description: 'Professional fixing services' },
// //   { icon: '🛠️', title: 'Plumbing Services', description: 'Reliable client services' },
// //   { icon: '🔨', title: 'Painting Services', description: 'Artistic painting services' },
// //   { icon: '🔨', title: 'Tiling Services', description: 'Glossing, Mate, Italino, Romanian etc Tiling services' },
// // ];

// // const ServicesSection: React.FC = () => {
// //   return (
// //     <section className="py-20 bg-gray-100">
// //       <div className="container mx-auto px-4">
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// //           {services.map((service, index) => (
// //             <Card key={index} className="text-center rounded-lg">
// //               <CardContent>
// //                 <Typography variant="h3">{service.icon}</Typography>
// //                 <Typography variant="h5" className="font-bold mt-4">{service.title}</Typography>
// //                 <Typography variant="body1" className="mt-2">{service.description}</Typography>
// //               </CardContent>
// //             </Card>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default ServicesSection;