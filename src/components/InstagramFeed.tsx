import React, { useEffect, useState } from "react";
import "./InstagramFeed.css";

interface InstagramMedia {
  id: number;
  media_url: string;
  caption?: string;
}

const mockPosts: InstagramMedia[] = [
  {
    id: 1,
    media_url: "https://via.placeholder.com/300",
    caption: "Post 1 caption",
  },
  {
    id: 2,
    media_url: "https://via.placeholder.com/300",
    caption: "Post 2 caption",
  },
  {
    id: 3,
    media_url: "https://via.placeholder.com/300",
    caption: "Post 3 caption",
  },
  {
    id: 4,
    media_url: "https://via.placeholder.com/300",
    caption: "Post 4 caption",
  },
  {
    id: 5,
    media_url: "https://via.placeholder.com/300",
    caption: "Post 5 caption",
  },
  {
    id: 6,
    media_url: "https://via.placeholder.com/300",
    caption: "Post 6 caption",
  },
  {
    id: 7,
    media_url: "https://via.placeholder.com/300",
    caption: "Post 7 caption",
  },
  {
    id: 8,
    media_url: "https://via.placeholder.com/300",
    caption: "Post 8 caption",
  },
  {
    id: 9,
    media_url: "https://via.placeholder.com/300",
    caption: "Post 9 caption",
  },
];

const InstagramFeed: React.FC = () => {
  const [media, setMedia] = useState<InstagramMedia[]>(mockPosts); // Start with mock data
  const domainUrl = "https://graph.instagram.com/me/media?";
  const fields = "fields=media_url,caption"; // Added caption
  const accessToken = "token";
  // const accessToken = "IGQWRQV2Q1d3lKbjU0b0VUOE1Xal9IX1BqZAXliZAzJ0RzdkcTgxeHFCUlQzOTBCbjZAsWHhkcms3UzBlNldwblJPdkV6Q1F1eGU1bWpzQ0x5dFZAfay1KRWliNFRQMnVOR0xid1MyMU44NXphcG0xdlZAhcDBTUjhJbzgZD"; // Replace with your actual access token

  useEffect(() => {
    const fetchInstagramData = async () => {
      if (accessToken === "token") {
        // Use mock data
        setMedia(mockPosts);
      } else {
        try {
          const response = await fetch(
            `${domainUrl}${fields}&access_token=${accessToken}`
          );
          const data = await response.json();
          setMedia(data.data);
        } catch (error) {
          console.error("Error fetching Instagram data:", error);
        }
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
