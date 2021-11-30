
import { useEffect, useRef, useState } from 'react'
import ColorThief from 'colorthief'
import convert from 'color-convert'
import hexSorter from 'hexsorter'
import { drawImageProp, printAtWordWrap } from '../helpers/canvas'
import Layout from '../components/hoc/Layout'
import styled from 'styled-components'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Canvas from '../components/ui/Canvas'
import ModalComponent from '../components/ui/Modal'

const WrapperStyled = styled.div`

`

function sortColors(colors: string[]) {
  const sort = hexSorter
      .sortColors(colors, 'mostBrightColor') as string[]
  return sort
}

async function getColors(url: HTMLImageElement) {
  const colorThief = new ColorThief()
  try {
    const getColors = await colorThief.getPalette(url, 8) as [[number, number, number]]

    const rgbColors = getColors.map(r => convert.rgb.hex(r)).map(r => '#' + r)

    return sortColors(rgbColors)
  } catch (error) {
    console.log(error)
    return [
      '#EBEBEB',
      '#E1E1E1',
      '#A1A1A1',
      '#464646',
      '#363636',
      '#252525',
      '#181818',
      '#000000'
    ]
  }
}

export default function Home() {
  const ref = useRef<HTMLCanvasElement>(null)
  const refDownload = useRef<HTMLCanvasElement>(null)
  const [image, setImage] = useState<HTMLImageElement>(null)
  const [title, setTitle] = useState('TheWeeknd')
  const [name, setName] = useState('HouseOfBallons')
  const [description, setDescription] = useState('')
  const [cover, setCover] = useState<HTMLImageElement>(null)
  const [colors, setColors] = useState<string[]>([])
  const [resolution, setResolution] = useState(4)
  const [ready, setReady] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const image = new window.Image()
    image.src = '/bg.png'

    image.onload = async () => {
      const f = new FontFace('Roboto', 'url(https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2)')
      const font = await f.load()
      document.fonts.add(font)
      setReady(true)
      setImage(image)
    }
  }, [])

  useEffect(() => {
    if (!cover) return
    getColors(cover).then(setColors)
  }, [cover])

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === 'title') return setTitle(e.currentTarget.value.replace(/ +/g, ''))
    if (e.currentTarget.name === 'name') return setName(e.currentTarget.value.replace(/ +/g, ''))
    if (e.currentTarget.name === 'description') return setDescription(e.currentTarget.value)
    if (e.currentTarget.name === 'cover') {
      const coverImage = new window.Image()

      const url = window.URL.createObjectURL(e.currentTarget.files[0])

      coverImage.src = url

      coverImage.onload = () => setCover(coverImage)

      return
    }
  }

  const downloadCanvas = () => {
    setIsOpen(true)
    var link = document.createElement('a')

    link.download = 'theweeknd-hob-cover.png'
    link.href = refDownload.current.toDataURL()
    link.click()

    link.remove()
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Layout>
      {ready && (
        <WrapperStyled className='flex flex-col lg:flex-row mb-5 md:mb-0'>
          <Canvas
            ref={ref}
            width={1920}
            height={1920}
            title={title}
            name={name}
            description={description}
            colors={colors}
            resolution={resolution}
            image={image}
            cover={cover}
          />
          <Canvas
            ref={refDownload}
            width={1920}
            height={1920}
            title={title}
            name={name}
            description={description}
            colors={colors}
            resolution={1}
            image={image}
            cover={cover}
            style={{ display: 'none' }}
          />
          <div className='ml-0 md:ml-5 flex flex-col justify-center w-full'>
            <Input
              type='text'
              value={title}
              onChange={handleChange}
              name='title'
              placeholder='Artist name'
              max={16}
            />
            <Input
              type='text'
              value={name}
              onChange={handleChange}
              name='name'
              placeholder='Album name'
              max={17}
            />
            <Input
              type='text'
              value={description}
              onChange={handleChange}
              name='description'
              placeholder='Song list'
              textarea
              max={161}
            />
            <Input
              type='file'
              accept='image/png, image/jpeg'
              value=''
              onChange={handleChange}
              name='cover'
              placeholder='Choose a cover'
            />
            <div className='mt-5'>
              <Button
                onClick={downloadCanvas}
              >
                Save Image
              </Button>
            </div>
          </div>
          <ModalComponent
            open={modalIsOpen}
            onClose={closeModal}
          />
        </WrapperStyled>
      )}
    </Layout>
  )
}
