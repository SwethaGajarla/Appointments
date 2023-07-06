// Write your code here
import format from 'date-fns/format'
import './index.css'

const AppointmentItem = props => {
  const {appointment, staredAppointment} = props
  const {id, title, date, isStared} = appointment
  const imgSrc = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStar = () => {
    staredAppointment(id)
  }

  return (
    <li className="appointments-item-card">
      <div className="title-button-container">
        <p className="title-heading">{title}</p>
        <button
          data-testid="star"
          type="button"
          className="custom-star-btn"
          onClick={onStar}
        >
          <img src={imgSrc} alt="star" className="star" />
        </button>
      </div>
      <p className="date-appointment">
        Date: {format(new Date(date), 'dd MMMM yyyy, EEEE')}
      </p>
    </li>
  )
}

export default AppointmentItem
