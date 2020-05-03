import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Button = styled.button`
  display: inline-block;
  height: 3rem;
  width: 9rem;
  font-size: 1rem;
  border: none;
  &::after {
    content: " 🧐";
  }
`;

const ModalButton = ({toggleModal}) => <Button onClick={() => toggleModal(true)} >show chat</Button>


ModalButton.propTypes = {
    toggleModal: PropTypes.func,
}

export default ModalButton
