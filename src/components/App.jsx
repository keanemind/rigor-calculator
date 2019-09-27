import React, {useState} from 'react';
import {
  Typography, Radio, Upload, Icon, Input, Col, Row, Button, Card, Alert, Spin,
} from 'antd';
import Gauge from 'react-gaugejs';

/**
 * Main page.
 * @return {Object} React element
 */
function App() {
  const [inputType, setInputType] = useState('image');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(undefined);
  const [result, setResult] = useState(undefined);
  const [textProof, setTextProof] = useState('');

  /**
   * @param {Event} e
   */
  function handleInputTypeChange(e) {
    setInputType(e.target.value);
    setAlert(undefined);
  }

  /**
   * @param {Event} e
   */
  function handleTextProofChange(e) {
    setTextProof(e.target.value);
  }

  /**
   * @param {*} info
   */
  function handleFileChange(info) {
    if (info.file.status === 'done') {
      setResult(info.file.response['result']);
    } else if (info.file.status === 'error') {
      console.log(info);
      setAlert({type: 'error', text: info.file.error.message});
    }
  }

  /**
   * Make a request to the API.
   * @param {String} value text in the textbox
   */
  function handleURLSubmit(value) {
    if (!validURL(value)) {
      setAlert({type: 'error', text: 'Not a valid URL.'});
      return;
    }

    if (
      !value.endsWith('.jpeg') &&
      !value.endsWith('.jpg') &&
      !value.endsWith('.png') &&
      !value.endsWith('.gif') &&
      !value.endsWith('.bmp') &&
      !value.endsWith('.tiff') &&
      !value.endsWith('.pdf')
    ) {
      setAlert({type: 'error', text: 'Not a supported format.'});
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (Math.floor(xhr.status / 100) === 5) {
        setAlert({type: 'error', text: 'Internal server error.'});
        setLoading(false);
        return;
      }
      const resp = JSON.parse(xhr.responseText);
      setResult(resp['result']);
      setLoading(false);
    };
    xhr.open('POST', 'http://localhost:5000/url');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({url: value}));
    setLoading(true);
  }

  /**
   * Make a request to the API.
   */
  function handleTextSubmit() {
    if (!textProof) {
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (Math.floor(xhr.status / 100) === 5) {
        setAlert({type: 'error', text: 'Internal server error.'});
        setLoading(false);
        return;
      }
      const resp = JSON.parse(xhr.responseText);
      setResult(resp['result']);
      setLoading(false);
    };
    xhr.open('POST', 'http://localhost:5000/text');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({text: textProof}));
    setLoading(true);
  }

  let alertDisplay;
  if (alert) {
    alertDisplay = (
      <>
        <br />
        <br />
        <Alert type={alert.type} message={alert.text} showIcon />
      </>
    );
  }

  let input;
  if (loading) {
    input = <Spin />;
  } else if (inputType === 'image') {
    input = (
      <>
        <Upload.Dragger
          accept='image/*'
          action='http://localhost:5000/image'
          onChange={handleFileChange}
        >
          <p className="ant-upload-drag-icon">
            <Icon type='camera' />
          </p>
          <Typography.Text>
            Drag a photo to this area, or click to capture / browse for a photo.
          </Typography.Text>
        </Upload.Dragger>
        {alertDisplay}
      </>
    );
  } else if (inputType === 'pdf') {
    input = (
      <>
        <Upload.Dragger
          accept='.pdf'
          action='http://localhost:5000/pdf'
          onChange={handleFileChange}
        >
          <p className="ant-upload-drag-icon">
            <Icon type='upload' />
          </p>
          <Typography.Text>
            Drag a PDF to this area, or click to browse for a PDF.<br />
            Note: the PDF must be a text PDF. It cannot consist only of images.
          </Typography.Text>
        </Upload.Dragger>
        {alertDisplay}
      </>
    );
  } else if (inputType === 'url') {
    input = (
      <>
        <Input.Search
          size='large'
          placeholder='https://www.example.com/proof.pdf'
          enterButton='Submit'
          onSearch={handleURLSubmit}
        />
        <Typography.Text type='secondary'>
          Note: the linked file must be a PDF or image.
        </Typography.Text>
        {alertDisplay}
      </>
    );
  } else if (inputType === 'text') {
    input = (
      <>
        <Input.TextArea
          placeholder='Assume that √2 is rational...'
          autosize={{minRows: 3}}
          onChange={handleTextProofChange}
          value={textProof}
        />
        <Button type='primary' onClick={handleTextSubmit} block>Submit</Button>
        {alertDisplay}
      </>
    );
  }

  let cardContent;
  if (!result) {
    cardContent = (
      <>
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
            <span style={{marginLeft: '8px'}} className='mobile-hide'>
              Image
            </span>
          </Radio.Button>
          <Radio.Button size='large' value='pdf'>
            <Icon type='file-text' />
            <span style={{marginLeft: '8px'}} className='mobile-hide'>
              PDF
            </span>
          </Radio.Button>
          <Radio.Button size='large' value='url'>
            <Icon type='link' />
            <span style={{marginLeft: '8px'}} className='mobile-hide'>
              URL
            </span>
          </Radio.Button>
          <Radio.Button size='large' value='text'>
            <Icon type='form' />
            <span style={{marginLeft: '8px'}} className='mobile-hide'>
              Text
            </span>
          </Radio.Button>
        </Radio.Group>
        <div style={{marginTop: '1.4em'}}>
          {input}
        </div>
      </>
    );
  } else {
    cardContent = (
      <>
        <Typography.Text>Your proof is {result}% rigorous.</Typography.Text>
        <br />
        <Gauge value={result} />
      </>
    );
  }

  return (
    <>
        <div style={{textAlign: 'center', paddingTop: '75px'}}>
          <Typography.Title className='fadeInUp'>
            Rigor Checker 🧐
          </Typography.Title>
          <Typography.Title level={4} className='fadeInUp fadeInUpDelay'>
            Determine objectively how rigorous a mathematical proof is!
          </Typography.Title>
          <br />
          <Row type='flex' justify='center'>
            <Col
              xs={22} sm={22} md={14} lg={14} xl={10} xxl={10}
              className='fadeInUp fadeInUpDelay2'
            >
              <Card>{cardContent}</Card>
            </Col>
          </Row>
        </div>
    </>
  );
}

/**
 * Returns whether a string is a valid URL.
 * @param {String} str string to test
 * @return {Boolean}
 */
function validURL(str) {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}

export default App;
