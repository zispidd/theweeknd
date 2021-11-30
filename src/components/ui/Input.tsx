import styled from 'styled-components'

interface IProps {
  placeholder: string
  name: string
  value: string
  onChange: (e: React.FormEvent) => void
  type?: string
  textarea?: boolean
  accept?: string
  max?: number
}

const LabelStyled = styled.label`
  color: #EFEFEF;
`

const InputStyled = styled.input`
  outline: none;
  background-color: #313131;
  border-radius: 2px;
  width: 100%;
`

const TextAreaStyled = styled.textarea`
  outline: none;
  background-color: #313131;
  border-radius: 2px;
  width: 100%;
`

const FileLabelStyled = styled.label`
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #EFEFEF;
  display: block;
  text-align: center;
  cursor: pointer;
`

const Input: React.FC<IProps> = ({ placeholder, name, value, onChange, type, textarea, accept, max }) => {
  if (type === 'file') {
    return (
      <div className='mt-3'>
        <FileLabelStyled htmlFor={name}>
          {placeholder}
        </FileLabelStyled>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          accept={accept}
          id={name}
          style={{ display: 'none' }}
        />
      </div>
    )
  }
  return (
    <div className='mt-3'>
      <LabelStyled className='block' htmlFor={name}>{placeholder}</LabelStyled>
      {textarea
        ? (
          <TextAreaStyled
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            id={name}
            style={{ minHeight: 25 }}
            maxLength={max ?? 0}
          />
        ) :
        (
          <InputStyled
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            id={name}
            type={type || 'text'}
            className='mt-1'
            maxLength={max ?? 0}
          />
        )
      }
    </div>
  )
}

export default Input
