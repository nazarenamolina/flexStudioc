import React from 'react';

// Recibimos el objeto completo del video que viene de la base de datos
const VideoPlayer = ({ video }) => {
  const bucketName = 'flex-studio-videos'; 
  const videoUrl = video.idCloudflare.startsWith('http')
    ? video.idCloudflare
    : `http://localhost:9000/${bucketName}/${video.idCloudflare}`;

  return (
    <div style={{ marginBottom: '30px', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <h3 style={{ color: '#D4F85E', marginBottom: '10px' }}>
        {video.orden}. {video.titulo}
      </h3>
      
      <video 
        width="100%" 
        controls 
        controlsList="nodownload"
        style={{ 
          borderRadius: '12px', 
          backgroundColor: '#111',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        <p style={{ color: 'white' }}>
          Tu navegador no soporta la reproducción de este video.
        </p>
      </video>
      {video.duracion > 0 && (
        <p style={{ color: '#888', fontSize: '12px', marginTop: '8px' }}>
          Duración: {video.duracion} min
        </p>
      )}
    </div>
  );
};

export default VideoPlayer;