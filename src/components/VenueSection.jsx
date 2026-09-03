import brideGroomImg from '../assets/w.png'
import { VENUES } from '../data/weddingData.js'
import useInView from '../hooks/useInView.js'

function VenueSection() {
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className={`venue-section${inView ? ' is-in-view' : ''}`}>
      <div className="venue-inner">
        <div className="venue-visual">
          <div className="venue-photo-frame">
            <img className="bride-groom-photo" src={brideGroomImg} alt="Bride and groom" />
          </div>
        </div>

        <div className="venue-details">
          <span className="venue-eyebrow">When &amp; Where</span>
          {Object.entries(VENUES).map(([key, event]) => (
            <div className="event-block" key={key}>
              <h3 className="event-title">{event.title}</h3>
              {event.subtitle ? <p className="event-subtitle">{event.subtitle}</p> : null}
              <p className="event-venue">{event.venue}</p>
              <p className="event-meta">{event.date}</p>
              <p className="event-meta">{event.time}</p>
              <p className="event-address">{event.address}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VenueSection