import React, { useState, useEffect } from "react";

// Modules/Libraries
import Chart from "chart.js";
import { connect } from "react-redux";
import classnames from "classnames";
import { Line, Bar } from "react-chartjs-2";

// Redux Functions
import { loadTickets } from "../../store/tickets.js";

// Components
import PieChart from "./utils/PieChart.js";
import { chartOptions, parseOptions, chartExample1 } from "./utils/charts.js";

// Reactstrap
import {
  Row,
  Col,
  Nav,
  Card,
  NavItem,
  NavLink,
  CardBody,
  Container,
  CardHeader,
} from "reactstrap";

export const Dashboard = ({ tickets, getTickets }) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  useEffect(() => {
    try {
      getTickets();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Tickets Submitted</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                {tickets.length === 0 ? (
                  <div>Loading</div>
                ) : (
                  <div className="chart">
                    <Line
                      data={chartExample1(tickets)[chartExample1Data]}
                      options={chartExample1.options}
                      getDatasetAtEvent={(e) => console.log(e)}
                    />
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          {tickets.length === 0 ? (
            <div>Loading</div>
          ) : (
            <>
              <Col xl="4" className="mb-2">
                <PieChart userTickets={tickets} focus={"type"} />
              </Col>
              <Col xl="4" className="mb-2">
                <PieChart userTickets={tickets} focus={"priority"} />
              </Col>
              <Col xl="4" className="mb-2">
                <PieChart userTickets={tickets} focus={"status"} />
              </Col>{" "}
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  tickets: state.tickets,
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: () => dispatch(loadTickets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
