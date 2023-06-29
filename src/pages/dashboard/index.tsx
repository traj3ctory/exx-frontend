import DashboardLayout from "@/shared/dashboardLayout";
import { jsonArrayI } from "@/types";
import {
  Col,
  Row,
  Space,
  Steps
} from "antd";
import { FC, useState } from "react";
import { FaRegCircleDot } from "react-icons/fa6";
import PrepareSender from "./PrepareSender";
import SenderSummary from "./SenderSummary";

interface IProps {}

/**
 * @author traj3ctory
 * @function @Dashboard
 **/

const items = [
  {
    title: "Prepare",
    icon: <FaRegCircleDot />,
  },
  {
    title: "Summary",
    icon: <FaRegCircleDot />,
  },
];

const Dashboard: FC<IProps> = () => {
  const [current, setCurrent] = useState<number>(0);
  const [jsonArray, setGJsonArray] = useState<jsonArrayI[]>([]);

  const handleNext = () => {
    setCurrent(1);
  };

  const handlePrev = () => {
    setCurrent(0);
  };

  return (
    <DashboardLayout>
      <section className="dashboard_content">
        <Row justify="center">
          <Col lg={8}>
          <Space direction="vertical" size="large">
           <Steps current={current} labelPlacement="vertical" items={items} />
            {current === 0 && <PrepareSender setData={setGJsonArray} next={handleNext} />}
            {current === 1 && <SenderSummary data={jsonArray} prev={handlePrev} />}
           </Space>
          </Col>
        </Row>
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
