import { 
  Box, Text, Heading, Image, Flex, Avatar, Icon, 
  useColorModeValue, Link, IconButton 
} from "@chakra-ui/react";
import { FaEye, FaComment, FaThumbsUp, FaBookmark } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

type CardProps = {
  id: number
  title: string;
  owner: string;
  views: number;
  comments: number;
  likes: number;
  profilepic: string;
  coverpic: string;
};

const OceanBlogCard: React.FC<CardProps> = ({
  id,
  title,
  owner,
  views,
  comments,
  likes,
  profilepic,
  coverpic,
}) => {
  // Ocean palette
  const palette = {
    deepWater: '#0D1B2A',
    midWater: '#1B263B',
    surfaceWater: '#2D4A68',
    moonGlow: '#E8F4FD',
    pearlShimmer: '#C5E4FD',
    aquaGlow: '#7DD3FC',
    coralWarm: '#FF6B9D',
    coralDeep: '#D946A3',
  };

  return (
    <MotionBox
      position="relative"
      borderRadius="2xl"
      overflow="hidden"
      bg={`linear-gradient(145deg, ${palette.midWater} 0%, ${palette.deepWater} 100%)`}
      border={`1px solid ${palette.surfaceWater}`}
      boxShadow={`0 10px 30px rgba(0, 0, 0, 0.3), 
                  inset 0 0 15px ${palette.surfaceWater}40`}
      transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      whileHover={{ 
        y: -10,
        boxShadow: `0 15px 35px rgba(0, 0, 0, 0.4), 
                    inset 0 0 20px ${palette.aquaGlow}60`
      }}
      _hover={{
        ".wave-overlay": {
          opacity: 0.8,
          transform: "translateY(0)"
        },
        ".bubble": {
          opacity: 0.7
        }
      }}
    >
      {/* Water Surface Reflection */}
      <Box 
        position="absolute" 
        top="0" 
        left="0" 
        w="full" 
        h="20px"
        bg={`linear-gradient(180deg, ${palette.pearlShimmer}80, transparent)`}
        zIndex="1"
      />
      
      {/* Wave Overlay */}
      <Box
        className="wave-overlay"
        position="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
        bg={`url("data:image/svg+xml,%3Csvg width='100' height='40' viewBox='0 0 100 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 Q25 10, 50 20 T100 20 L100 40 L0 40 Z' fill='${palette.pearlShimmer.replace('#', '%23')}20'/%3E%3C/svg%3E")`}
        bgSize="100px 40px"
        opacity="0.3"
        transform="translateY(10px)"
        transition="all 0.5s ease"
        zIndex="1"
      />
      
      {/* Cover Image with Water Effect */}
      <Box 
        position="relative" 
        h="180px" 
        overflow="hidden"
        borderBottom={`1px solid ${palette.surfaceWater}`}
      >
        <Image
          src={coverpic}
          alt="cover"
          w="100%"
          h="100%"
          objectFit="cover"
          filter="sepia(20%) brightness(90%)"
        />
        
        {/* Water Caustics Effect */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="full"
          h="full"
          bg={`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0c.745 8.12-6.68 14.66-13.366 13.504-3.88-.668-6.348-3.4-7.97-6.78C30.97 2.33 28.11 0 24.67 0 14.06 0 14.34 14.86 24.67 17.89c12.27 3.59 23.65-8.02 29.96-17.89z' fill='${palette.pearlShimmer.replace('#', '%23')}15'/%3E%3C/svg%3E")`}
          opacity="0.4"
          zIndex="1"
        />
        
        {/* Floating Bubbles */}
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            className="bubble"
            position="absolute"
            borderRadius="full"
            bg={`radial-gradient(circle at 30% 30%, ${palette.pearlShimmer}, transparent)`}
            boxShadow={`0 0 8px ${palette.aquaGlow}`}
            w={`${Math.random() * 20 + 5}px`}
            h={`${Math.random() * 20 + 5}px`}
            bottom="0"
            left={`${Math.random() * 100}%`}
            opacity="0"
            transition="opacity 0.7s ease"
            zIndex="2"
          />
        ))}
      </Box>

      {/* Content */}
      <Box p={4} position="relative" zIndex="2">
        {/* Title with Glow Effect */}
        <Heading
          fontSize="xl"
          fontWeight="bold"
          color={palette.moonGlow}
          mb={3}
          noOfLines={2}
          textShadow={`0 0 8px ${palette.aquaGlow}80`}
        >
          {title}
        </Heading>

        <Flex justify="space-between" align="center" mt={4}>
          {/* Author */}
          <Flex align="center" gap={2}>
            <Avatar 
              size="sm" 
              src={profilepic} 
              border={`1.5px solid ${palette.aquaGlow}`}
              boxShadow={`0 0 8px ${palette.aquaGlow}80`}
            />
            <Text 
              color={palette.pearlShimmer} 
              fontSize="sm" 
              fontWeight="medium"
            >
              {owner}
            </Text>
          </Flex>

          {/* Stats */}
          <Flex align="center" gap={3} fontSize="sm">
            <Flex align="center" gap={1} color={palette.pearlShimmer}>
              <Icon as={FaThumbsUp} />
              <Text>{likes}</Text>
            </Flex>
            <Flex align="center" gap={1} color={palette.pearlShimmer}>
              <Icon as={FaEye} />
              <Text>{views}</Text>
            </Flex>
            <Flex align="center" gap={1} color={palette.pearlShimmer}>
              <Icon as={FaComment} />
              <Text>{comments}</Text>
            </Flex>
          </Flex>
        </Flex>

        {/* Coral Accent */}
    
      </Box>

     
    </MotionBox>
  );
};

export default OceanBlogCard;