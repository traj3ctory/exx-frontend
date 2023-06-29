import SuccessIcon from "@/components/SuccessIcon";
import { jsonArrayI } from "@/types";
import { Alert, Button, Card, Space, Typography, notification } from "antd";
import { FC } from "react";

interface IProps {
  prev: () => void;
  data: jsonArrayI[];
}

/**
 * @author traj3ctory
 * @function @SenderSummary
 **/

const SenderSummary: FC<IProps> = ({ prev, data }) => {
  const handleSubmit = () => {
    notification.open({
      message: <strong>Successfully sent token</strong>,
      description: "Your token has been successfully sent to all addresses",
      icon: <SuccessIcon />,
    });
  }

  return (
    <Card>
      <Space direction="vertical" size="large">
        <Typography.Title level={2}>Sender</Typography.Title>

        <div className="header">
          <div className="intro">
            <small>Total number of token to send</small>
            <Typography.Title level={3} className="text-primary">
              0.00 BNB
            </Typography.Title>
          </div>
          <div className="flex">
            <div className="balance">
              Token Balance <span className="text-primary bold">0 BNB</span>
            </div>
            <div className="balance">
              BNB Balance <span className="text-primary bold">0 BNB</span>
            </div>
          </div>
        </div>
        <Alert
          message=""
          description="Not enough token in your wallet.   Add funds"
          type="warning"
          showIcon
        />
        <div className="list">
          <Typography.Title level={5} className="text-primary">
            List of recipients
          </Typography.Title>
          <ul className="content">
            {data?.length > 0 &&
              data?.map((el: jsonArrayI, i: number) => {
                const amount = parseFloat(el.count).toFixed(1);
                return (
                  <li key={i}>
                    {el.address} <span>{amount}</span>
                  </li>
                );
              })}
          </ul>
        </div>

        <div className="flex" style={{ gap: "1rem" }}>
          <Button size="large" type="default" block shape="round" onClick={prev}>
            Go back
          </Button>
          <Button size="large" type="primary" block shape="round" onClick={handleSubmit}>
            Proceed
          </Button>
        </div>
      </Space>
    </Card>
  );
};

export default SenderSummary;
