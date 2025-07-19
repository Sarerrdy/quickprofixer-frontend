import React from 'react';
// import Button from '@mui/material/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}>
      <div className="container mx-auto mb-12 px-4 py-20 text-center text-white">
        <h1 className="font-bold mb-4 text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl">
          Find the Best Fixers
        </h1>
        {/* <p className="text-xl mb-8 text-black">Quality services at your fingertips</p> */}
        <label className="bg-secondary p-2 rounded text-base sm:text-lg md:text-xl lg:text-2xl">
          Get Started by finding your desired service below
        </label>
      </div>
    </section>
  );
};

export default HeroSection;













// import React from 'react';
// // import Button from '@mui/material/Button';

// const HeroSection: React.FC = () => {
//   return (
//     <section className="bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}>
//       <div className="container mx-auto mb-12 px-4 py-20 text-center text-white">
//         <h1 className="text-5xl font-bold mb-4 text-black">Find the Best Fixers</h1>
//         {/* <p className="text-xl mb-8 text-black">Quality services at your fingertips</p> */}
//         <label className="bg-secondary text-xl p-2 rounded">Get Started by finding your desired service below</label>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;