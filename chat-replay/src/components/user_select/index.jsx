import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { map } from "lodash";

const Select = styled.select`
  width: 50%;
  height: 35px;
  background: white;
  color: gray;
  borer-color: black;
  padding-left: 5px;
  margin-left: 10px;
  margin-top: 1rem;
`;

const UserSelect = ({ users, handleChange, currentUser }) => {
  return (
    <section>
      <label htmlFor="chatUsers">Choose your user:</label>
      <Select
        id="chatUsers"
        onChange={e => handleChange(e)}
        value={currentUser}
      >
        {map(users, (val, idx) => {
          return (
            <option key={idx} value={val}>
              {val}
            </option>
          );
        })}
      </Select>
    </section>
  );
};

UserSelect.propTypes = {
  users: PropTypes.array,
  currentUser: PropTypes.number,
  handleChange: PropTypes.func
};

export default UserSelect;
