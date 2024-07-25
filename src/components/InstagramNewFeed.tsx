import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./InstagramNewFeed.css";

interface InstagramMedia {
  id: string;
  media_url: string;
  caption?: string;
}

const mockPost: InstagramMedia = {
  id: "1",
  media_url: "https://via.placeholder.com/600",
  caption: "Post 1 caption",
};

const InstagramNewFeed: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<InstagramMedia | null>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      const accessToken = "test"; // Hardcoded for testing
      const domainUrl = "https://graph.instagram.com/";
      const fields = "fields=media_url,caption";

      if (!id) return;

      try {
        const requestUrl = `${domainUrl}${id}?${fields}&access_token=${accessToken}`;
        const response = await fetch(requestUrl);

        if (!response.ok) {
          console.error("Fetching post data failed. Using mock data.");
          setPost(mockPost);
          return;
        }

        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Fetching post data failed:", error);
        setPost(mockPost);
      }
    };

    fetchPostData();
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="instagram-new-feed container my-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src={post.media_url}
            alt={`Post ${post.id}`}
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <div className="caption-box shadow-sm p-4">
            <h5 className="caption-title">Post {post.id}</h5>
            <p className="caption-text">
              {post.caption || "No caption available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramNewFeed;
