  import React, { useState } from 'react'
  import { useSelector } from 'react-redux'
  import PostCard from '../PostCard' 
  import { Box, Button, Stack, TextField, Typography } from '@mui/material';



const Posts = () => {
  const { homePosts } = useSelector(state => state)
  const [search, setSearch] = useState('')
  const [postSearch, setPostSearch] = useState([])

  const searchItems = (searchValue) => {
    setSearch(searchValue)
    if (searchValue !== '') {
        const filteredData = homePosts.posts.filter((item) => {
            return Object.values(item.content).join('').toLowerCase().includes(searchValue.toLowerCase())
        })
        setPostSearch(filteredData)
    }
    else{
      setPostSearch(homePosts.posts)
    }
  }


  return (
    <>
        <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography color="#FBFAF3" fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
        Search All Post <br /> TITLE POST
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: { lg: '1170px', xs: '350px' }, backgroundColor: '#fff', borderRadius: '40px' }}
          value={search}
          onChange={(e) => searchItems(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
      </Box>
    </Stack>

    <div className='posts'>
        {
          (search.length > 1 ? postSearch : homePosts.posts).map(post => (
            <PostCard key={post._id} post={post} />
          ))
        }
    </div>
    </>

  )
}

export default Posts