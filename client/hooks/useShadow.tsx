/* React stuff */
import { useState } from 'react'

/* Modules */
import { useSpring } from 'react-spring'
import { SHADOWS, TRANSITIONS } from '../utils/styles_constants'

function useShadow({
  springConfig = {
    duration: TRANSITIONS.normal,
  },
}) {
  const [isHovered, setIsHovered] = useState(false)
  const style = useSpring({
    reverse: isHovered,
    from: { boxShadow: SHADOWS.medium },
    to: { boxShadow: SHADOWS.small },
    config: springConfig,
  })

  const trigger = type => setIsHovered(type);
  return [style, trigger]
}
export default useShadow