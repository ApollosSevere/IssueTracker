import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchProjectUsers } from "../../store/users";

export const ProjectDetail = ({ projectData, getProjectUsers, userId }) => {
  const { projectId } = useParams();

  useEffect(() => {
    try {
      getProjectUsers(projectId, userId);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <div>{JSON.stringify(projectData.users)}</div>;
};

const mapStateToProps = (state) => ({
  projectData: state.users,
  userId: state.auth.id,
});

const mapDispatchToProps = (dispatch) => ({
  getProjectUsers: (projectId, userId) =>
    dispatch(fetchProjectUsers(projectId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
