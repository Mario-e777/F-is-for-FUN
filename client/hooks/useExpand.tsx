/* React stuff */
import { useState } from 'react'

/* Modules */
import { useSpring } from 'react-spring'

function useExpand({
  springConfig = {
    mass: 1,
    tension: 124,
    friction: 18
  }
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const expandStyle = useSpring({
    config: springConfig,
    to: { 
      height: isExpanded ? '23.3rem' : '6rem',
    }
  })

  const triggerShadow = (type: boolean) => setIsExpanded(type)
  return [expandStyle, triggerShadow]
}
export default useExpand