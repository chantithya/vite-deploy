import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InstagramFeed.css";

interface InstagramMedia {
  id: string;
  media_url: string;
  caption?: string;
}

// Sample posts for fallback
const mockPosts: InstagramMedia[] = [
  {
    id: "1",
    media_url: "https://via.placeholder.com/300",
    caption: "Post 1 caption",
  },
  {
    id: "2",
    media_url: "https://via.placeholder.com/300",
    caption: "Post 2 caption",
  },
  {
    id: "3",
    media_url: "https://via.placeholder.com/300",
    caption: "Post 3 caption",
  },
  {
    id: "4",
    media_url: "https://via.placeholder.com/300",
    caption: "Post 4 caption",
  },
  {
    id: "5",
    media_url: "https://via.placeholder.com/300",
    caption: "Post 5 caption",
  },
  {
    id: "6",
    media_url: "https://via.placeholder.com/300",
    caption: "Post 6 caption",
  },
  {
    id: "7",
    media_url: "https://via.placeholder.com/300",
    caption: "Post 7 caption",
  },
  {
    id: "8",
    media_url: "https://via.placeholder.com/300",
    caption: "Post 8 caption",
  },
  {
    id: "9",
    media_url: "https://via.placeholder.com/300",
    caption: "Post 9 caption",
  },
];

// Replace this with your actual Instagram access token for testing
const ACCESS_TOKEN = "test";

const InstagramFeed: React.FC = () => {
  const [media, setMedia] = useState<InstagramMedia[]>(mockPosts);
  const navigate = useNavigate();
  const domainUrl = "https://graph.instagram.com/me/media?";
  const fields = "fields=media_url,caption";

  useEffect(() => {
    const fetchInstagramData = async () => {
      if (!ACCESS_TOKEN) {
        console.warn("Access token is missing. Using mock data.");
        setMedia(mockPosts);
        return;
      }

      try {
        const requestUrl = `${domainUrl}${fields}&access_token=${ACCESS_TOKEN}`;
        const response = await fetch(requestUrl);

        if (!response.ok) {
          if (response.status === 400) {
            console.error("Bad request. Using mock data.");
            setMedia(mockPosts);
            return;
          }
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMedia(data.data || mockPosts); // Use mockPosts if data.data is undefined
      } catch (error) {
        console.error("Fetching Instagram data failed:", error);
        setMedia(mockPosts);
      }
    };

    fetchInstagramData();
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/new-feed/${id}`);
  };

  return (
    <div className="instagram-feed row">
      {media.map((post) => (
        <div key={post.id} className="col-sm-6 col-md-4 col-lg-4 mb-4">
          <div
            className="card shadow-sm"
            onClick={() => handleCardClick(post.id)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={post.media_url}
              className="card-img-top"
              alt={`Post ${post.id}`}
            />
            {post.caption && (
              <div className="card-body">
                <p className="card-text"></p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstagramFeed;
