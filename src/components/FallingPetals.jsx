const particles = Array.from({ length: 55 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}%`,
  size: 2 + Math.random() * 4,
  delay: Math.random() * 12,
  duration: 8 + Math.random() * 10,
  drift: -70 + Math.random() * 140,
  glow: Math.random() > 0.55,
}))

function FallingPetals() {
  return (
    <div className="golden-particles" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={`golden-particle ${
            particle.glow ? 'golden-particle-glow' : ''
          }`}
          style={{
            left: particle.left,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            '--particle-drift': `${particle.drift}px`,
          }}
        />
      ))}
    </div>
  )
}

export default FallingPetals