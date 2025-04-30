export default function VideoBackground() {
    return (
      <div className="video-container-2">
        <div className="customer-promise-label-2">
        <h2>Tulevaisuuden logistiikkaa</h2>
        <h4>
         Löydä kuljetuspalvelu yrityksesi tarpeisiin.
        </h4>
        </div>
        <video autoPlay controls={false} loop muted playsInline className="background-video-2" preload="auto">
        <source src="/assets/backgrounds/ab.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
        </video>
    
      </div>
    );
  }
