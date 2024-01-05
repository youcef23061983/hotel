const Banner = ({ title, children }) => {
  return (
    <div className="banner">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Banner;
