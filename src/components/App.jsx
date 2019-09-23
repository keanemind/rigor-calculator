import React, {useState} from 'react';
import {
  Typography, Radio, Upload, Icon, Input, Col, Row, Button, Card,
} from 'antd';

/**
 * Main page.
 * @return {Object} React element
 */
function App() {
  const [inputType, setInputType] = useState('image');

  /**
   * @param {Event} e
   */
  function handleInputTypeChange(e) {
    setInputType(e.target.value);
  }

  let input;
  if (inputType === 'image') {
    input = (
      <Upload.Dragger accept='image/*'>
        <p className="ant-upload-drag-icon">
          <Icon type='camera' />
        </p>
        <Typography.Text>
          Drag a photo to this area, or click to capture / browse for a photo.
        </Typography.Text>
      </Upload.Dragger>
    );
  } else if (inputType === 'pdf') {
    input = (
      <Upload.Dragger accept='.pdf'>
        <p className="ant-upload-drag-icon">
          <Icon type='upload' />
        </p>
        <Typography.Text>
          Drag a PDF to this area, or click to browse for a PDF.
        </Typography.Text>
      </Upload.Dragger>
    );
  } else if (inputType === 'url') {
    input = (
      <>
        <Input.Search
          size='large'
          placeholder='https://www.example.com/proof.pdf'
          enterButton='Submit'
        />
        <Typography.Text type='secondary'>
          Note: the linked file must be a PDF or image.
        </Typography.Text>
      </>
    );
  } else if (inputType === 'text') {
    input = (
      <>
        <Input.TextArea
          placeholder='Assume that √2 is rational...'
          autosize={{minRows: 3}}
        />
        <Button type='primary' block>Submit</Button>
      </>
    );
  }

  return (
    <>
        <div style={{textAlign: 'center', paddingTop: '75px'}}>
          <Typography.Title>Rigor Checker 🧐</Typography.Title>
          <Typography.Title level={4}>
            Determine objectively how rigorous a mathematical proof is!
          </Typography.Title>
          <br />
          <Row type='flex' justify='center'>
            <Col xs={22} sm={22} md={14} lg={14} xl={10} xxl={10}>
              <Card>
                <p>
                  Upload a picture / PDF, provide a URL, or type out the proof
                  (LaTeX accepted).
                </p>
                <Radio.Group
                  onChange={handleInputTypeChange}
                  defaultValue='image'
                  size='large'
                >
                  <Radio.Button value='image'>
                    <Icon type='picture' />
                    <span style={{marginLeft: '8px'}}>Image</span>
                  </Radio.Button>
                  <Radio.Button size='large' value='pdf'>
                    <Icon type='file-text' />
                    <span style={{marginLeft: '8px'}}>PDF</span>
                  </Radio.Button>
                  <Radio.Button size='large' value='url'>
                    <Icon type='link' />
                    <span style={{marginLeft: '8px'}}>URL</span>
                  </Radio.Button>
                  <Radio.Button size='large' value='text'>
                    <Icon type='form' />
                    <span style={{marginLeft: '8px'}}>Text</span>
                  </Radio.Button>
                </Radio.Group>
                <div style={{marginTop: '1.4em'}}>
                  {input}
                </div>
              </Card>
            </Col>
          </Row>
        </div>
    </>
  );
}

export default App;
