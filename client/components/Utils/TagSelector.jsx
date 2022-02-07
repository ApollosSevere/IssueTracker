import React from "react";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

/* Later, **Maybe Import all important dependencies through redux and useEffect */

function TagSelector({ optionSelected, setSelected, option, multi }) {
  const formatOptions = (arr) =>
    arr.map((item) => ({
      value: item.username || item.name || item,
      label: item.username || item.name || item,
    }));

  const handleChange = (selected) => {
    setSelected(selected);
  };

  return (
    <div className="selector" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <span
        className="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please select account(s)"
      >
        <ReactSelect
          isMulti={multi}
          options={formatOptions(option)}
          allowSelectAll={true}
          value={optionSelected}
          onChange={handleChange}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option,
          }}
        />
      </span>
    </div>
  );
}

export default TagSelector;
