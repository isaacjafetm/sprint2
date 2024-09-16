import React, { useState } from 'react';
import AdminCommentList from './AdminCommentList';

const AdminPostList = ({ posts, setPosts }) => {
    const [editingPost, setEditingPost] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [comments, setComments] = useState(JSON.parse(localStorage.getItem('comments')) || []);

    const handleEdit = (post) => {
        setEditingPost(post);
        setEditedTitle(post.title);
        setEditedContent(post.content);
    };

    const handleSaveEdit = (postId) => {
        const updatedPosts = posts.map(post => 
            post.id === postId 
            ? { ...post, title: editedTitle, content: editedContent } 
            : post
        );
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setEditingPost(null);
    };

    const handleDelete = (postId) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    return (
        <div>
            <h2>Gestionar Posts</h2>
            {posts.length === 0 && <p>No hay posts disponibles.</p>}
            {posts.map(post => (
                <div key={post.id} className="post-item">
                    {editingPost?.id === post.id ? (
                        <>
                            <input 
                                type="text" 
                                value={editedTitle} 
                                onChange={(e) => setEditedTitle(e.target.value)} 
                                placeholder="Editar título" 
                            />
                            <textarea 
                                value={editedContent} 
                                onChange={(e) => setEditedContent(e.target.value)} 
                                placeholder="Editar contenido"
                            />
                            <button onClick={() => handleSaveEdit(post.id)}>Guardar</button>
                            <button onClick={() => setEditingPost(null)}>Cancelar</button>
                        </>
                    ) : (
                        <>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            {post.image && <img src={post.image} alt="Post visual" style={{ maxWidth: '200px' }} />}
                            <button onClick={() => handleEdit(post)}>Editar</button>
                            <button onClick={() => handleDelete(post.id)}>Eliminar</button>
                            {/* Mostrar comentarios relacionados al post */}
                            <AdminCommentList 
                                comments={comments.filter(comment => comment.postId === post.id)}
                                setComments={setComments}
                            />
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AdminPostList;
