import { Col, Nav, Row, Tab } from "react-bootstrap";
import BannerTab from "./tabs-dashborad";
import ClothingTab from "./tab.dashboard.clothing";

const IsAdminDashboard = () => {
  return (
    <div className="div-90vh-pad10-flex">
      <h2>Admin Dashboard</h2>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row style={{ width: "90dvw" }}>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Banner</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Clothings</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <BannerTab />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <ClothingTab />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default IsAdminDashboard;
