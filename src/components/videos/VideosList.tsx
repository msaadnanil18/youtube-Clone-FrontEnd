import React from "react";
import { Button, Card, Row, Col, Spin } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Videos } from "../../types";

const VideosList = ({
  mute = false,
  size = {
    xs: 24,
    sm: 8,
    CardHeight: 410,
    videoHeight: 280,
    imageHeignt: 280,
    videoWidth: "100%",
    imageWidth: "100%",
    innerCardRowCol: { sm: { imgSm: 24, descriptionSm: 24 } },
  },
}: {
  mute?: boolean;
  size?: {
    xs: number;
    sm: number;
    CardHeight: number;
    videoHeight: number;
    imageHeignt: number;
    videoWidth: any;
    imageWidth: any;
    innerCardRowCol: {
      xs?: number;
      sm: { imgSm: number; descriptionSm: number };
    };
  };
  cardSize?: {};
}) => {
  const navigate = useNavigate();
  const [fetchData, setFetchData] = React.useState<Videos[]>([]);
  const [isPlayingIndex, setIsPlayingIndex] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleMouseEnter = (index: any) => {
    setIsPlayingIndex(index);
  };

  const handleMouseLeave = () => {
    setIsPlayingIndex(null);
  };
  const fetchVideoList = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/videos/list-videos");
      setFetchData(response.data?.data);
    } catch (error) {
      console.log("error while fetching videos", error);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchVideoList();
  }, []);
  return (
    <div>
      {loading ? (
        <div className=" grid place-content-center h-screen">
          <Spin />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {fetchData.map((item, index) => (
            <Col key={index} xs={size?.xs} sm={size?.sm}>
              <Card
                loading={loading}
                bordered={false}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  navigate(`/video-play/${item._id}`);
                }}
                style={{ height: size.CardHeight }}
              >
                <Row>
                  <Col sm={size.innerCardRowCol.sm.imgSm}>
                    {isPlayingIndex === index ? (
                      <video
                        src={item.videoFile}
                        style={{
                          height: size.videoHeight,
                          width: size.videoWidth,
                        }}
                        autoPlay={true}
                        muted={mute}
                      />
                    ) : (
                      <img
                        src={item.thumbnail}
                        style={{
                          height: size.imageHeignt,
                          width: size.imageWidth,
                          borderRadius: 20,
                        }}
                      />
                    )}
                  </Col>
                  <Col sm={size.innerCardRowCol.sm.descriptionSm}>
                    <Card.Meta
                      title={<small>{item.title}</small>}
                      description={item.description}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default VideosList;
