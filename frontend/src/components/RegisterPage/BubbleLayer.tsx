// "use client";
// import React from 'react';
// import { Box, keyframes } from '@chakra-ui/react';

// const bubbleFloat = keyframes`
//   0% { transform: translateY(100%); opacity: 0; }
//   30% { opacity: 1; }
//   100% { transform: translateY(-20%); opacity: 0; }
// `;

// const BubbleLayer = () => {
//   return (
//     <>
//       {[...Array(10)].map((_, i) => (
//         <Box
//           key={i}
//           position="absolute"
//           left={`${Math.random() * 100}%`}
//           bottom="-10%"
//           w={`${Math.random() * 8 + 4}px`}
//           h={`${Math.random() * 8 + 4}px`}
//           bg="whiteAlpha.400"
//           borderRadius="full"
//           animation={`${bubbleFloat} ${10 + Math.random() * 10}s ease-in infinite`}
//           filter="blur(0.5px)"
//         />
//       ))}
//     </>
//   );
// };

// export default BubbleLayer;
