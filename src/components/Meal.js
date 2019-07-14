import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint'
import { mb, pb } from 'styled-components-spacing'
import { formatDateDistanceToNow } from '../data/languages'

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mb({ mobile: 2, tablet: 3, desktop: 3 })};
  ${breakpoint('tablet')`
    flex-wrap: nowrap;
  `}
`

const Header = styled.h1`
  margin: 0;
  width: 100%;
  ${breakpoint('tablet')`
    width: auto;
  `}
`

const SubHeader = styled.div`
  margin: 0;
  font-size: 0.8em;
  color: #777;
  flex-shrink: 0;
`

const ShortDescription = styled.div`
  width: 100%;
  color: #223;
  ${pb({ mobile: 2, tablet: 3, desktop: 4 })};
`

const Meal = ({ meal, children }) => {
  const { title, updatedAt, shortDescription, node_locale } = meal

  return (
    <>
      <HeaderWrapper>
        <Header>{title}</Header>
        <SubHeader>{formatDateDistanceToNow(node_locale, new Date(updatedAt))}</SubHeader>
      </HeaderWrapper>

      <ShortDescription
        dangerouslySetInnerHTML={{
          __html: shortDescription.childMarkdownRemark.html,
        }}
      />
      { children }
    </>
  )
}

export default Meal
