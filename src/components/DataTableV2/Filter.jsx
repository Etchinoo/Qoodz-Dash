import Select from "react-select";

const Filter = ({ opt, key, icon, label, onFilter }) => {
  console.log("Filter", opt, key, icon, label);
  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        // defaultValue={colourOptions[0]}
        // isDisabled={isDisabled}
        // isLoading={isLoading}
        // isClearable={isClearable}
        // isRtl={isRtl}
        placeholder={label}
        isSearchable={true}
        name={key}
        options={opt}
      />
    </>
  );
};

export default Filter;
