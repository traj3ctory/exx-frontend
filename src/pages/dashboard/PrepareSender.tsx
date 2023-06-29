import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  Row,
  Space,
  Switch,
  Typography,
  Upload,
} from "antd";
import Papa from "papaparse";
import { FC, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { jsonArrayI } from "@/types";

interface IProps {
  next: () => void;
  setData: React.Dispatch<React.SetStateAction<jsonArrayI[]>>;
}

/**
 * @author traj3ctory
 * @function @PrepareSender
 **/

const PrepareSender: FC<IProps> = ({ next, setData }) => {
  const [jsonArray, setJsonArray] = useState<jsonArrayI[]>([]);
  const [duplicateJsonArray, setDuplicateJsonArray] = useState<any[]>([]);
  const [uploadModal, setUploadModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(
    "0x3187d7b392f74388F5DD17525BeFF8a6f7Bcb11a"
  );
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  // React.ChangeEvent<HTMLInputElement>
  const handleFile = async (file: File) => {
    setLoading(true);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete(results: { data: any[] }) {
        const table: { rows: any[]; values: any[] } = {
          rows: results.data.map((d) => Object.keys(d)),
          values: results.data.map((d) => Object.values(d)),
        };

        const objectOfArray = table.rows.map((row, i) => ({
          address: table.values[i][0],
          count: table.values[i][1],
        }));
        setJsonArray(objectOfArray);
        setData(objectOfArray);
        checkForDuplicate(objectOfArray);
      },
    });
    setLoading(false);
    setUploadModal(false);
  };

  const handleUpload = (info: any): void => {
    const file = info.fileList[0].originFileObj;
    if (file) {
      handleFile(file);
    }
  };

  const uploadProps: UploadProps = {
    name: "file",
    showUploadList: false,
    beforeUpload: () => false, // Prevent the file from being uploaded
    onChange: handleUpload,
    maxCount: 1,
  };

  const handleDownloadSampleCSV = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = "/docs/sample_csv.csv";
    downloadLink.download = "sample.csv";
    downloadLink.click();
  };

  const checkForDuplicate = (jsonArray: jsonArrayI[]) => {
    const uniqueAddresses = new Set<string>();
    const duplicateAddresses: {
      address: string;
      line: number;
      type: string;
    }[] = [];
    const inaccurateAddresses: {
      address: string;
      line: number;
      type: string;
    }[] = [];

    for (let i = 0; i < jsonArray.length; i++) {
      const item = jsonArray[i];
      const { address } = item;

      // Validate address format
      const isValidFormat = /^0x[a-fA-F0-9]{40}$/.test(address);
      if (!isValidFormat) {
        inaccurateAddresses.push({
          address,
          line: i + 1,
          type: "Inaccurate address",
        });
        continue;
      }

      // Check for duplicate addresses
      if (uniqueAddresses.has(address)) {
        duplicateAddresses.push({
          address,
          line: i + 1,
          type: "Duplicate address",
        });
      } else {
        uniqueAddresses.add(address);
      }
    }

    if (duplicateAddresses.length > 0 || inaccurateAddresses.length > 0) {
      setDuplicateJsonArray([...duplicateAddresses, ...inaccurateAddresses]);
    }
  };

  return (
    <>
      <Card>
        <Space direction="vertical" size="large">
          <Typography.Title level={2}>Sender</Typography.Title>
          <div className="form-group">
            <label htmlFor="address">Enter Address</label>
            <Input
              size="large"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address here"
            />
            <div className="balance">
              Token Balance <span className="text-primary bold">0 BNB</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">List Addresses in CSV</label>
            <div className="address_list">
              <Row>
                <Col lg={2}>
                  <div className="count">
                    <ul>
                      {jsonArray?.length > 0 ? (
                        jsonArray.map((_, i) => <li key={i}>{i + 1}</li>)
                      ) : (
                        <li>0</li>
                      )}
                    </ul>
                  </div>
                </Col>
                <Col lg={22}>
                  <div className="body">
                    <ul>
                      {jsonArray?.length > 0 ? (
                        jsonArray.map((el, i) => {
                          return (
                            <li key={i}>
                              {el.address}, {el.count}
                            </li>
                          );
                        })
                      ) : (
                        <li>
                          By format: address, amount
                          <br />
                          0x3187d7b392f74388F5DD17525BeFF8a6f7Bcb11e, 0
                        </li>
                      )}
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          <div className="flex">
            <p
              className="sm text-primary cursor_pointer"
              onClick={handleDownloadSampleCSV}
            >
              Show sample CSV
            </p>
            <p
              className="sm text-primary flex cursor_pointer"
              onClick={() => setUploadModal(true)}
            >
              <span className="icon">
                <IoIosAddCircleOutline style={{ color: "#D1D1D6" }} />
              </span>
              &ensp;Upload CSV
            </p>
          </div>

          {duplicateJsonArray?.length > 0 ? (
            <ul className="duplicates">
              {duplicateJsonArray.map((el, i) => (
                <li key={i}>
                  Line&nbsp;{el.line}:&nbsp;{el.type}&nbsp;{el.address}
                </li>
              ))}
            </ul>
          ) : (
            <>
              <div className="flex">
                <p className="bold">*Enter same amount for all addresses</p>
                <Switch defaultChecked onChange={onChange} />
              </div>
              <Input size="large" placeholder="" disabled />
            </>
          )}

          <div className="flex" style={{ gap: "1rem" }}>
            {duplicateJsonArray?.length > 0 && (
              <Button size="large" type="default" block shape="round">
                Merge
              </Button>
            )}
            <Button
              size="large"
              type="primary"
              block
              shape="round"
              disabled={jsonArray.length === 0}
              onClick={next}
            >
              {loading ? (
                <div className="loading">
                  <span className="rotate-icon">
                    <FiLoader />
                  </span>{" "}
                  Checking for possible error
                </div>
              ) : (
                "Proceed"
              )}
            </Button>
          </div>
        </Space>
      </Card>
      <Modal
        title="Upload CSV"
        centered
        open={uploadModal}
        onOk={() => setUploadModal(false)}
        okButtonProps={{ disabled: true }}
        onCancel={() => setUploadModal(false)}
      >
        <div className="upload_container">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
      </Modal>
    </>
  );
};

export default PrepareSender;
