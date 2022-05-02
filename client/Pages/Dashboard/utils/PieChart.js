import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";

import { Card, CardHeader, Row, CardBody } from "reactstrap";

function PieChart({ focus, userTickets }) {
  const [pieChartData, setPieChartData] = useState([]);

  //capitalization function
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  useEffect(() => {
    let isRendered = true;
    let map = {}; //{ticketType: quantity}

    userTickets.forEach((ticket) => {
      if (map[capitalize(ticket[focus])]) {
        map[capitalize(ticket[focus])]++;
      } else {
        map[capitalize(ticket[focus])] = 1;
      }
    });

    if (isRendered) {
      setPieChartData(Object.entries(map));
    }
  }, [userTickets, focus]);

  return (
    <div>
      <Card className="shadow">
        <CardHeader className="bg-transparent">
          <Row className="align-items-center">
            <div className="col">
              <h2 className="mb-0">Tickets by {capitalize(focus)}</h2>
            </div>
          </Row>
        </CardHeader>
        <CardBody>
          <Chart
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={
              pieChartData.length > 0
                ? [
                    [`Ticket ${capitalize(focus)}`, "Number of Tickets"],
                    ...pieChartData,
                  ]
                : [[`Ticket ${capitalize(focus)}`, "Number of Tickets"]]
            }
            rootProps={{ "data-testid": "1" }}
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default PieChart;
