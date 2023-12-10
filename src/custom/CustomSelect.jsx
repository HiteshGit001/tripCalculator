import React, { useState } from 'react';
import jsonp from 'fetch-jsonp';
import qs from 'qs';
import { Select } from 'antd';
import { axiosGet } from '../util/https.server';
import { OPEN_WEATHER_GEO_LOC_URL } from '../api/api';
let timeout;
let currentValue;
const fetch = (value, callback) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  const fake = async () => {
    try {
      const response = await axiosGet(OPEN_WEATHER_GEO_LOC_URL(value))
      if (response?.status === 200) {
        if (currentValue === value) {
          const data = response?.data?.map((ele) => ({ label: `${ele?.name}-${ele?.state}-${ele?.country}`, value: `[${ele?.lat},${ele?.lon}]` }));
          callback(data);
          console.log(data, "dat")
        }
      }
    } catch (error) {
      console.log(error)
    }
  };
  if (value) {
    timeout = setTimeout(fake, 300);
  } else {
    callback([]);
  }
};
const SearchInput = (props) => {
  const { data, setData, value, setValue, placeholder } = props
  const handleSearch = (newValue) => {
    fetch(newValue, setData);
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <p>{placeholder}</p>
      <Select
        showSearch
        value={value}
        placeholder={placeholder}
        style={props.style}
        defaultActiveFirstOption={false}
        suffixIcon={null}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        options={(data || [])}
      />
    </>
  );
};
const CustomSearchSelect = ({ data, setData, value, setValue, placeholder }) => (
  <SearchInput
    data={data}
    setData={setData}
    value={value}
    setValue={setValue}
    placeholder={placeholder}
    style={{
      width: 300,
    }}
  />
);
export default CustomSearchSelect;