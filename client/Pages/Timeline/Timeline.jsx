import "./newTimeline.css";
import React, { useEffect, useState } from "react";

// Modules/Libraries
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

// Redux Functions
import { fetchProjectUsers } from "../../store/users";
import { fetchHistory, history_cleanup } from "../../store/history.js";

// Components
import TicketDetail from "../TicketDetail/TicketDetail.jsx";

// Reactstrap
import { Container } from "reactstrap";

export const Timeline = ({
  ticketHistory,
  historyCleanup,
  getProjectUsers,
  getTicketHistory,
}) => {
  const { projectId, ticketId } = useParams();
  const [selectedTicketId, setSelectedTicketId] = useState(ticketId || "");

  useEffect(() => {
    try {
      getProjectUsers(projectId);
      setSelectedTicketId(ticketId);

      getTicketHistory(ticketId);
    } catch (error) {
      console.log(error);
    }
    return () => {
      historyCleanup();
    };
  }, [projectId, ticketId]);

  return (
    <>
      <Container className="mt--7" fluid>
        <div class="row d-flex justify-content-center">
          <div class="col-lg-4">
            <div class="card">
              <div class="card-header pb-0">
                <h6>Timeline with dotted line</h6>
              </div>
              <div class="card-body p-3">
                <div
                  class="timeline timeline-one-side"
                  data-timeline-axis-style="dotted"
                >
                  {!ticketHistory ? (
                    <>Loading ...</>
                  ) : (
                    ticketHistory.map((ticket) => (
                      <div class="timeline-block  mb-3">
                        <span class="timeline-step">
                          <i class="ni ni-bell-55 text-success text-gradient"></i>
                        </span>
                        <div className="d-flex align-items-center">
                          <div className="realTimeline-step"></div>
                          <div class="timeline-text timeline-content">
                            <h6 class="text-dark text-sm font-weight-bold mb-0">
                              {ticket.title}
                            </h6>
                            <p class="text-primary font-weight-bold text-xs mt-1 mb-0">
                              22 DEC 7:20 PM
                            </p>
                            <p class="text-sm mt-3 mb-2">{ticket.summary}</p>
                            <span class="badge badge-sm bg-gradient-success">
                              Design
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-8">
            <TicketDetail
              selectedTicketId={selectedTicketId}
              fromTimeline={true}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  userId: state.auth.id,
  projectData: state.users,
  ticketHistory: state.ticketHistory,
});

const mapDispatchToProps = (dispatch) => ({
  historyCleanup: () => dispatch(history_cleanup()),
  getTicketHistory: (ticketId) => dispatch(fetchHistory(ticketId)),
  getProjectUsers: (projectId) => dispatch(fetchProjectUsers(projectId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
