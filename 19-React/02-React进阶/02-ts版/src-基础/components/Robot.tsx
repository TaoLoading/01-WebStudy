import React from 'react'
import styles from './Robot.module.css'

interface RobotProps {
  id: Number,
  name: string,
  email: string
}

const Robot: React.FC<RobotProps> = ({ id, name, email }) => {
  return (
    <div className={styles.cardContainer}>
      <img src={`https://www.robohash.org/${id}`} alt="robot" />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  )
}

export default Robot