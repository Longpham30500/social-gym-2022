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
    <Stack alignItems="center" mt="10px" justifyContent="center" p="20px">
      <Typography color="black" fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="10px" textAlign="center">
        Search All Post with TITLE POST
      </Typography>
      <Box position="relative" mb="12px">
        <TextField
          height="76px"
          sx={{ input: { width: '400px',fontWeight: '700', border: 'none', borderRadius: '4px' }, width: '100%', backgroundColor: '#fff', borderRadius: '40px' }}
          value={search}
          onChange={(e) => searchItems(e.target.value.toLowerCase())}
          placeholder="Search Post"
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