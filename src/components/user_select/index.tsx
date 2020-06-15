import React from "react";
import styled from "styled-components";
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

const Label = styled.label`
  color: ${({ theme }) => theme.softBlack};
`;

type UserSelectProps = {
  users: string[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  currentUser: string;
};
const UserSelect: React.FC<UserSelectProps> = ({
  users,
  handleChange,
  currentUser
}) => {
  const userOptions = map(users, (val, idx) => {
    return (
      <option key={idx} value={val}>
        {val}
      </option>
    );
  });
  return (
    <section>
      <Label htmlFor="chatUsers">Choose your user:</Label>
      <Select
        id="chatUsers"
        onChange={e => handleChange(e)}
        value={currentUser}
      >
        {userOptions}
      </Select>
    </section>
  );
};

export default UserSelect;
