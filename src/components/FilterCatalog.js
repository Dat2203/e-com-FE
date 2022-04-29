import React from "react";
import PropTypes from "prop-types";

function FilterCatalog(props) {
  const inputRef = React.useRef(null);

  const onChange = () => {
    if (props.onChange) {
      props.onChange(inputRef.current);
    }
  };

  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        ref={inputRef}
        onChange={onChange}
        checked={props.checked}
      />
      <span className="custom-checkbox__checkmark">
        <i className="bx bx-check"></i>
      </span>
      {props.label}
    </label>
  );
}

FilterCatalog.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default FilterCatalog;
