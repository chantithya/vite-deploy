import React, { useEffect, useState } from "react";
import "./InstagramFeed.css";

interface InstagramMedia {
  id: string;
  media_url: string;
  caption?: string;
}

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

const InstagramFeed: React.FC = () => {
  const [media, setMedia] = useState<InstagramMedia[]>(mockPosts); // Start with mock data
  const domainUrl = "https://graph.instagram.com/me/media?";
  const fields = "fields=media_url,caption";
  const accessToken =
    "IGQWRNRnZAWVTljVlhSYzVnTlEtcVI3T2MxcU9zLVVLWHBHSVJkU1hnX3N5MVQzV1RKWVpfcHdla3lmekxfYV91d1NjMERGbkVWM2tFWC15ZA0lId096SzE5aEV2em5obWt0U0x0ZAmNYdkljQnlxd0xhWHEtMEJ0WG8ZD";

  useEffect(() => {
    const fetchInstagramData = async () => {
      try {
        const requestUrl = `${domainUrl}${fields}&access_token=${accessToken}`;
        const response = await fetch(requestUrl);

        if (!response.ok) {
          if (response.status === 400) {
            setMedia(mockPosts);
            return; // Exit early if there's a bad request
          }
          // Optionally, handle other statuses if needed
          return;
        }

        const data = await response.json();
        setMedia(data.data);
      } catch {
        // Handle any other errors by using mock data without logging
        setMedia(mockPosts);
      }
    };

    fetchInstagramData();
  }, [accessToken]);

  return (
    <div className="instagram-feed row">
      {media.map((post) => (
        <div key={post.id} className="col-sm-6 col-md-4 col-lg-4 mb-4">
          <div className="card shadow-sm">
            <img
              src={post.media_url}
              className="card-img-top"
              alt={`Post ${post.id}`}
            />
            {post.caption && (
              <div className="card-body">
                <p className="card-text">{post.caption}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstagramFeed;
