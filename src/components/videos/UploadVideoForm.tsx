import React, { useState } from "react";
import { Form, Input, Button, Upload, message, Drawer, Row, Col } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import axios from "axios";

const UploadVideoForm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (r: boolean) => void;
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onFinish = async (values: any) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("videoFile", values.videoFile[0].originFileObj);
    formData.append("thumbnail", values.thumbnail[0].originFileObj);
    formData.append("title", values.title);
    formData.append("description", values.description);

    try {
      await axios.post("/videos/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Video uploaded successfully");
    } catch (error) {
      console.error("Upload failed", error);
      message.error("Failed to upload video");
    }
    form.resetFields();
    setLoading(false);
  };

  return (
    <Drawer
      title="Upload Videos"
      placement="top"
      onClose={onClose}
      open={open}
      style={{ height: "500px" }}
    >
      <Row>
        <Form
          form={form}
          name="uploadVideo"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="videoFile"
            label="Video File"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
            rules={[
              {
                required: true,
                message: "Please upload the video file",
              },
            ]}
          >
            <Upload.Dragger maxCount={1} beforeUpload={() => false}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single video file upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item
            name="thumbnail"
            label="Thumbnail"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
            rules={[
              {
                required: true,
                message: "Please upload the thumbnail",
              },
            ]}
          >
            <Upload maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>
                Click to upload Thumbnail
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input the title of the video",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the description of the video",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Upload
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Drawer>
  );
};

export default UploadVideoForm;
