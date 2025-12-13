const Vignette = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[999]"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.7) 100%)',
      }}
    />
  );
};

export default Vignette;
