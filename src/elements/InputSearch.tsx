import React from 'react'
import styles from './InputSearch.module.css'
import { ReactComponent as SearchIcon } from 'assets/icons/search bold.svg'

interface IInputSearchProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onClick?: (e: React.MouseEvent) => void
}

const InputSearch: React.FC<IInputSearchProps> = ({ onClick, ...props }) => {
  const handleClick = () => {}
  // const onChange = (event)=> {setEnteredSearchValue(event.target.value)}

  return (
    <div className={styles.search_bar} onClick={onClick || handleClick}>
      <input type='search' placeholder='Search' {...props} />
      <SearchIcon className={styles.search_icon} />
      <div className={styles.search_border}></div>
    </div>
  )
}

export default InputSearch
