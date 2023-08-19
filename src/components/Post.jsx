import { useEffect } from "react";

export const Post = () => {
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const scrollListener = () => {
      // update the progress based on the scroll position
    };

    window.addEventListener("scroll", scrollListener, false);
  }, []);

  return (
    <>
      <h2 className="progress">Progress: {progress}%</h2>
      <div className="content">
        <h1>Content Title</h1>
        {/** more content */}
      </div>
    </>
  );
};
