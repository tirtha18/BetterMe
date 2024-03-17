import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import httpclient from '../utils/httpclient';

const CommunityPage = () => {

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await httpclient.get("//localhost:5000/get_posts");
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(posts)

  useEffect(() => {
    posts.forEach((post, index) => {
      console.log(`Post ${index + 1} `,"title:", post.title);
      console.log(`Post ${index + 1} `, "image_link:", post.image_link);
    });
  }, [posts]);

  return (
    <div className='community-page h-screen w-screen p-8'>
      <h2 className='mx-4 mt-14 mb-16 font-poppins font-semibold text-2xl text-lightBlue'>Welcome to your daily feed!</h2>
      <div className="container mx-4 grid grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <PostCard
            key={index}
            title={post.title ? post.title : ""}
            description={post.content ? post.content.slice(0,80) : ""}
            image={post.image_link ? post.image_link : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;