import React, { useContext } from 'react'
import styles from './Robot.module.css'
import { appContext } from "../index";

interface RobotProps {
  id: Number,
  name: string,
  email: string
}

const Robot: React.FC<RobotProps> = ({ id, name, email }) => {
  const value = useContext(appContext)
  return (
    <div className={styles.cardContainer}>
      <img src={`https://www.robohash.org/${id}`} alt="robot" />
      <h2>{name}</h2>
      <p>{email}</p>
      <p>作者：{value.username}</p>
    </div>
  )
}

export default Robot