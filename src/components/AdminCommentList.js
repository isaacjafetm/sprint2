import React from 'react';

const AdminCommentList = ({ comments, setComments }) => {
    const handleDeleteComment = (commentId) => {
        const updatedComments = comments.filter(comment => comment.id !== commentId);
        setComments(updatedComments);
        localStorage.setItem('comments', JSON.stringify(updatedComments));
    };

    return (
        <div className="comment-list">
            <h4>Comentarios</h4>
            {comments.length === 0 && <p>No hay comentarios.</p>}
            {comments.map(comment => (
                <div key={comment.id} className="comment-item">
                    <p><strong>{comment.author}:</strong> {comment.content}</p>
                    <button onClick={() => handleDeleteComment(comment.id)}>Eliminar comentario</button>
                </div>
            ))}
        </div>
    );
};

export default AdminCommentList;
