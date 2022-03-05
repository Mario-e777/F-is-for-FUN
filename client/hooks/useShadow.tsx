/* React stuff */
import { useState } from 'react'

/* Modules */
import { useSpring } from 'react-spring'
import { SHADOWS } from '../utils/styles_constants'

function useShadow({
  springConfig = {
    mass: 1.1,
    tension: 240,
    friction: 13
  }
}) {
  const [isHovered, setIsHovered] = useState(false)
  const shadowStyle = useSpring({
    config: springConfig,
    to: { 
      boxShadow: isHovered ? SHADOWS.medium : SHADOWS.small,
      transform: isHovered ? 'scale(1.00666)' : 'scale(1)'
    }
  })

  const triggerShadow = (type: boolean) => setIsHovered(type)
  return [shadowStyle, triggerShadow]
}
export default useShadow