import React from "react";
import PropTypes from "prop-types";

const Pagetitle = (props) => {
  document.title = `CANIFA - ${props.title}`;

  return <div>{props.children}</div>;
};

Pagetitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Pagetitle;
