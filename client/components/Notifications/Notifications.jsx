import "./adminNav.css";
import React from "react";

// Modules/Libraries
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Redux Functions
import { setNotification, deleteNotification } from "../../store/notifications";

// Reactstrap
import {
  Media,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

function Notifications({
  notifications,
  removeNotification,
  updateNotification,
  colorStyle = "white",
}) {
  const update_Notification = async (notification) => {
    try {
      await updateNotification(notification.id, { viewed: true });
    } catch (error) {
      console.log(error);
    }
  };

  const remove_Notification = async (notification) => {
    try {
      await removeNotification(notification.id);
    } catch (error) {
      console.log(error);
    }
  };

  const generateLink = (notification) => {
    let link;

    const notificationName = notification.summary.split(" ");

    if (
      notification.projectName &&
      notification.issueId &&
      notificationName.includes("assignment")
    ) {
      return `/main/projectDetail/${notification.projectName}/${notification.issueId}`;
    }

    if (notification.projectName && notificationName.includes("Project")) {
      return `/main/projectDetail/${notification.projectName}`;
    }

    if (notification.projectName && notification.issueId) {
      link = `/main/timeline/${notification.projectName}/${notification.issueId}`;
    }
    return link;
  };
  return (
    <>
      <UncontrolledDropdown className="notifications" nav>
        <DropdownToggle className="pr-0" nav>
          <Media className="d-flex align-items-center">
            <Media className="ml-2 d-lg-block">
              <i style={{ color: colorStyle }} class="fas fa-bell fa-lg"></i>
            </Media>
          </Media>
        </DropdownToggle>
        <DropdownMenu
          style={{ width: "450px" }}
          className="dropdown-menu-arrow"
          right
        >
          {notifications && (
            <>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div style={{ position: "relative" }}>
                    <DropdownItem
                      style={{
                        backgroundColor: !notification.viewed && "#eff2f3",
                      }}
                    >
                      <Link
                        style={{ color: "gray" }}
                        to={generateLink(notification)}
                        className="custom-link"
                        onClick={() => update_Notification(notification)}
                      >
                        <div className="drop-item">
                          <div class="avatar avatar-sm position-relative">
                            <img
                              alt="..."
                              class="rounded"
                              src="../../assets/img/theme/bootstrap.jpg"
                            />
                          </div>
                          <div class="">
                            <div class=" notification-text font-weight-normal">
                              <span class="font-weight-bold"></span>
                              {notification.summary}
                            </div>
                            <p class="text-xs mb-0">1 day</p>
                          </div>
                        </div>
                      </Link>
                    </DropdownItem>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        remove_Notification(notification);
                      }}
                      className="delete-icon"
                    >
                      <i class="far fa-times-circle fa-lg "></i>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <DropdownItem className="noti-title" header tag="div">
                    <h5 className="text-overflow m-0">No new Notifications</h5>
                  </DropdownItem>

                  <DropdownItem divider />
                </>
              )}
            </>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeNotification: (notificationId) =>
    dispatch(deleteNotification(notificationId)),
  updateNotification: (notificationId, updatedObj) =>
    dispatch(setNotification(notificationId, updatedObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
