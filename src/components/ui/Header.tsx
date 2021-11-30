import styled from 'styled-components'
import Link from 'next/link'

interface IProps {
  header?: boolean
  highlight?: boolean
}

const HeaderStyled = styled.div`
  height: 75px;
  background-color: #3C3C3C;
`
const LinkStyled = styled.a<IProps>`
  ${props => props.header ? 'font-size: 18px;' : ''}
  ${props => props.highlight ? 'color: #66D36E;' : ''}
`

const Header: React.FC = () => {
  return (
    <HeaderStyled className='flex'>
      <div className='container mx-auto px-10 flex items-center'>
        <Link
          href='/'
          passHref
        >
          <LinkStyled header>The Weeknd Generator</LinkStyled>
        </Link>
        <div className='flex items-center ml-0 md:ml-10'>
          <Link
            href='https://github.com/zispidd/theweeknd'
            passHref
          >
            <LinkStyled>github</LinkStyled>
          </Link>
          <Link
            href='https://discify.bio'
            passHref
          >
            <LinkStyled 
              className='ml-3'
              highlight
            >discify.bio</LinkStyled>
          </Link>
        </div>
      </div>
    </HeaderStyled>
  )
}

export default Header
