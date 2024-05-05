import React from "react";
import { Card, Button, Spin } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Videos } from "../../types";

const VideosPlay = () => {
  const [data, setData] = React.useState<Videos>();
  const [loading, setLoading] = React.useState<boolean>(false)
  const routeParams = useParams();

  const fetchPayVideo = async () => {
    setLoading(true)
    const response = await axios.get(`/videos/play-videos/${routeParams.id}`);
    setData(response.data?.data);
    setLoading(false)
  };

  React.useEffect(() => {
    fetchPayVideo().catch(console.log);
  }, []);

  return (
    <div>
        {loading ?  <div className=" grid place-content-center h-screen">
          <Spin />
        </div> :  <video width="750" height="500" controls src={data?.videoFile} />}
     
    </div>
  );
};

export default VideosPlay;
