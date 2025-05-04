export default function VideoBackground() {
    return (
      <div className="video-container">
        <div className="customer-promise-label">
        <h2>Logistix</h2>
        <h4> Digitaalinen alusta, joka automatisoi kuljetusten kilpailutuksen, hallinnan ja täyttää tyhjät kilometrit. Aikaa ja rahaa säästyy ilman sitoumuksia.</h4>
        </div>

        <div className="customer-promise-label">
        <h2>Tyytyväisyystakuu</h2>
        <h4>Jos et näe vähintään 10% säästöjä kuljetuskustannuksissa ensimmäisen 6kk aikana, saat täyden hyvityksen.
        </h4>
        </div>
        <video autoPlay loop muted playsInline className="background-video" loading="lazy">
        <source src="/assets/backgrounds/Triangle.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
        </video>
    
      </div>
    );
  }