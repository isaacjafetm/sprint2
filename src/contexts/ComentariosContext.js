//src/contexts/ComentariosContext.js
import React, { createContext, useState, useContext } from 'react';

const ComentariosContext = createContext();

export const ComentariosProvider = ({ children }) => {
  const [comentarios, setComentarios] = useState({});

  const addComentario = (biciId, comentario) => {
    setComentarios(prevComentarios => ({
      ...prevComentarios,
      [biciId]: [...(prevComentarios[biciId] || []), comentario]
    }));
  };

  const getComentarios = (biciId) => {
    return comentarios[biciId] || [];
  };

  return (
    <ComentariosContext.Provider value={{ addComentario, getComentarios }}>
      {children}
    </ComentariosContext.Provider>
  );
};

export const useComentarios = () => {
  return useContext(ComentariosContext);
};
