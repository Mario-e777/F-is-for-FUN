/* React stuff */
import { useState } from 'react'

/* Modules */
import { useSpring } from 'react-spring'

function useSelection({
  springConfig = {
    mass: 1,
    tension: 124,
    friction: 18
  }
}) {
  const [isSelected, setIsSelected] = useState(false)
  const shadowStyle = useSpring({
    config: springConfig,
    to: { 
      right: isSelected ? '0' : '50%',
    }
  })

  const triggerShadow = (type: boolean) => setIsSelected(type)
  return [shadowStyle, triggerShadow]
}
export default useSelection