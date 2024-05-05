import React from "react";
import { Card, Button, Spin, Row, Col } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Videos } from "../../types";
import VideosList from "./VideosList";

const VideosPlay = () => {
  const [data, setData] = React.useState<Videos | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const routeParams = useParams();

  const fetchPayVideo = async () => {
    setLoading(true);
    const response = await axios.get(`/videos/play-videos/${routeParams.id}`);
    setData(response.data?.data);
    setLoading(false);
  };

  React.useEffect(() => {
    if (routeParams.id) {
      fetchPayVideo().catch(console.log);
    }
  }, [routeParams.id]);

  return (
    <Row className="p-2">
      <Col xs={0} sm={2}></Col>
      {loading ? (
        <div className=" grid place-content-center h-screen">
          <Spin />
        </div>
      ) : (
        <Col sm={12} xs={24}>
          {" "}
          <video
            width="750"
            height="500"
            style={{ borderRadius: 10 }}
            controls
            src={data?.videoFile && data?.videoFile}
          />{" "}
        </Col>
      )}
      <Col sm={9}>
        <VideosList
          mute={true}
          size={{
            xs: 24,
            sm: 24,
            CardHeight: 140,
            videoHeight: 110,
            imageHeignt: 110,
            videoWidth: 180,
            imageWidth: 180,
            innerCardRowCol: { sm: { imgSm: 12, descriptionSm: 12 } },
          }}
        />
      </Col>
    </Row>
  );
};

export default VideosPlay;
