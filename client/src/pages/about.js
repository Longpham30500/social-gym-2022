import React from "react";
import { Box, Stack, Typography } from '@mui/material';
import { useSelector } from "react-redux";
const About = () => {
  const {theme} = useSelector(state => state)
  return <Box style={{background: ''}}>
  <Box sx={{ filter: `${ theme ? 'invert(1)' : 'invert(0)'}`, ml: { sm: '50px' } }} position="relative" p="20px">
    <Typography color="#FFBE0B" fontWeight="600" fontSize="26px">SOCIAL-GYM</Typography>
    <Typography color="#FBFAF3" fontWeight={700} sx={{ color: `${ theme ? 'white' : 'black'}`, fontSize: { lg: '44px', xs: '40px' } }} mb="23px" mt="30px">
      We bring for you new forum<br />
      And share about GYM
    </Typography>
    <Typography style={{color: `${ theme ? 'white' : 'black'}`,}}color="#FBFAF3" fontSize="22px" fontFamily="Alegreya" lineHeight="35px">
      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </Typography>
    <Stack>
      <a href="/" style={{ marginTop: '45px', textDecoration: 'none', width: '200px', textAlign: 'center', background: '#FFBE0B', padding: '14px', fontSize: '22px', textTransform: 'none', color: 'black', borderRadius: '4px' }}>HOME PAGE</a>
    </Stack>
    <Typography color="#FFFF80" fontWeight={600} sx={{ opacity: '0.1', display: { lg: 'block', xs: 'none' }, fontSize: '200px' }}>
      SOCIAL GYM
    </Typography>
    <img style={{width: '100%'}} src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" alt="hero-banner" className="hero-banner-img" />
  </Box>

  <Box style={{filter: `${ theme ? 'invert(1)' : 'invert(0)'}`}} mt="80px">
    <Stack gap="40px" sx={{ alignItems: 'center' }} flexWrap="wrap" px="40px" pt="24px">
      <img src='https://res.cloudinary.com/longpham352/image/upload/v1665725158/social-gym-2022/csvio0on4khajmwun8v0.png' alt="logo" style={{ width: '200px'}} />
    </Stack>
    <Typography style={{color: `${ theme ? 'white' : 'black'}`,}} variant="h5" sx={{ fontSize: { lg: '28px', xs: '20px' } }} mt="41px" textAlign="center" pb="40px">Made with &#128155; by LONG PHAM</Typography>
  </Box>

  </Box>;
};
export default About;
