import React, { useState, useEffect } from 'react';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  const handleCommentSubmit = (postId) => {
    const storedPosts = [...posts];
    const postIndex = storedPosts.findIndex(post => post.id === postId);
    if (postIndex > -1) {
      storedPosts[postIndex].comments.push({ content: comment });
      localStorage.setItem('posts', JSON.stringify(storedPosts));
      setPosts(storedPosts);
      setComment('');
    }
  };

  return (
    <div>
      <h2>Foro</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {post.image && <img src={post.image} alt="Imagen del post" style={{ maxWidth: '200px' }} />}
          <div>
            <h4>Comentarios:</h4>
            {post.comments.length > 0 ? (
              post.comments.map((comment, index) => <p key={index}>{comment.content}</p>)
            ) : (
              <p>No hay comentarios.</p>
            )}
            <form onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(post.id); }}>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escribe un comentario"
                required
              />
              <button type="submit">Comentar</button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forum;
