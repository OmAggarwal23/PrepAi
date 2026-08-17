import "./PageLoader.scss";

const PageLoader = ({
  title = "PrepAI",
  message = "Preparing your experience...",
}) => {
  return (
    <div className="page-loader">
      <div className="loader-card">
        <div className="loader-spinner"></div>

        <h1>{title}</h1>

        <p>{message}</p>

        <span>Please wait a moment</span>
      </div>
    </div>
  );
};

export default PageLoader;
