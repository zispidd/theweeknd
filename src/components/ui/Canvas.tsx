import React, { CSSProperties, useEffect, useRef } from 'react'
import { drawImageProp, printAtWordWrap } from '../../helpers/canvas'

interface IProps {
  resolution: number,
  width: number
  height: number
  title: string
  name: string
  description: string
  colors: string[]
  image: HTMLImageElement
  cover: HTMLImageElement
  style?: CSSProperties
}

const Canvas = React.forwardRef<HTMLCanvasElement, IProps>(({ resolution, width, height, title, name, description, colors, cover, image, style }, ref) => {
  const ref2 = useRef<HTMLCanvasElement>(null)
  const drawImage = async () => {
    if (!image) return
    const refObject = ref as typeof ref2
    const ctx = refObject.current.getContext('2d')

    ctx.drawImage(image, 0, 0, 1920 / resolution, 1920 / resolution)
    ctx.font = `bold ${210 / resolution}px Roboto`
    ctx.fillStyle = '#292526'

    ctx.fillText(title, 60 / resolution, 230 / resolution)

    ctx.font = `bold ${113 / resolution}px Roboto`

    ctx.fillText(name, 785 / resolution, 388 / resolution)

    ctx.font = `bold ${14 / resolution}px Roboto`

    const width = ctx.measureText(name).width
    ctx.fillText(name, (1851 / resolution) - width, 1850 / resolution)

    ctx.font = `bold ${33 / (resolution)}px Roboto`
    printAtWordWrap(ctx, description.toUpperCase(), 70 / resolution, 455 / resolution, 33 / resolution, 1734 / resolution)

    if (cover) {
      drawImageProp(ctx, cover, 70 / resolution, 555 / resolution, 1781 / resolution, 1198 / resolution)

      colors.map((r, i) => {
        ctx.fillStyle = r
        ctx.fillRect((65 + (i * 85)) / resolution, 305 / resolution, 85 / resolution, 85 / resolution)
      })

      colors.map((r, i) => {
        ctx.fillStyle = r
        ctx.fillRect((1830 - (i * 19)) / resolution, 1808 / resolution, 19 / resolution, 19 / resolution)
      })
    }
  }  

  useEffect(() => {
    drawImage()
  }, [image])

  useEffect(() => {
    drawImage()
  }, [title, name, description, cover, colors])
  return (
    <canvas style={style || {}} ref={ref} width={width / resolution} height={height / resolution} />
  )
})

Canvas.displayName = 'canvas'

export default Canvas
