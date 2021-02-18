import React from 'react'
import styled from 'styled-components'

const Select = styled.div`
  font-size: 1rem;
  position: relative;
  display: flex;
  margin: 8px 0px;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 3px;
  flex-shrink: 0;
  box-shadow: 0px 1px 2px grey;

  &:hover {
    background-color: white;
    border: 1px solid #333;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`

const SelectLabel = styled.span`
  width: 100%;

  &::after {
    content: '\\25BC';
    margin-left: 10px;
    float: right;
  }

  ${Select}:hover &::after {
    content: '\\25B2';
  }
`

const SelectItems = styled.div`
  display: none;
  position: absolute;
  margin-top: 32px;
  background-color: white;
  margin-left: -11px;
  z-index: 99999;
  width: calc(100% + 2px);
  border: 1px solid #000;
  cursor: pointer;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 0px 2px 2px grey;

  ${Select}:hover & {
    display: block;
  }
`

const SelectItem = styled.div`
  margin: 0px auto;
  text-align: center;
  padding: 5px;
`

interface SelectProps {
  label: string;
  children: React.ReactNode;
}

const SelectElement: React.FC<SelectProps> = ({ label, children }) => (
  <Select>
    <SelectLabel>{label}</SelectLabel>
    <SelectItems>
      {children}
    </SelectItems>
  </Select>
)

export default SelectElement
export { SelectItem }
