import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./CardDetailsModal.module.css";
import Loader from "react-loader-spinner";
import axios from "axios";

export default function MyVerticallyCenteredModal(props) {
  const [cardDetails, setCardDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const boardid = props.boardid;
  const columnid = props.columnid;
  const cardid = props.cardid;

  useEffect(() => {
    axios
      .get(
        `https://pro-organizer-app-7871e.firebaseio.com/${boardid}/ColumnList/${columnid}.json`
      )
      .then((res) => setCardDetails(res.data), setIsLoading(false));
  }, [boardid, columnid]);

  return isLoading ? (
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader type="ThreeDots" color="blue" height="100" width="100" />
    </div>
  ) : (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className={styles.Heading}
        >
          {cardDetails?.Cards[cardid].Title}
          <p className={styles.SubHeading}>in {cardDetails?.Column}</p>
          <button type="button" className="btn btn-primary">
            Edit
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger">
            Archive
          </button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Description</h5>
        <input type="text" value={cardDetails?.Cards[cardid].Description} />
        <hr></hr>
        <h5>Members</h5>
        <p>
          <span className={styles.Members}>
            {cardDetails?.Cards[cardid].Members.split("-")[0]}
          </span>
        </p>
        <hr></hr>
        <h5>Due Date</h5>
        <input type="text" value={cardDetails?.Cards[cardid].Due_Date} />
      </Modal.Body>
    </Modal>
  );
}
