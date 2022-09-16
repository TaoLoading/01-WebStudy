import styled from 'styled-components'

// 通过'styled-components'使用js语法写css
// 返回一个react组件，组件的标签为'styled.标签名'中规定的标签
export const HomeWrapper = styled.div`
  font-size: 12px;
  color: red;

  .banner {
    background-color: blue;

    span {
      color: #fff;

      /* '&'表示既是banner又是span */
      &.active {
        color: red;
      }

      &:hover {
        color: green;
      }

      &::after {
        content: "aaa"
      }
    }

    /* .active {
      color: #f00;
    } */
  }
`

export const TitleWrapper = styled.h2`
  text-decoration: underline;
  color: ${props => props.theme.themeColor};
  font-size: ${props => props.theme.fontSize};
`