import styled from 'styled-components'

interface IProps {
  onClick: () => void
}

const ButtonStyled = styled.a`
  padding: 10px 20px;
  text-align: center;
  display: block;
  width: 100%;
  background-color: #292929;
  border-radius: 5px;
  cursor: pointer;
`

const Button: React.FC<IProps> = ({ children, onClick }) => {
  return (
    <ButtonStyled
      onClick={onClick}
    >
      {children}
    </ButtonStyled>
  )
}

export default Button
