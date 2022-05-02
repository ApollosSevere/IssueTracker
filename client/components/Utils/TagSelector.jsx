import React from "react";

// Modules/Libraries
import { components } from "react-select";
import { default as ReactSelect } from "react-select";

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
    <div className="selector" style={{ width: "100%", margin: "0 auto" }}>
      <span
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
