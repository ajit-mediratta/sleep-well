import { useState, createContext, useContext, useEffect } from 'react'

const AssessmentContext = createContext()

const defaultAssessment = JSON.parse(localStorage.getItem('assessment')) || []

const AssessmentProvider = ({children}) => {
  const [items, setItems] = useState(defaultAssessment)

  useEffect(() => {
    localStorage.setItem('assessment', JSON.stringify(items))
  }, [items])

  const addAssessment = (data, findCartItem) => {
    if(!findCartItem) {
      return setItems((items) => [data, ...items] )
    }

    const filtered = items.filter((item) => item.id !== findCartItem.id)
    setItems(filtered)
  }

  const removeAssessment = (item_id) => {
    const filtered = items.filter((item) => item.id !== item_id)
    setItems(filtered)
  }

  const values = {
    items,
    setItems,
    addAssessment,
    removeAssessment,
  }

  return <AssessmentContext.Provider value={values}>{children}</AssessmentContext.Provider>
}

const useAssessment = () => useContext(AssessmentContext)

export { AssessmentProvider, useAssessment }