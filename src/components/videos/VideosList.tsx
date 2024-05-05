import React from "react";
import { Button, Card, Row, Col, Spin } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Videos } from "../../types";

const VideosList = () => {
  const navigate = useNavigate();
  const [fetchData, setFetchData] = React.useState<Videos[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
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
          {fetchData.map((item: Videos, index) => (
            <Col xs={24} sm={8}>
              <Card
              key={index}
                onClick={() => navigate(`/video-play/${item._id}`)}
                title={<small>{item.title}</small>}
              >
                <img
                  src={item.thumbnail}
                  style={{ height: 280, width: "100%" }}
                />
                <Card.Meta description={item.description}></Card.Meta>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default VideosList;
