import React, { useState, useMemo } from "react";

// Modules/Libraries
import { TailSpin } from "react-loading-icons";
import parsePhoneNumber from "libphonenumber-js";

// Components
import PaginationComponent from "./PaginationComponent";

// Reactstrap
import {
  Row,
  Col,
  Card,
  Media,
  Table,
  CardFooter,
  CardHeader,
} from "reactstrap";

function ProjectTeamTable({ isLoading, projectTeam, error }) {
  //pagination
  const [totalTeamMembers, setTotalTeamMembers] = useState(0);
  const [currentTeamMembersPage, setCurrentTeamMembersPage] = useState(1);
  const teamMembersPerPage = 5;

  //pagination for team table
  const teamMembersData = useMemo(() => {
    if (projectTeam) {
      if (!projectTeam.error) {
        let computedTeamMembers = projectTeam.users ? projectTeam.users : [];

        setTotalTeamMembers(computedTeamMembers.length);

        //current page slice
        return computedTeamMembers.slice(
          (currentTeamMembersPage - 1) * teamMembersPerPage,
          (currentTeamMembersPage - 1) * teamMembersPerPage + teamMembersPerPage
        );
      }
    }
  }, [projectTeam, currentTeamMembersPage]);

  return (
    <Card className="shadow custom-card-4">
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <Col>
            <h3 className="mb-0">Team</h3>
          </Col>
        </Row>
      </CardHeader>

      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {error && error.response ? (
            <tr>
              <td className="no-projects" colspan="6">
                <div>
                  Warning: {error.response.data.toString().split(":")[0]}{" "}
                </div>
              </td>
            </tr>
          ) : (
            <>
              {console.log(isLoading)}
              {isLoading ? (
                <>
                  <tr>
                    <td className="no-projects" colspan="6">
                      <TailSpin stroke="blue" />
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  {teamMembersData.length > 0 ? (
                    teamMembersData.map((user) => {
                      return (
                        <tr key={user.id} className="teamRow">
                          <th>
                            <Media>
                              {user.username} {user.last_name}
                            </Media>
                          </th>
                          <td>{user.email}</td>
                          <td>
                            {user.phone_number
                              ? parsePhoneNumber(
                                  user.phone_number.toString(),
                                  "US"
                                ).formatNational()
                              : "(215) 583 - 5694"}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className="no-projects" colspan="6">
                        This Project currently has no members
                      </td>
                    </tr>
                  )}
                </>
              )}
            </>
          )}
        </tbody>
      </Table>
      <CardFooter>
        <PaginationComponent
          total={totalTeamMembers}
          itemsPerPage={teamMembersPerPage}
          currentPage={currentTeamMembersPage}
          onPageChange={(page) => setCurrentTeamMembersPage(page)}
        />
      </CardFooter>
    </Card>
  );
}

export default ProjectTeamTable;
